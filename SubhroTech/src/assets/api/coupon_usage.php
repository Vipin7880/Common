<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Minimal SimpleXLSXGen implementation for this project
class SimpleXLSXGen {
    public static function fromArray(array $rows) {
        return new self($rows);
    }
    private $rows;
    public function __construct(array $rows) { $this->rows = $rows; }
    public function saveAs($filename) {
        $zip = new ZipArchive();
        if ($zip->open($filename, ZipArchive::CREATE | ZipArchive::OVERWRITE) === true) {
            $zip->addFromString('[Content_Types].xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>');
            $zip->addFromString('_rels/.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>');
            $zip->addFromString('xl/workbook.xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheets><sheet name="Sheet1" sheetId="1" r:id="rId1" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"/></sheets></workbook>');
            $zip->addFromString('xl/_rels/workbook.xml.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/></Relationships>');
            
            $sheetContent = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>';
            foreach ($this->rows as $rIndex => $row) {
                $sheetContent .= '<row r="'.($rIndex+1).'">';
                foreach ($row as $cIndex => $val) {
                    $col = chr(65 + $cIndex);
                    $cellRef = $col . ($rIndex + 1);
                    $type = is_numeric($val) ? 'n' : 'inlineStr';
                    $sheetContent .= '<c r="'.$cellRef.'" t="'.$type.'">';
                    if ($type === 'inlineStr') {
                        $sheetContent .= '<is><t>'.htmlspecialchars($val).'</t></is>';
                    } else {
                        $sheetContent .= '<v>'.$val.'</v>';
                    }
                    $sheetContent .= '</c>';
                }
                $sheetContent .= '</row>';
            }
            $sheetContent .= '</sheetData></worksheet>';
            $zip->addFromString('xl/worksheets/sheet1.xml', $sheetContent);
            $zip->close();
            return true;
        }
        return false;
    }
}

// Minimal SimpleXLSX for reading
class SimpleXLSX {
    private $rows = [];
    public function __construct($filename) {
        $zip = new ZipArchive();
        if (file_exists($filename) && $zip->open($filename) === true) {
            $sharedStrings = [];
            if (($index = $zip->locateName('xl/sharedStrings.xml')) !== false) {
                $xml = simplexml_load_string($zip->getFromIndex($index));
                foreach ($xml->si as $si) { $sharedStrings[] = (string)$si->t; }
            }
            if (($index = $zip->locateName('xl/worksheets/sheet1.xml')) !== false) {
                $xml = simplexml_load_string($zip->getFromIndex($index));
                foreach ($xml->sheetData->row as $row) {
                    $r = [];
                    foreach ($row->c as $c) {
                        $v = (string)$c->v;
                        if ((string)$c['t'] === 's') { $v = $sharedStrings[(int)$v]; }
                        else if ((string)$c['t'] === 'inlineStr') { $v = (string)$c->is->t; }
                        $r[] = $v;
                    }
                    $this->rows[] = $r;
                }
            }
            $zip->close();
        }
    }
    public function rows() { return $this->rows; }
    public static function parse($filename) { return new self($filename); }
}

// Only execute if this is a direct POST request
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'POST' && isset($_SERVER['SCRIPT_FILENAME']) && basename($_SERVER['SCRIPT_FILENAME']) === 'coupon_usage.php') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['coupon_code']) || !isset($data['name']) || !isset($data['email'])) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Missing parameters"]);
        exit;
    }

    $coupon_code = strtoupper(trim($data['coupon_code']));
    $name = $data['name'];
    $email = $data['email'];
    $number = $data['number'] ?? '';
    $client_name = $data['client_name'] ?? 'ST';
    $amount = $data['amount'] ?? '0';

    date_default_timezone_set('Asia/Kolkata');
    $date = date('Y-m-d H:i:s');

    // 1. Record Usage in detailed log
    $log_file = __DIR__ . '/coupon_usage_log.xlsx';
    $log_rows = [];
    if (file_exists($log_file)) {
        $xlsx = SimpleXLSX::parse($log_file);
        $log_rows = $xlsx->rows();
    } else {
        $log_rows[] = ['Date', 'Coupon Code', 'Client Name', 'Customer Name', 'Customer Email', 'Mobile Number', 'Amount Paid'];
    }
    $log_rows[] = [$date, $coupon_code, $client_name, $name, $email, $number, $amount];
    SimpleXLSXGen::fromArray($log_rows)->saveAs($log_file);

    // 2. Update status/count in coupon_list.xlsx
    $list_file = __DIR__ . '/coupon_list.xlsx';
    if (file_exists($list_file)) {
        $xlsx = SimpleXLSX::parse($list_file);
        $list_rows = $xlsx->rows();
        $updated = false;
        foreach ($list_rows as &$row) {
            if (isset($row[0]) && strtoupper($row[0]) === $coupon_code) {
                $row[6] = (int)($row[6] ?? 0) + 1; // Increment usage count
                if (isset($row[3]) && $row[3] === 'single') {
                    $row[4] = 0; // Set status as inactive
                }
                $updated = true;
            }
        }
        if ($updated) {
            SimpleXLSXGen::fromArray($list_rows)->saveAs($list_file);
        }
    }

    echo json_encode(["success" => true, "message" => "Usage recorded in XLSX"]);
}
?>
