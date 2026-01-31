<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Minimal SimpleXLSX implementation for this project
class SimpleXLSX {
    private $rows = [];
    public function __construct($filename) {
        $zip = new ZipArchive();
        if ($zip->open($filename) === true) {
            $sharedStrings = [];
            if (($index = $zip->locateName('xl/sharedStrings.xml')) !== false) {
                $xml = simplexml_load_string($zip->getFromIndex($index));
                foreach ($xml->si as $si) {
                    $sharedStrings[] = (string)$si->t;
                }
            }
            if (($index = $zip->locateName('xl/worksheets/sheet1.xml')) !== false) {
                $xml = simplexml_load_string($zip->getFromIndex($index));
                foreach ($xml->sheetData->row as $row) {
                    $r = [];
                    foreach ($row->c as $c) {
                        $v = (string)$c->v;
                        if ((string)$c['t'] === 's') {
                            $v = $sharedStrings[(int)$v];
                        }
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

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['coupon_code']) || !isset($data['original_price'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Missing parameters"]);
    exit;
}

$coupon_code = strtoupper(trim($data['coupon_code']));
$original_price = (float)$data['original_price'];

$file = __DIR__ . '/coupon_list.xlsx';
$found = false;
$coupon_data = null;

if (file_exists($file)) {
    $xlsx = SimpleXLSX::parse($file);
    $rows = $xlsx->rows();
    if (count($rows) > 0) {
        // Skip header row
        for ($i = 1; $i < count($rows); $i++) {
            $row = $rows[$i];
            if (isset($row[0]) && strtoupper($row[0]) === $coupon_code) {
                $coupon_data = [
                    'coupon_code' => $row[0],
                    'discount_type' => $row[1],
                    'discount_value' => (float)$row[2],
                    'usage_type' => $row[3],
                    'status' => (int)$row[4],
                    'client_name' => $row[5] ?: 'ST',
                    'total_used' => (int)($row[6] ?? 0)
                ];
                $found = true;
                break;
            }
        }
    }
} else {
    // Fallback to CSV if XLSX doesn't exist yet (for initial setup)
    $csv_file = __DIR__ . '/coupon_list.csv';
    if (file_exists($csv_file)) {
        if (($handle = fopen($csv_file, "r")) !== FALSE) {
            fgetcsv($handle); // skip header
            while (($row = fgetcsv($handle)) !== FALSE) {
                if (strtoupper($row[0]) === $coupon_code) {
                    $coupon_data = [
                        'coupon_code' => $row[0],
                        'discount_type' => $row[1],
                        'discount_value' => (float)$row[2],
                        'usage_type' => $row[3],
                        'status' => (int)$row[4],
                        'client_name' => $row[5] ?: 'ST',
                        'total_used' => (int)$row[6]
                    ];
                    $found = true;
                    break;
                }
            }
            fclose($handle);
        }
    }
}

if ($found && isset($coupon_data['status']) && $coupon_data['status'] === 1) {
    $discount_amount = 0;
    if ($coupon_data['discount_type'] === 'P') {
        $discount_amount = ($original_price * $coupon_data['discount_value']) / 100;
    } else {
        $discount_amount = $coupon_data['discount_value'];
    }

    $final_price = max(0, $original_price - $discount_amount);

    echo json_encode([
        "success" => true,
        "status" => 1,
        "message" => "Coupon applied successfully!",
        "coupon" => $coupon_data,
        "discount_amount" => $discount_amount,
        "final_price" => $final_price
    ]);
} else {
    echo json_encode([
        "success" => false,
        "status" => 0,
        "message" => "Invalid or expired coupon!"
    ]);
}
?>
