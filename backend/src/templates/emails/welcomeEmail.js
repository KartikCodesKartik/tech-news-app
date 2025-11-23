const baseTemplate = require('./baseTemplate');

/**
 * Welcome email template for new users
 * @param {string} name - User's name
 * @param {string} email - User's email
 * @param {object} options - Additional options
 */
const welcomeEmail = (name, email, options = {}) => {
  const {
    loginUrl = `${process.env.FRONTEND_URL || ''}/login`,
    dashboardUrl = `${process.env.FRONTEND_URL || ''}/admin/dashboard`
  } = options;

  const content = `
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      <tr>
        <td>
          <h1 style="color: #1a1a1a; font-size: 28px; font-weight: 700; margin: 0 0 24px 0;">
            Welcome to Tech News! 👋
          </h1>
          
          <p style="font-size: 16px; color: #4a4a4a; line-height: 1.6; margin: 0 0 16px 0;">
            Hi <strong>${name}</strong>,
          </p>
          
          <p style="font-size: 16px; color: #4a4a4a; line-height: 1.6; margin: 0 0 16px 0;">
            Welcome aboard! We're thrilled to have you join the Tech News community. Your account has been successfully created, and you're now ready to start exploring the latest in technology news and trends.
          </p>
          
          <p style="font-size: 16px; color: #4a4a4a; line-height: 1.6; margin: 0 0 24px 0;">
            Here's what you can do with your account:
          </p>
          
          <!-- Feature boxes -->
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 32px;">
            <tr>
              <td style="padding: 20px; background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #4f46e5; margin-bottom: 12px;">
                <h3 style="color: #1a1a1a; font-size: 18px; font-weight: 600; margin: 0 0 8px 0;">
                  📝 Create & Manage Articles
                </h3>
                <p style="font-size: 15px; color: #6b7280; line-height: 1.5; margin: 0;">
                  Write, edit, and publish tech news articles with our intuitive content management system.
                </p>
              </td>
            </tr>
            <tr><td style="height: 12px;"></td></tr>
            <tr>
              <td style="padding: 20px; background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #6366f1;">
                <h3 style="color: #1a1a1a; font-size: 18px; font-weight: 600; margin: 0 0 8px 0;">
                  📊 Track Analytics
                </h3>
                <p style="font-size: 15px; color: #6b7280; line-height: 1.5; margin: 0;">
                  Monitor article views, engagement metrics, and gain insights into your content performance.
                </p>
              </td>
            </tr>
            <tr><td style="height: 12px;"></td></tr>
            <tr>
              <td style="padding: 20px; background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #8b5cf6;">
                <h3 style="color: #1a1a1a; font-size: 18px; font-weight: 600; margin: 0 0 8px 0;">
                  🚀 Publish to Subscribers
                </h3>
                <p style="font-size: 15px; color: #6b7280; line-height: 1.5; margin: 0;">
                  Share your articles with our growing community of tech enthusiasts through our newsletter system.
                </p>
              </td>
            </tr>
          </table>
          
          <!-- CTA Button -->
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td style="text-align: center; padding: 8px 0 32px 0;">
                <a href="${dashboardUrl}" class="btn btn-primary" style="display: inline-block; padding: 14px 32px; font-size: 16px; font-weight: 600; text-decoration: none; border-radius: 6px; background-color: #4f46e5; color: #ffffff;">
                  Go to Dashboard →
                </a>
              </td>
            </tr>
          </table>
          
          <!-- Account details -->
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fef3c7; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
            <tr>
              <td>
                <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #92400e;">
                  📧 Your Account Details
                </p>
                <p style="margin: 0; font-size: 14px; color: #78350f; line-height: 1.5;">
                  <strong>Email:</strong> ${email}
                </p>
              </td>
            </tr>
          </table>
          
          <p style="font-size: 16px; color: #4a4a4a; line-height: 1.6; margin: 0 0 16px 0;">
            If you have any questions or need assistance getting started, don't hesitate to reach out to our support team. We're here to help!
          </p>
          
          <p style="font-size: 16px; color: #4a4a4a; line-height: 1.6; margin: 0;">
            Happy publishing! 🎉
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
    preheaderText: `Welcome to Tech News, ${name}! Your account is ready.`,
    showHeader: true,
    showFooter: true
  });
};

module.exports = welcomeEmail;
