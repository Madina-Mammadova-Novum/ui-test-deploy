export const NAVIGATIONS = ['main-navigation', 'buttons-navigation'];

// For Prefer default export - can be removed
export const STYLES = ['default', 'primary', 'secondary', 'tertiary', 'delete'];
export const BUTTON_SIZES = ['large', 'medium', 'small'];

// Links
export const ROUTES = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  NEGOTIATING: '/negotiating',
  ACCOUNT_SEARCH: '/account/search',
  ACCOUNT_INFO: '/account/information',
  PRIVACY_POLICY: '/privacy-policy', // todo: it's should manage from strapi as a navigation menu
  TERMS_AND_CONDITIONS: '/terms-and-conditions', // todo: it's should manage from strapi as a navigation menu
  ACCOUNT_POSITIONS: '/account/positions',
  ACCOUNT_NEGOTIATING: '/account/negotiating',
  ACCOUNT_PREFIXTURE: '/account/pre-fixture',
  ACCOUNT_FIXTURE: '/account/fixture',
  ACCOUNT_POSTFIXTURE: '/account/post-fixture',
  ACCOUNT_ONSUBS: '/account/on-subs',
  FLEETS: '/fleets',
  FAQ: '/faq',
  AUTH: '/auth',
};

export const ROLES = {
  OWNER: 'owner',
  CHARTERER: 'charterer',
};

export const ADDRESS = {
  REGISTRATION: 'registration',
  CORRESPONDENCE: 'correspondence',
};

export const SETTINGS = {
  MAX_NUMBER_OF_TANKERS: 10,
  MAX_NUMBER_OF_CARGOES: 6,
  MAX_NUMBER_OF_IMO_VALUE: 7,
};

export const NAVIGATION_PARAMS = {
  CURRENT_PAGE: 1,
  PER_PAGES: 5,
  TOTAL_PAGES: 9,
  DATA_PER_PAGE: [5, 10, 15],
  PAGES_LENGTH: 9,
};

export const REGEX = {
  PHONE: /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]\\|;:'",.<>/?-]).{8,}$/,
  IMO: /^[0-9]{7}$/,
};

export const SIZES = {
  LOGO: {
    height: 44,
    width: 200,
  },
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

export const COUNTDOWN_OPTIONS = ['20 min', '40 min', '60 min'];

export const TYPE = {
  IMO: 'IMO',
  PORT: 'PORT',
  DATE: 'DATE',
  TANKER_NAME: 'TANKER_NAME',
  TANKER_STATUS: 'TANKER_STATUS',
};

export const NO_DATA_MESSAGE = {
  DEFAULT: 'No data',
  IMO: 'Imo not found',
  PORT: 'No open port',
  DATE: 'No open date',
};
