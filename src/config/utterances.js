// Utterances configuration
export const utterancesConfig = {
  // GitHub repository where comments will be stored as issues
  // Format: "username/repository-name"
  // Make sure this repository exists and is public
  repo: 'FRAGGERR/portfolio',

  // How to identify the page for comments
  // Options: "pathname", "url", "title", "og:title"
  issueTerm: 'pathname',

  // Label to apply to comment issues
  label: 'comment',

  // Theme for the comments widget
  // Options: "github-light", "github-dark", "preferred-color-scheme"
  theme: 'preferred-color-scheme',

  // Cross-origin setting
  crossOrigin: 'anonymous',
};

// Alternative configuration for testing
export const utterancesConfigAlt = {
  repo: 'FRAGGERR/portfolio',
  issueTerm: 'url',
  label: 'blog-comment',
  theme: 'github-dark',
};

export default utterancesConfig;
