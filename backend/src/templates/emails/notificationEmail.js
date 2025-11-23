const baseTemplate = require('./baseTemplate');

/**
 * Generic notification email template
 * @param {object} notification - Notification object
 * @param {object} options - Additional options
 */
const notificationEmail = (notification, options = {}) => {
  const {
    actionUrl = null,
    actionText = 'View Details'
  } = options;

  const notificationTypes = {
    success: { icon: '✅', color: '#10b981', bgColor: '#d1fae5', borderColor: '#10b981' },
    info: { icon: 'ℹ️', color: '#3b82f6', bgColor: '#dbeafe', borderColor: '#3b82f6' },
    warning: { icon: '⚠️', color: '#f59e0b', bgColor: '#fef3c7', borderColor: '#f59e0b' },
    error: { icon: '❌', color: '#ef4444', bgColor: '#fef2f2', borderColor: '#ef4444' }
  };

  const type = notification.type || 'info';
  const theme = notificationTypes[type] || notificationTypes.info;

  const content = `
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      <tr>
        <td>
          <!-- Notification type badge -->
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 24px;">
            <tr>
              <td style="background-color: ${theme.bgColor}; color: ${theme.color}; padding: 8px 16px; border-radius: 6px; font-size: 14px; font-weight: 600; border-left: 4px solid ${theme.borderColor};">
                ${theme.icon} ${type.charAt(0).toUpperCase() + type.slice(1)} Notification
              </td>
            </tr>
          </table>
          
          <h1 style="color: #1a1a1a; font-size: 28px; font-weight: 700; margin: 0 0 24px 0;">
            ${notification.title}
          </h1>
          
          ${notification.greeting ? `
          <p style="font-size: 16px; color: #4a4a4a; line-height: 1.6; margin: 0 0 16px 0;">
            ${notification.greeting}
          </p>
          ` : ''}
          
          <p style="font-size: 16px; color: #4a4a4a; line-height: 1.6; margin: 0 0 24px 0;">
            ${notification.message}
          </p>
          
          ${notification.details ? `
          <!-- Details box -->
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
            <tr>
              <td>
                <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #374151;">
                  Details:
                </p>
                ${Array.isArray(notification.details) ? `
                  ${notification.details.map(detail => `
                    <p style="margin: 0 0 8px 0; font-size: 14px; color: #6b7280; line-height: 1.5;">
                      • ${detail}
                    </p>
                  `).join('')}
                ` : `
                  <p style="margin: 0; font-size: 14px; color: #6b7280; line-height: 1.5;">
                    ${notification.details}
                  </p>
                `}
              </td>
            </tr>
          </table>
          ` : ''}
          
          ${actionUrl ? `
          <!-- CTA Button -->
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td style="text-align: center; padding: 8px 0 32px 0;">
                <a href="${actionUrl}" class="btn btn-primary" style="display: inline-block; padding: 14px 32px; font-size: 16px; font-weight: 600; text-decoration: none; border-radius: 6px; background-color: #4f46e5; color: #ffffff;">
                  ${actionText}
                </a>
              </td>
            </tr>
          </table>
          ` : ''}
          
          ${notification.additionalInfo ? `
          <!-- Additional info -->
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: ${theme.bgColor}; border-radius: 8px; padding: 20px; margin-bottom: 24px; border-left: 4px solid ${theme.borderColor};">
            <tr>
              <td>
                <p style="margin: 0; font-size: 14px; color: #374151; line-height: 1.5;">
                  ${notification.additionalInfo}
                </p>
              </td>
            </tr>
          </table>
          ` : ''}
          
          ${notification.steps && notification.steps.length > 0 ? `
          <!-- Next steps -->
          <p style="font-size: 16px; color: #1a1a1a; font-weight: 600; margin: 0 0 16px 0;">
            ${notification.stepsTitle || 'Next Steps:'}
          </p>
          
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 24px;">
            ${notification.steps.map((step, index) => `
              <tr>
                <td style="padding: 12px 0; vertical-align: top;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td style="width: 32px; vertical-align: top;">
                        <div style="width: 24px; height: 24px; background-color: #4f46e5; color: #ffffff; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; font-weight: 600;">
                          ${index + 1}
                        </div>
                      </td>
                      <td style="padding-left: 12px;">
                        <p style="margin: 0; font-size: 15px; color: #4a4a4a; line-height: 1.5;">
                          ${step}
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            `).join('')}
          </table>
          ` : ''}
          
          <p style="font-size: 16px; color: #4a4a4a; line-height: 1.6; margin: 0 0 16px 0;">
            ${notification.closingText || 'If you have any questions or need assistance, please don\'t hesitate to contact our support team.'}
          </p>
          
          <p style="font-size: 16px; color: #4a4a4a; line-height: 1.6; margin: 24px 0 0 0;">
            ${notification.signature || 'Best regards,<br><strong>The Tech News Team</strong>'}
          </p>
        </td>
      </tr>
    </table>
  `;

  return baseTemplate(content, {
    preheaderText: notification.preheader || notification.title,
    showHeader: true,
    showFooter: true
  });
};

module.exports = notificationEmail;
