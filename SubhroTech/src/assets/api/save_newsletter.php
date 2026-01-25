<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$input = json_decode(file_get_contents("php://input"), true);

if ($input) {
    $email = $input['email'] ?? '';
    
    if (empty($email)) {
        http_response_code(400);
        echo json_encode(["message" => "Email is required"]);
        exit();
    }

    $file = __DIR__ . '/subscribers.csv';
    $is_new_file = !file_exists($file);
    
    $fp = fopen($file, 'a');

    if ($fp === false) {
        http_response_code(500);
        echo json_encode(["message" => "Unable to write to file. Check folder permissions."]);
        exit();
    }

    if ($is_new_file) {
        fputcsv($fp, ['Date', 'Email']);
    }

    date_default_timezone_set('Asia/Kolkata');
    $date = date('Y-m-d H:i:s');
    fputcsv($fp, [$date, $email]);

    fclose($fp);

    echo json_encode(["message" => "Subscribed successfully"]);
} else {
    http_response_code(400);
    echo json_encode(["message" => "Invalid data"]);
}
?>
