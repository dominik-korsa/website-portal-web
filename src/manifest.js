module.exports = {
  name: 'Website Portal',
  version: '0.0.1',
  description: 'Website Portal',
  author: 'Dominik Korsa',
  manifest_version: 2,
  icons: { 16: 'icons/16.png', 128: 'icons/128.png' },
  permissions: [
    'activeTab',
    'tabs',
    'storage',
  ],
  browser_action: {
    default_title: 'Website Portal',
    default_popup: 'pages/popup.html',
  },
  background: {
    persistent: true,
    page: 'pages/background.html',
  },
  content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self'",
};
