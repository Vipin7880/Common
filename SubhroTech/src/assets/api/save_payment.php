<?php
// Set CORS headers to allow requests from any origin (or specify your domain)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    $file = __DIR__ . '/payments.csv';
    $is_new_file = !file_exists($file);

    // Open file in append mode
    $fp = fopen($file, 'a');

    if ($fp === false) {
        http_response_code(500);
        echo json_encode(["message" => "Unable to write to file. Check folder permissions."]);
        exit();
    }

    // Add header if new file
    if ($is_new_file) {
        fputcsv($fp, ['Date', 'Payment ID', 'Name', 'Email', 'Phone', 'Status', 'Amount', 'Currency', 'Plan', 'Duration', 'Domain', 'Notes']);
    }

    $name = $data['name'] ?? '';
    $email = $data['email'] ?? '';
    $phone = $data['phone'] ?? '';
    $payment_id = $data['payment_id'] ?? '';
    $status = $data['status'] ?? '';
    $amount = $data['amount'] ?? 0;
    $currency = $data['currency'] ?? '';
    $plan_name = $data['plan_name'] ?? '';
    $duration = $data['duration'] ?? '';
    $domain = $data['domain'] ?? '';
    $notes = isset($data['notes']) ? json_encode($data['notes']) : '';

    date_default_timezone_set('Asia/Kolkata');
    $date = date('Y-m-d H:i:s');
    fputcsv($fp, [$date, $payment_id, $name, $email, $phone, $status, $amount, $currency, $plan_name, $duration, $domain, $notes]);
    fclose($fp);

    // Send Confirmation Emails
    require_once __DIR__ . '/mailer.php';
    sendPaymentEmail($email, $name, [
        'payment_id' => $payment_id,
        'amount' => $amount,
        'currency' => $currency,
        'plan_name' => $plan_name,
        'duration' => $duration,
        'domain' => $domain,
        'phone' => $phone
    ]);

    http_response_code(200);
    echo json_encode(["message" => "Payment recorded"]);
} else {
    http_response_code(400);
    echo json_encode(["message" => "Invalid data"]);
}
?>
