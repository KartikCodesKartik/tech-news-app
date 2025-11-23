const baseTemplate = require('./baseTemplate');

/**
 * Password reset email template
 * @param {string} name - User's name
 * @param {string} resetUrl - Password reset URL with token
 * @param {object} options - Additional options
 */
const passwordResetEmail = (name, resetUrl, options = {}) => {
  const {
    expirationTime = '1 hour'
  } = options;

  const content = `
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      <tr>
        <td>
          <h1 style="color: #1a1a1a; font-size: 28px; font-weight: 700; margin: 0 0 24px 0;">
            Password Reset Request 🔐
          </h1>
          
          <p style="font-size: 16px; color: #4a4a4a; line-height: 1.6; margin: 0 0 16px 0;">
            Hi <strong>${name}</strong>,
          </p>
          
          <p style="font-size: 16px; color: #4a4a4a; line-height: 1.6; margin: 0 0 16px 0;">
            We received a request to reset the password for your Tech News account. If you made this request, click the button below to create a new password.
          </p>
          
          <!-- CTA Button -->
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td style="text-align: center; padding: 8px 0 32px 0;">
                <a href="${resetUrl}" class="btn btn-primary" style="display: inline-block; padding: 14px 32px; font-size: 16px; font-weight: 600; text-decoration: none; border-radius: 6px; background-color: #4f46e5; color: #ffffff;">
                  Reset Your Password
                </a>
              </td>
            </tr>
          </table>
          
          <!-- Security notice -->
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fef2f2; border-radius: 8px; padding: 20px; margin-bottom: 24px; border-left: 4px solid #ef4444;">
            <tr>
              <td>
                <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #991b1b;">
                  ⚠️ Important Security Information
                </p>
                <p style="margin: 0; font-size: 14px; color: #7f1d1d; line-height: 1.5;">
                  This password reset link will expire in <strong>${expirationTime}</strong>. For your security, this link can only be used once.
                </p>
              </td>
            </tr>
          </table>
          
          <!-- Alternative link -->
          <p style="font-size: 14px; color: #6b7280; line-height: 1.6; margin: 0 0 16px 0;">
            If the button above doesn't work, copy and paste this link into your browser:
          </p>
          
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f9fa; border-radius: 6px; padding: 16px; margin-bottom: 24px;">
            <tr>
              <td style="word-break: break-all;">
                <a href="${resetUrl}" style="color: #4f46e5; text-decoration: none; font-size: 13px; font-family: 'Courier New', monospace;">
                  ${resetUrl}
                </a>
              </td>
            </tr>
          </table>
          
          <!-- Divider -->
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td style="padding: 24px 0;">
                <div style="border-top: 1px solid #e5e7eb;"></div>
              </td>
            </tr>
          </table>
          
          <!-- Didn't request notice -->
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #eff6ff; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
            <tr>
              <td>
                <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #1e40af;">
                  ℹ️ Didn't Request This?
                </p>
                <p style="margin: 0; font-size: 14px; color: #1e3a8a; line-height: 1.5;">
                  If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged, and your account is secure.
                </p>
              </td>
            </tr>
          </table>
          
          <p style="font-size: 16px; color: #4a4a4a; line-height: 1.6; margin: 0 0 16px 0;">
            If you're having trouble with the password reset or have any security concerns, please contact our support team immediately.
          </p>
          
          <p style="font-size: 16px; color: #4a4a4a; line-height: 1.6; margin: 24px 0 0 0;">
            Best regards,<br>
            <strong>The Tech News Team</strong>
          </p>
        </td>
      </tr>
    </table>
  `;

  return baseTemplate(content, {
    preheaderText: `Reset your Tech News account password - Link expires in ${expirationTime}`,
    showHeader: true,
    showFooter: true
  });
};

module.exports = passwordResetEmail;
