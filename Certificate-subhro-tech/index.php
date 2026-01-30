<?php
// index.php

// -----------------------------------------------------------------------------
// Configuration & Helpers
// -----------------------------------------------------------------------------

// ENABLE ERROR REPORTING FOR DEBUGGING
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'SimpleXLSX.php';
use Shuchkin\SimpleXLSX;

$excelFile = 'data.xlsx';
$resultData = null;
$errorMsg = null;
$showDownloadCallback = false;

// -----------------------------------------------------------------------------
// Logic Processing
// -----------------------------------------------------------------------------

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['email'])) {
    $searchEmail = trim($_POST['email']);
    
    if (empty($searchEmail)) {
        $errorMsg = "Please enter an email address.";
    } elseif (!filter_var($searchEmail, FILTER_VALIDATE_EMAIL)) {
         $errorMsg = "Please enter a valid email address.";
    } elseif (!file_exists($excelFile)) {
        $errorMsg = "Database file ($excelFile) not found. Please contact administrator.";
    } else {
        if ($xlsx = SimpleXLSX::parse($excelFile)) {
            // Assume Row 1 is headers. We'll verify against lowercase for consistency.
            // Columns expected: Email, Name, Other Details, Certificate Link
            // We'll scan all rows looking for a match in the first column (index 0).
            
            foreach ($xlsx->rows() as $index => $row) {
                if ($index === 0) continue; // Skip header row
                
                // Assuming Column 0 is Email
                $rowEmail = isset($row[0]) ? trim($row[0]) : '';
                
                if (strcasecmp($rowEmail, $searchEmail) === 0) {
                    // Match found!
                    $resultData = [
                        'name' => isset($row[1]) ? $row[1] : 'N/A',
                        'college' => isset($row[2]) ? $row[2] : 'N/A',
                        'link' => isset($row[3]) ? $row[3] : '#'
                    ];
                    break;
                }
            }
            
            if (!$resultData) {
                $errorMsg = "No certificate found for this email address.";
            }

        } else {
            $errorMsg = SimpleXLSX::parseError();
        }
    }
}

// -----------------------------------------------------------------------------
// View / Template
// -----------------------------------------------------------------------------
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificate Verification</title>
    <!-- Google Fonts for Typography -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=outfit:wght@300;400;600;700&display=swap" rel="stylesheet">
    
    <style>
        :root {
            /* Professional/Academic Color Palette */
            --primary: #1e3a8a; /* Official Navy Blue */
            --accent: #d97706; /* Gold/Bronze for certificate feel */
            
            --bg-color: #e2e8f0;  /* Dimmer Slate Grey (was #f1f5f9) - Easier on eyes */
            --card-bg: #ffffff;
            
            --text-main: #1e293b;
            --text-muted: #64748b;
            
            --font-family: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            --radius: 16px; /* Increased radius for modern feel */
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            -webkit-tap-highlight-color: transparent;
        }

        body {
            font-family: var(--font-family);
            background-color: var(--bg-color);
            background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
            background-size: 24px 24px;
            
            /* Lock Layout */
            height: 100dvh; /* Dynamic viewport height for mobile */
            width: 100%;
            overflow: hidden; /* Lock body scroll */
            
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--text-main);
            margin: 0;
            padding: 0;
        }
        
        .container {
            width: 100%;
            max-width: 440px;
            height: 100%; /* Full height to allow flexbox spacing */
            
            display: flex;
            flex-direction: column;
            
            padding: 24px;
            overflow-y: auto; /* Allow internal scrolling if content is too tall (e.g. keyboard view) */
            
            position: relative;
            z-index: 10;
        }
        
        /* Company Logo */
        .brand-logo {
            display: block;
            margin: 0 auto 24px;
            height: 50px; 
            width: auto;
            object-fit: contain;
            flex-shrink: 0;
        }

        .card {
            background: var(--card-bg);
            border-radius: var(--radius);
            padding: 32px 28px;
            box-shadow: 
                0 10px 15px -3px rgba(0, 0, 0, 0.1), 
                0 4px 6px -2px rgba(0, 0, 0, 0.05),
                0 0 0 1px rgba(0,0,0,0.03);
            position: relative;
            overflow: hidden; 
            
            /* Center vertically in the available space */
            margin-top: auto;
            margin-bottom: auto;
            flex-shrink: 0; /* Prevent squishing */
        }
        
        /* Top Decorative Bar - Now respects border-radius because of overflow:hidden on parent */
        .card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 6px;
            background: linear-gradient(90deg, var(--primary) 0%, var(--primary) 40%, var(--accent) 50%, var(--primary) 60%, var(--primary) 100%);
            z-index: 1;
        }
        
        /* Remove the old ::after style to avoid conflicts */
        .card::after {
            content: none;
        }

        /* Header */
        .header {
            text-align: center;
            margin-bottom: 28px;
        }

        .header h1 {
            font-weight: 700;
            font-size: 22px;
            color: var(--text-main);
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .header p {
            color: var(--text-muted);
            font-size: 14px;
            line-height: 1.5;
            max-width: 300px;
            margin: 0 auto;
        }

        /* Form Elements */
        .form-group {
            margin-bottom: 20px;
            text-align: left;
        }

        .form-label {
            display: block;
            margin-bottom: 6px;
            font-weight: 600;
            font-size: 13px;
            color: var(--text-main);
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .form-input {
            width: 100%;
            padding: 12px 14px;
            border-radius: 8px;
            border: 1px solid #cbd5e1;
            background: #f8fafc;
            font-size: 15px;
            transition: all 0.2s ease;
            outline: none;
            font-family: var(--font-family);
            color: var(--text-main);
        }

        .form-input:focus {
            border-color: var(--primary);
            background: #fff;
            box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1); /* Blue focus ring */
        }
        
        .form-input::placeholder {
            color: #94a3b8;
        }

        .btn {
            display: block;
            width: 100%;
            padding: 14px;
            border-radius: 8px;
            border: none;
            background: var(--primary);
            color: white;
            font-weight: 600;
            font-size: 15px;
            cursor: pointer;
            transition: background-color 0.2s;
            font-family: var(--font-family);
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .btn:hover {
            background-color: #172554; /* Darker blue */
        }

        .btn:active {
            transform: translateY(1px);
        }

        /* Messages */
        .message {
            padding: 12px;
            border-radius: 6px;
            margin-top: 20px;
            font-size: 14px;
            text-align: center;
            line-height: 1.4;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        
        /* Error icon helper */
        .message::before {
            content: '⚠️';
            font-size: 16px;
        }

        .message.error {
            background: #fef2f2;
            color: #dc2626;
            border: 1px solid #fee2e2;
        }

        /* Success Card with Certificate vibes */
        .result-card {
            text-align: center;
            padding: 10px 0;
        }

        .result-icon {
            font-size: 36px;
            color: var(--accent); /* Bronze/Gold checkmark */
            margin-bottom: 12px;
            display: block;
        }

        .user-name {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 4px;
            color: var(--primary);
            text-transform: uppercase;
        }

        .user-details {
            font-size: 15px;
            color: var(--text-muted);
            margin-bottom: 24px;
            font-style: italic;
        }

        .btn-download {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            text-decoration: none;
            background: var(--accent); /* Gold button */
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            font-weight: 600;
            font-size: 14px;
            box-shadow: 0 4px 6px -1px rgba(217, 119, 6, 0.3);
            transition: all 0.2s;
            width: 100%;
        }

        .btn-download:hover {
            background: #b45309;
            box-shadow: 0 6px 10px -1px rgba(217, 119, 6, 0.4);
        }
        
        .back-link {
            display: inline-block;
            margin-top: 20px;
            color: var(--text-muted);
            text-decoration: none;
            font-size: 13px;
        }
        .back-link:hover {
            color: var(--primary);
            text-decoration: underline;
        }
        
        .footer {
            text-align: center;
            /* Pin to bottom */
            margin-top: auto; 
            padding-top: 24px;
            
            color: var(--text-muted);
            font-size: 12px;
            flex-shrink: 0;
        }
        .footer a {
            color: var(--primary);
            text-decoration: none;
            font-weight: 600;
        }
        .footer a:hover {
            text-decoration: underline;
        }
        
        /* Mobile Optimization */
        @media (max-width: 480px) {
            body {
                padding: 12px;
                /* On very short screens, prioritize content fitting */
                justify-content: center; 
            }
            .card {
                padding: 24px 20px;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            }
            .brand-logo {
                height: 40px;
                margin-bottom: 20px;
            }
            .header h1 {
                font-size: 20px;
            }
        }

    </style>
</head>
<body>

<div class="container">
    <div class="card">
        
        <?php if ($resultData): ?>
            <!-- SUCCESS STATE -->
            <div class="result-card">
                <span class="result-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 13.41L17.59 5.82L19 7.23L10 17Z" fill="#10b981"/>
                    </svg>
                </span>
                
                <h2 style="font-size: 18px; color: var(--text-main); margin-bottom: 4px;">Verified Successfully</h2>
                <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 20px;">Congratulations! Your certificate is ready.</p>
                
                <div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
                    <h2 class="user-name"><?php echo htmlspecialchars($resultData['name']); ?></h2>
                    <p class="user-details" style="margin-bottom: 0;"><?php echo htmlspecialchars($resultData['college']); ?></p>
                </div>
                
                <a href="<?php echo htmlspecialchars($resultData['link']); ?>" target="_blank" class="btn btn-download">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    Download Certificate
                </a>
                
                <a href="index.php" class="back-link">Verify another email</a>
            </div>

        <?php else: ?>
            <!-- FORM STATE -->
            <div class="header">
                <img src="https://subhrotech.com/assets/logo.png" alt="SubhroTech Logo" class="brand-logo">
                <h1>Check Certificate</h1>
                <p>Enter your registered email to get your certificate.</p>
            </div>

            <form method="POST" action="">
                <div class="form-group">
                    <label class="form-label" for="email">Email Address</label>
                    <input type="email" id="email" name="email" class="form-input" placeholder="you@example.com" required 
                           value="<?php echo isset($_POST['email']) ? htmlspecialchars($_POST['email']) : ''; ?>">
                </div>

                <button type="submit" class="btn" id="submitBtn">Check Certificate</button>
            </form>

            <?php if ($errorMsg): ?>
                <div class="message error">
                    <?php echo htmlspecialchars($errorMsg); ?>
                </div>
            <?php endif; ?>

        <?php endif; ?>
        
    </div>
    
    <div class="footer">
        <p>&copy; <?php echo date('Y'); ?> <a href="https://subhrotech.com" target="_blank">SubhroTech</a>. All rights reserved.</p>
    </div>
</div>

<script>
    document.querySelector('form')?.addEventListener('submit', function(e) {
        const btn = document.getElementById('submitBtn');
        const originalText = btn.innerText;
        
        // Visual feedback
        btn.disabled = true;
        btn.innerHTML = 'Verifying... <span style="display:inline-block; animation: spin 1s linear infinite">⏳</span>';
        btn.style.opacity = '0.8';
        btn.style.cursor = 'wait';
        
        // Optional: Ensure the browser renders the change before submitting
        // In a real SPA we would use fetch(), but for PHP form post we just let it submit.
        // If you want a fake delay to show the loader, you can preventDefault and submit after timeout.
        <?php if(!isset($_POST['email'])): ?>
            e.preventDefault();
            setTimeout(() => {
                this.submit();
            }, 1000); // 1 second artificial delay for visual effect
        <?php endif; ?>
    });
</script>

</body>
</html>
