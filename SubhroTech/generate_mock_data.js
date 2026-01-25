const XLSX = require('xlsx');

const data = [
    ['Certificate ID', 'Student Name', 'Domain', 'Start Date', 'End Date'],
    ['IX-1001', 'Rahul Sharma', 'Web Development', '2024-01-10', '2024-02-10'],
    ['IX-1002', 'Priya Patel', 'Data Science', '2024-02-15', '2024-03-15'],
    ['IX-1003', 'Amit Singh', 'Artificial Intelligence', '2024-03-01', '2024-04-01'],
    ['IX-TEST', 'Test User', 'Quality Assurance', '2024-01-01', '2024-02-01']
];

const ws = XLSX.utils.aoa_to_sheet(data);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, 'Certificates');

XLSX.writeFile(wb, 'src/assets/certificates.xlsx');
console.log('Mock certificates.xlsx generated in src/assets/');
