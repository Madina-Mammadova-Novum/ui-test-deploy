import { options } from '@/utils/helpers';

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
  LEGAL_EXCLUDED: '/legal/cookie-statement',
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
  PAGES_LENGTH: 9,
  DATA_PER_PAGE: options([5, 10, 15]),
  DATA_SORT_OPTIONS: options(['ascending', 'descending']),
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
  SM: '(max-width: 480px)',
  MD: '(max-width: 768px)',
  LG: '(max-width: 1280px)',
  XL: '(max-width: 1440px)',
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

export const COUNTDOWN_OPTIONS = options(['10m', '20m', '30m', '45m', '1h', '1h 30m', '2h']);

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
  HELPER_FLEETS: 'To add an open port and a date, you must first reactivate the tanker status',
};

export const CONTACT_US_MAP_OPTIONS = {
  url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.406231621027!2d-73.98525642350366!3d40.775082533750506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2588aabf0a4cf%3A0x55d5730645a7b36d!2zMTk4MSBCcm9hZHdheSwgTmV3IFlvcmssIE5ZIDEwMDIzLCDQodCo0JA!5e0!3m2!1sru!2sua!4v1682956776654!5m2!1sru!2sua',
  title: '1981 Broadway, New York, NY 10023 US'
}


export const CARGO_TYPE_KEY = 'cargoType';

export const SYSTEM_ERROR = 'Something went wrong';
