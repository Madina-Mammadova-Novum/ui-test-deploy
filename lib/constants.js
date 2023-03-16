export const NAVIGATIONS = ['main-navigation', 'buttons-navigation'];

// For Prefer default export - can be removed
export const STYLES = ['default', 'primary', 'secondary', 'muted', 'tertiary', 'delete'];

// Links
export const ROUTES = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  NEGOTIATING: '/negotiating',
  ACCOUNT_INFO: '/account/information',
  PRIVACY_POLICY: '/privacy-polocy',
  TERMS_AND_CONDITIONS: '/terms-and-conditions',
  AUTH: '/auth',
};

export const ROLES = {
  OWNER: 'owner',
  CHARTERER: 'charterer',
};

export const SETTINGS = {
  MAX_NUMBER_OF_TANKERS: 10,
};

export const SIZES = {
  LOGO: {
    height: 44,
    width: 200,
  },
  BUTTONS: ['large', 'medium', 'small'],
};

export const SCREENS = {
  sm: '(max-width: 480px)',
  md: '(max-width: 768px)',
  lg: '(max-width: 1023px)',
  xl: '(max-width: 1400px)',
};

export const PALETTE = {
  COLORS: {
    BLACK: {
      DEFAULT: '#072D46',
    },
    GREY: {
      DEFAULT: '#828C9C',
    },
    WHITE: {
      100: '#F9FBFC',
      DEFAULT: '#FFFFFF',
    },
    GREEN: {
      DEFAULT: '#24D364',
    },
    RED: {
      DEFAULT: '#E63636',
    },
    YELLOW: {
      DEFAULT: '#FFCD5A',
    },
    BLUE: {
      DEFAULT: '#199AF5',
    },
  },
};

export const AVAILABLE_FORMATS = {
  DOCS: [
    '.docx',
    '.doc',
    '.odt',
    '.rtf',
    '.pdf',
    '.txt',
    '.xlsx',
    '.xls',
    '.ods',
    '.csv',
    '.tsv',
    '.png',
    '.jpg',
    '.jpeg',
    '.pptx',
    '.ppt',
    '.odp',
    '.webp',
  ],
};
