const baseTemplate = require('./baseTemplate');

/**
 * Newsletter/Tech news digest email template
 * @param {object} article - Article object with title, excerpt, content preview, etc.
 * @param {object} options - Additional options
 */
const newsletterEmail = (article, options = {}) => {
  const {
    unsubscribeUrl = null,
    moreArticlesUrl = `${process.env.FRONTEND_URL || ''}`
  } = options;

  const articleUrl = `${process.env.FRONTEND_URL || ''}/article/${article._id || article.id}`;
  const readTime = article.readTime || '5 min read';
  const category = article.category || 'Technology';
  const publishDate = article.publishedAt 
    ? new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const content = `
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      <tr>
        <td>
          <!-- Category badge -->
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 16px;">
            <tr>
              <td style="background-color: #dbeafe; color: #1e40af; padding: 6px 12px; border-radius: 4px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                ${category}
              </td>
            </tr>
          </table>
          
          <h1 style="color: #1a1a1a; font-size: 28px; font-weight: 700; margin: 0 0 16px 0; line-height: 1.3;">
            ${article.title}
          </h1>
          
          <!-- Meta information -->
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 24px;">
            <tr>
              <td>
                <p style="font-size: 14px; color: #6b7280; margin: 0; line-height: 1.5;">
                  📅 ${publishDate} • ⏱️ ${readTime}
                </p>
              </td>
            </tr>
          </table>
          
          ${article.imageUrl ? `
          <!-- Featured image -->
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 24px;">
            <tr>
              <td style="border-radius: 8px; overflow: hidden;">
                <img src="${article.imageUrl}" alt="${article.title}" style="width: 100%; height: auto; display: block; border-radius: 8px;" />
              </td>
            </tr>
          </table>
          ` : ''}
          
          <!-- Article excerpt -->
          <p style="font-size: 18px; color: #4a4a4a; line-height: 1.7; margin: 0 0 24px 0; font-weight: 500;">
            ${article.excerpt || article.description || ''}
          </p>
          
          ${article.contentPreview ? `
          <!-- Content preview -->
          <div style="font-size: 16px; color: #4a4a4a; line-height: 1.8; margin: 0 0 32px 0;">
            ${article.contentPreview}
          </div>
          ` : ''}
          
          <!-- CTA Button -->
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td style="text-align: center; padding: 8px 0 32px 0;">
                <a href="${articleUrl}" class="btn btn-primary" style="display: inline-block; padding: 14px 32px; font-size: 16px; font-weight: 600; text-decoration: none; border-radius: 6px; background-color: #4f46e5; color: #ffffff;">
                  Read Full Article →
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
          
          <!-- Author info -->
          ${article.author ? `
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
            <tr>
              <td>
                <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">
                  Written By
                </p>
                <p style="margin: 0; font-size: 16px; color: #1a1a1a; font-weight: 600;">
                  ${article.author.name || article.author}
                </p>
              </td>
            </tr>
          </table>
          ` : ''}
          
          <!-- More articles CTA -->
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; padding: 24px; margin-bottom: 24px;">
            <tr>
              <td style="text-align: center;">
                <h3 style="color: #ffffff; font-size: 20px; font-weight: 600; margin: 0 0 12px 0;">
                  🚀 Explore More Tech News
                </h3>
                <p style="color: #e0e7ff; font-size: 15px; line-height: 1.5; margin: 0 0 20px 0;">
                  Stay ahead of the curve with the latest technology trends, insights, and innovations.
                </p>
                <a href="${moreArticlesUrl}" class="btn" style="display: inline-block; padding: 12px 28px; font-size: 15px; font-weight: 600; text-decoration: none; border-radius: 6px; background-color: #ffffff; color: #4f46e5;">
                  Browse All Articles
                </a>
              </td>
            </tr>
          </table>
          
          <p style="font-size: 16px; color: #4a4a4a; line-height: 1.6; margin: 24px 0 0 0;">
            Happy reading! 📖<br>
            <strong>The Tech News Team</strong>
          </p>
        </td>
      </tr>
    </table>
  `;

  return baseTemplate(content, {
    preheaderText: `New article: ${article.title}`,
    showHeader: true,
    showFooter: true,
    unsubscribeUrl
  });
};

module.exports = newsletterEmail;
