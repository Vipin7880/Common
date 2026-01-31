const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const puppeteer = require('puppeteer');

// Configuration
const CSV_FILE = 'WEB DEV.csv';
const OUTPUT_DIR = 'Certificate pdf';
const TEMPLATE_FILE = 'index.html';
const RECORD_FILE = 'certificate_records.txt';

// Create output directory if it doesn't exist
// Reset output directory to ensure fresh generation
if (fs.existsSync(OUTPUT_DIR)) {
    // using fs.rmSync if node version supports it (v14.14+), otherwise logic might need adjustment.
    // simpler to just delete files inside, or use recursive rmdir
    // User env: Node v14.17.4 -> fs.rmSync is available.
    fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
}
fs.mkdirSync(OUTPUT_DIR);

// Reset Record File (Clear previous records)
if (fs.existsSync(RECORD_FILE)) {
    fs.unlinkSync(RECORD_FILE);
}
fs.writeFileSync(RECORD_FILE, 'Name, College, Email, Certificate ID, Date Generated\n');

// Helper to generate formatted date
function getCurrentDate() {
    const date = new Date("2026-02-01"); 
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
}

// Generate Random ID: "ST-" + 8 alphanumeric characters
function generateCertID() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'ST-';
    for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

(async () => {
    const browser = await puppeteer.launch();
    const results = [];

    // Read CSV
    fs.createReadStream(CSV_FILE)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            console.log(`Found ${results.length} students. Starting generation...`);
            
            const page = await browser.newPage();
            // Load the HTML content once, we will evaluate JS to update it
            const htmlPath = path.resolve(TEMPLATE_FILE);
            await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

            // Set screen size for consistent rendering logic before PDF print
            await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: 1 });

            for (const student of results) {
                const name = student['Name']?.trim();
                const college = student['College / University Name']?.trim();
                const email = student['Email']?.trim();
                
                if (!name) continue;

                const certID = generateCertID();
                const safeName = name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
                const fileName = `${safeName}_${certID}.pdf`;
                const outputPath = path.join(OUTPUT_DIR, fileName);

                console.log(`Generating for: ${name} (${certID})`);

                // Update DOM content
                await page.evaluate((name, college, certID, email) => {
                    // Update Name via textContent
                    const nameEl = document.getElementById('studentName');
                    if (nameEl) nameEl.textContent = name; // CSS will handle capitalization

                    // Update College
                    const collegeEl = document.getElementById('collegeName');
                    if (collegeEl) collegeEl.textContent = college || 'Unknown Institution';
                    
                    // Update ID
                    const idEl = document.getElementById('certificateId');
                    if (idEl) idEl.textContent = `Certificate ID: ${certID}`;

                    // Update Data Attributes (for potential future usage/links)
                    document.body.setAttribute('data-email', email || '');
                    document.body.setAttribute('data-name', name || '');
                    document.body.setAttribute('data-college', college || '');
                    
                }, name, college, certID, email);

                // Wait a moment for rendering updates (fonts etc)
                // await page.waitForTimeout(100); // waitForTimeout is deprecated
                await new Promise(r => setTimeout(r, 100));

                /* 
                   Using standard A4 Landscape. 
                   Scale 0.90 -> 1200px * 0.9 = 1080px width. 
                   A4 width is ~1123px. This leaves ~40px margin total.
                   Flexbox in CSS will center it perfectly.
                */
                await page.pdf({
                    path: outputPath,
                    printBackground: true,
                    format: 'A4',
                    landscape: true,
                    scale: 0.90, 
                    margin: { 
                        top: '0px', 
                        bottom: '0px',
                        left: '0px', 
                        right: '0px' 
                    } 
                });

                // Append to record file
                const recordLine = `"${name}", "${college}", "${email}", "${certID}", "${new Date().toISOString()}"\n`;
                fs.appendFileSync(RECORD_FILE, recordLine);
            }

            console.log('All certificates generated.');
            await browser.close();
        });
})();
