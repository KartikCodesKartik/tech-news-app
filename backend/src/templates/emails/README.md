# Email Templates Documentation

Professional HTML email templates for Tech News App with responsive design and email client compatibility.

## Overview

This directory contains reusable, professional HTML email templates designed for the Tech News application. All templates are mobile-responsive, compatible with major email clients (Gmail, Outlook, Apple Mail, etc.), and follow email development best practices.

## Template Structure

### Base Template (`baseTemplate.js`)

The foundation for all email templates. It provides:

- **Responsive Design**: Mobile-first design that adapts to all screen sizes
- **Email Client Compatibility**: Tested with Gmail, Outlook, Apple Mail, Yahoo Mail
- **Professional Styling**: Modern gradient header, consistent typography, and spacing
- **Reusable Components**: Header, footer, and content areas
- **Dark Mode Support**: Respects user's email client dark mode preferences
- **Security**: Uses table-based layouts for maximum compatibility

#### Usage

```javascript
const baseTemplate = require('./baseTemplate');

const html = baseTemplate(contentHTML, {
  preheaderText: 'Preview text shown in inbox',
  showHeader: true,
  showFooter: true,
  unsubscribeUrl: 'https://example.com/unsubscribe'
});
```

#### Options

- `preheaderText` (string): Text displayed in email preview (before opening)
- `showHeader` (boolean): Show/hide branded header (default: true)
- `showFooter` (boolean): Show/hide footer with links and copyright (default: true)
- `unsubscribeUrl` (string|null): Optional unsubscribe link for newsletters

## Available Templates

### 1. Welcome Email (`welcomeEmail.js`)

Sent to new users when their account is created.

**Features:**
- Personalized greeting with user's name
- Overview of key features with visual cards
- Call-to-action button to access dashboard
- Account details summary
- Encouraging tone for new users

**Usage:**

```javascript
const { welcomeEmail } = require('./templates/emails');

const html = welcomeEmail('John Doe', 'john@example.com', {
  loginUrl: 'https://technews.com/login',
  dashboardUrl: 'https://technews.com/admin/dashboard'
});
```

**Parameters:**
- `name` (string): User's full name
- `email` (string): User's email address
- `options` (object): Optional configuration
  - `loginUrl`: Custom login page URL
  - `dashboardUrl`: Custom dashboard URL

---

### 2. Password Reset Email (`passwordResetEmail.js`)

Sent when a user requests a password reset.

**Features:**
- Clear password reset instructions
- Prominent reset button with secure link
- Security warnings and expiration notice
- Alternative text link for accessibility
- "Didn't request this?" information box

**Usage:**

```javascript
const { passwordResetEmail } = require('./templates/emails');

const html = passwordResetEmail('John Doe', 'https://technews.com/reset/token123', {
  expirationTime: '1 hour'
});
```

**Parameters:**
- `name` (string): User's full name
- `resetUrl` (string): Password reset URL with token
- `options` (object): Optional configuration
  - `expirationTime`: Time until link expires (default: '1 hour')

---

### 3. Newsletter Email (`newsletterEmail.js`)

Sent to subscribers when new articles are published.

**Features:**
- Article title, excerpt, and featured image
- Category badge and reading time
- Publication date and author information
- Call-to-action to read full article
- Link to browse more articles
- Unsubscribe option

**Usage:**

```javascript
const { newsletterEmail } = require('./templates/emails');

const article = {
  _id: '123',
  title: 'The Future of AI',
  excerpt: 'Exploring upcoming trends...',
  category: 'Artificial Intelligence',
  readTime: '8 min read',
  imageUrl: 'https://example.com/image.jpg',
  author: { name: 'Jane Smith' },
  publishedAt: new Date()
};

const html = newsletterEmail(article, {
  unsubscribeUrl: 'https://technews.com/unsubscribe?email=user@example.com'
});
```

**Parameters:**
- `article` (object): Article data
  - `_id` or `id`: Article identifier
  - `title`: Article title
  - `excerpt` or `description`: Brief summary
  - `category`: Article category (optional)
  - `readTime`: Estimated reading time (optional)
  - `imageUrl`: Featured image URL (optional)
  - `author`: Author object with `name` property (optional)
  - `publishedAt`: Publication date (optional)
  - `contentPreview`: Additional content preview HTML (optional)
- `options` (object): Optional configuration
  - `unsubscribeUrl`: Link to unsubscribe from newsletter
  - `moreArticlesUrl`: Link to browse all articles

---

### 4. Notification Email (`notificationEmail.js`)

Generic template for system notifications, alerts, and updates.

**Features:**
- Flexible notification types (success, info, warning, error)
- Color-coded badges and visual indicators
- Support for detailed information boxes
- Optional action buttons
- Numbered steps/instructions support
- Customizable content structure

**Usage:**

```javascript
const { notificationEmail } = require('./templates/emails');

const notification = {
  type: 'success', // 'success', 'info', 'warning', 'error'
  title: 'Article Published Successfully',
  greeting: 'Hi John,',
  message: 'Your article has been published and is now live.',
  details: [
    'Article ID: 12345',
    'Published: 2024-01-15',
    'Category: Technology'
  ],
  steps: [
    'Share your article on social media',
    'Engage with reader comments',
    'Monitor analytics in your dashboard'
  ],
  stepsTitle: 'Next Steps:',
  additionalInfo: 'Your article will be included in the next newsletter.',
  closingText: 'Thank you for contributing to Tech News!',
  signature: 'Best regards,<br><strong>The Tech News Team</strong>',
  preheader: 'Your article is now published'
};

const html = notificationEmail(notification, {
  actionUrl: 'https://technews.com/article/12345',
  actionText: 'View Article'
});
```

**Parameters:**
- `notification` (object): Notification data
  - `type`: 'success', 'info', 'warning', or 'error'
  - `title`: Main notification heading
  - `greeting`: Optional greeting message
  - `message`: Main notification message
  - `details`: String or array of detail items
  - `steps`: Array of step-by-step instructions
  - `stepsTitle`: Custom title for steps section
  - `additionalInfo`: Extra information in colored box
  - `closingText`: Custom closing message
  - `signature`: Custom signature
  - `preheader`: Preview text for inbox
- `options` (object): Optional configuration
  - `actionUrl`: URL for action button
  - `actionText`: Text for action button (default: 'View Details')

## Design Features

### Color Palette

- **Primary Purple**: `#4f46e5` (Buttons, CTAs)
- **Secondary Purple**: `#6366f1` (Accents)
- **Gradient Header**: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- **Text Colors**:
  - Headings: `#1a1a1a`
  - Body: `#4a4a4a`
  - Muted: `#6b7280`
- **Background**: `#f4f7fa` (Email background), `#ffffff` (Content)
- **Status Colors**:
  - Success: `#10b981`
  - Info: `#3b82f6`
  - Warning: `#f59e0b`
  - Error: `#ef4444`

### Typography

- **Font Stack**: System fonts for best compatibility
  - `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`
- **Font Sizes**:
  - H1: 28px
  - H2: 24px
  - H3: 20px
  - Body: 16px
  - Small: 14px, 13px, 12px
- **Line Heights**: 1.3 for headings, 1.6-1.8 for body text

### Responsive Design

All templates automatically adapt to mobile devices:
- Container width adjusts from 600px to 100% on mobile
- Padding reduces on smaller screens
- Font sizes scale appropriately
- Buttons become full-width on mobile
- Tables stack vertically on narrow screens

### Email Client Compatibility

Tested and optimized for:
- ✅ Gmail (Desktop & Mobile)
- ✅ Outlook (2016, 2019, 365, Web)
- ✅ Apple Mail (macOS & iOS)
- ✅ Yahoo Mail
- ✅ Thunderbird
- ✅ Samsung Mail
- ✅ Other major email clients

### Best Practices Implemented

1. **Table-Based Layout**: Uses HTML tables for maximum compatibility
2. **Inline CSS**: Critical styles are inlined for email client support
3. **Alt Text**: All images include descriptive alt text
4. **Preheader Text**: Hidden preview text for better inbox presentation
5. **Safe Fonts**: System fonts with fallbacks
6. **Proper Structure**: Semantic HTML with ARIA roles
7. **Reset Styles**: Email-specific CSS resets included
8. **Dark Mode Support**: Media query for dark mode preferences
9. **Accessibility**: Proper heading hierarchy and link descriptions
10. **VML for Outlook**: Conditional comments for Outlook-specific fixes

## Integration with emailService.js

The templates integrate seamlessly with the existing email service:

```javascript
// In emailService.js
const {
  welcomeEmail,
  passwordResetEmail,
  newsletterEmail,
  notificationEmail
} = require('../templates/emails');

const sendWelcomeEmail = async (email, name) => {
  const subject = 'Welcome to Tech News App';
  const html = welcomeEmail(name, email);
  await sendEmail({ to: email, subject, html });
};
```

## Customization

### Modifying Base Template

To change the overall look across all emails, edit `baseTemplate.js`:

```javascript
// Change colors
const primaryColor = '#4f46e5';
const backgroundColor = '#f4f7fa';

// Change header gradient
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

// Adjust container width
width="600" // Maximum width for desktop
```

### Adding New Templates

1. Create a new template file in `/templates/emails/`
2. Import and use `baseTemplate`
3. Export the template function
4. Add to `index.js` exports
5. Use in `emailService.js`

Example:

```javascript
// templates/emails/myNewTemplate.js
const baseTemplate = require('./baseTemplate');

const myNewTemplate = (data, options = {}) => {
  const content = `
    <h1>${data.title}</h1>
    <p>${data.message}</p>
  `;
  
  return baseTemplate(content, {
    preheaderText: data.preview,
    showHeader: true,
    showFooter: true
  });
};

module.exports = myNewTemplate;
```

## Testing

### Visual Testing

Test emails visually using:
1. **Litmus**: Comprehensive email testing across clients
2. **Email on Acid**: Similar to Litmus
3. **Mailtrap**: Safe testing environment
4. **Real Devices**: Send test emails to actual devices

### Manual Testing Checklist

- [ ] Desktop Gmail
- [ ] Mobile Gmail (iOS/Android)
- [ ] Outlook Desktop
- [ ] Outlook Web
- [ ] Apple Mail (macOS)
- [ ] Apple Mail (iOS)
- [ ] Dark mode rendering
- [ ] All links work correctly
- [ ] Images load properly
- [ ] Responsive behavior on mobile
- [ ] Text is readable without images
- [ ] Unsubscribe link works (for newsletters)

### Code Testing

```javascript
// Test template rendering
const { welcomeEmail } = require('./templates/emails');

const html = welcomeEmail('Test User', 'test@example.com');
console.log(html); // Verify HTML output

// Write to file for inspection
const fs = require('fs');
fs.writeFileSync('test-email.html', html);
```

## Environment Variables Required

Make sure these are set in `.env`:

```env
FRONTEND_URL=http://localhost:3000
BREVO_FROM_EMAIL=noreply@technews.com
BREVO_FROM_NAME=Tech News App
```

## Security Considerations

1. **No External Resources**: All styles are inline (no external CSS files)
2. **Safe URLs**: All URLs use environment variables
3. **XSS Prevention**: User input should be sanitized before passing to templates
4. **Token Security**: Reset tokens should be cryptographically secure
5. **HTTPS**: All links should use HTTPS in production

## Maintenance

### Regular Updates

- Review email client compatibility quarterly
- Update styles to match brand guidelines
- Test new email client versions
- Monitor email deliverability metrics
- Update footer links and contact information

### Version History

- **v1.0.0**: Initial professional templates with responsive design
  - Welcome email
  - Password reset email
  - Newsletter email
  - Notification email
  - Base template with modern design

## Support

For questions or issues with email templates:
1. Check email client compatibility
2. Verify environment variables are set
3. Test with Mailtrap or similar service
4. Review email service logs
5. Contact support team

## License

Part of Tech News App - MIT License
