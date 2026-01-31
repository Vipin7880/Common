<?php
// init_xlsx.php - Run once to create coupon_list.xlsx if missing
require_once __DIR__ . '/coupon_usage.php'; // Reuse the minimal classes

$list_file = __DIR__ . '/coupon_list.xlsx';

$initial_coupons = [
    ['Coupon Code', 'Discount Type', 'Value', 'Usage Type', 'Status', 'Client Name', 'Total Used'],
    ['ST10', 'P', 10, 'single', 1, 'ST', 0],
    ['SAVE50', 'F', 50, 'multiple', 1, 'ST', 0],
    ['WELCOME20', 'P', 20, 'multiple', 1, 'ST', 0],
    ['DATAENG', 'P', 15, 'multiple', 1, 'ClientA', 0]
];

if (!file_exists($list_file)) {
    SimpleXLSXGen::fromArray($initial_coupons)->saveAs($list_file);
    echo "Created coupon_list.xlsx with sample data.<br>";
} else {
    echo "coupon_list.xlsx already exists.<br>";
}

$log_file = __DIR__ . '/coupon_usage_log.xlsx';
if (!file_exists($log_file)) {
    $log_header = [['Date', 'Coupon Code', 'Client Name', 'Customer Name', 'Customer Email', 'Mobile Number', 'Amount Paid']];
    SimpleXLSXGen::fromArray($log_header)->saveAs($log_file);
    echo "Created coupon_usage_log.xlsx with headers.";
}
?>
