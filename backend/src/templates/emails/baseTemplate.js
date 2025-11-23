/**
 * Base email template with responsive design and professional styling
 * This template provides the foundational structure for all emails
 */

const baseTemplate = (content, options = {}) => {
  const {
    preheaderText = '',
    showHeader = true,
    showFooter = true,
    unsubscribeUrl = null
  } = options;

  return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <title>Tech News App</title>
    <!--[if mso]>
    <style type="text/css">
        body, table, td, a { font-family: Arial, Helvetica, sans-serif !important; }
    </style>
    <![endif]-->
    <style>
        /* Reset styles */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        
        /* Base styles */
        body {
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            background-color: #f4f7fa;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        
        /* Prevent iOS link styling */
        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }
        
        /* Typography */
        h1, h2, h3, h4, h5, h6 {
            margin: 0;
            padding: 0;
            line-height: 1.3;
            color: #1a1a1a;
            font-weight: 600;
        }
        
        h1 { font-size: 28px; margin-bottom: 20px; }
        h2 { font-size: 24px; margin-bottom: 16px; }
        h3 { font-size: 20px; margin-bottom: 12px; }
        
        p {
            margin: 0 0 16px 0;
            font-size: 16px;
            line-height: 1.6;
            color: #4a4a4a;
        }
        
        /* Button styles */
        .btn {
            display: inline-block;
            padding: 14px 32px;
            font-size: 16px;
            font-weight: 600;
            text-decoration: none;
            border-radius: 6px;
            transition: all 0.3s ease;
            text-align: center;
            cursor: pointer;
        }
        
        .btn-primary {
            background-color: #4f46e5;
            color: #ffffff !important;
        }
        
        .btn-secondary {
            background-color: #6366f1;
            color: #ffffff !important;
        }
        
        /* Responsive styles */
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                margin: auto !important;
            }
            
            .content-padding {
                padding: 24px 16px !important;
            }
            
            h1 { font-size: 24px !important; }
            h2 { font-size: 20px !important; }
            h3 { font-size: 18px !important; }
            
            .btn {
                display: block !important;
                width: 100% !important;
                padding: 12px 24px !important;
            }
        }
        
        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
            .dark-mode-bg { background-color: #1a1a1a !important; }
            .dark-mode-text { color: #e0e0e0 !important; }
            .dark-mode-border { border-color: #333333 !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f7fa;">
    <!-- Preheader text -->
    <div style="display: none; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #f4f7fa;">
        ${preheaderText}
    </div>
    
    <!-- Email wrapper -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f7fa;">
        <tr>
            <td style="padding: 40px 20px;">
                <!-- Main email container -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" class="email-container" style="margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
                    ${showHeader ? `
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 32px; text-align: center; border-radius: 8px 8px 0 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="text-align: center;">
                                        <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">
                                            ⚡ Tech News
                                        </h1>
                                        <p style="margin: 8px 0 0 0; color: #e0e7ff; font-size: 14px; font-weight: 500;">
                                            Stay Updated with Latest Tech Trends
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    ` : ''}
                    
                    <!-- Content -->
                    <tr>
                        <td class="content-padding" style="padding: 40px 48px;">
                            ${content}
                        </td>
                    </tr>
                    
                    ${showFooter ? `
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 32px 48px; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="text-align: center;">
                                        <p style="margin: 0 0 12px 0; font-size: 14px; color: #6b7280; line-height: 1.5;">
                                            © ${new Date().getFullYear()} Tech News App. All rights reserved.
                                        </p>
                                        <p style="margin: 0 0 16px 0; font-size: 13px; color: #9ca3af;">
                                            You're receiving this email because you signed up for Tech News App.
                                        </p>
                                        ${unsubscribeUrl ? `
                                        <p style="margin: 0; font-size: 13px;">
                                            <a href="${unsubscribeUrl}" style="color: #6366f1; text-decoration: none;">Unsubscribe</a> | 
                                            <a href="${process.env.FRONTEND_URL || '#'}/contact" style="color: #6366f1; text-decoration: none;">Contact Us</a> | 
                                            <a href="${process.env.FRONTEND_URL || '#'}/privacy" style="color: #6366f1; text-decoration: none;">Privacy Policy</a>
                                        </p>
                                        ` : `
                                        <p style="margin: 0; font-size: 13px;">
                                            <a href="${process.env.FRONTEND_URL || '#'}/contact" style="color: #6366f1; text-decoration: none;">Contact Us</a> | 
                                            <a href="${process.env.FRONTEND_URL || '#'}/privacy" style="color: #6366f1; text-decoration: none;">Privacy Policy</a>
                                        </p>
                                        `}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    ` : ''}
                </table>
                
                <!-- Spacer for email clients -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                        <td style="padding: 20px 0; text-align: center;">
                            <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                                This email was sent by Tech News App
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `.trim();
};

module.exports = baseTemplate;
