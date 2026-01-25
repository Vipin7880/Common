<?php
// Set CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);

if ($data && !empty($data['email']) && !empty($data['duration'])) {
    $file = __DIR__ . '/higher_duration_requests.csv';
    $is_new_file = !file_exists($file);

    // Open file in append mode
    $fp = fopen($file, 'a');

    if ($fp === false) {
        http_response_code(500);
        echo json_encode(["message" => "Unable to write to file."]);
        exit();
    }

    // Add header if new file
    if ($is_new_file) {
        fputcsv($fp, ['Date', 'Name', 'Email', 'Phone', 'Duration', 'Message']);
    }

    date_default_timezone_set('Asia/Kolkata');
    // Prepare row data
    $row = [
        date('Y-m-d H:i:s'),
        $data['name'] ?? 'N/A',
        $data['email'] ?? '',
        $data['phone'] ?? '',
        $data['duration'] ?? '',
        $data['message'] ?? ''
    ];

    fputcsv($fp, $row);
    fclose($fp);

    // Send Duration Request Emails
    require_once __DIR__ . '/mailer.php';
    sendDurationEmail($data['email'], $data['name'], [
        'duration' => $data['duration'],
        'message' => $data['message'],
        'phone' => $data['phone']
    ]);

    http_response_code(200);
    echo json_encode(["message" => "Request received"]);
} else {
    http_response_code(400);
    echo json_encode(["message" => "Invalid data"]);
}
?>
