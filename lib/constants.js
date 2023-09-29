import SortAmountSVG from '@/assets/images/sortAmount.svg';
import { options } from '@/utils/helpers';

export const ROOT_SLUG = 'home';
export const ROOT_COLLECTION_TYPE = 'page';

export const NAVIGATIONS = ['main-navigation', 'buttons-navigation'];

// For Prefer default export - can be removed
export const STYLES = ['default', 'primary', 'secondary', 'tertiary', 'delete'];
export const BUTTON_SIZES = ['large', 'medium', 'small'];

// Links
export const ROUTES = {
  ROOT: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  NEGOTIATING: '/negotiating',
  LEGAL_EXCLUDED: '/legal/cookie-statement',
  ACCOUNT_SEARCH: '/account/search',
  ACCOUNT_INFO: '/account/information',
  ACCOUNT_POSITIONS: '/account/positions',
  ACCOUNT_NEGOTIATING: '/account/negotiating',
  ACCOUNT_PREFIXTURE: '/account/pre-fixture',
  ACCOUNT_TOOLS: '/account/tools',
  ACCOUNT_FIXTURE: '/account/fixture',
  ACCOUNT_POSTFIXTURE: '/account/post-fixture',
  ACCOUNT_ONSUBS: '/account/on-subs',
  ACCOUNT_FLEETS: '/account/fleets',
  TOOLS: '/tools',
  FAQ: '/account/faq',
  AUTH: '/auth',
  NOT_FOUND: '/not-found',
};

export const ROLES = {
  OWNER: 'owner',
  CHARTERER: 'charterer',
  BROKER: 'broker',
};

export const ADDRESS = {
  REGISTRATION: 'registration',
  CORRESPONDENCE: 'correspondence',
};

export const SETTINGS = {
  MAX_NUMBER_OF_TANKERS: 10,
  MAX_NUMBER_OF_CARGOES: 6,
  MAX_NUMBER_OF_IMO_VALUE: 7,
  FILE_SIZE_RESTRICTION: 10,
};

export const NEGOTIATING_TABS = {
  OWNER: [
    {
      value: 'incoming',
      label: 'Incoming',
    },
    {
      value: 'counteroffers',
      label: 'Sent',
    },
    {
      value: 'failed',
      label: 'Declined',
    },
  ],
  CHARTERER: [
    {
      value: 'incoming',
      label: 'Sent',
    },
    {
      value: 'counteroffers',
      label: 'Incoming',
    },
    {
      value: 'failed',
      label: 'Declined',
    },
  ],
};

export const DEFAULT_FETCH_AMOUNT = 100000;

export const SORT_OPTIONS = {
  asc: {
    label: 'ascending',
    value: 'asc',
    coverImage: <SortAmountSVG className="fill-black -scale-y-100 mr-1 w-5 h-5" viewBox="0 0 24 24" />,
  },
  dsc: {
    label: 'descending',
    value: 'desc',
    coverImage: <SortAmountSVG className="fill-black mr-1 w-5 h-5" viewBox="0 0 24 24" />,
  },
};

export const NAVIGATION_PARAMS = {
  CURRENT_PAGE: 1,
  PAGES_LENGTH: 9,
  DATA_PER_PAGE: options([5, 10, 15]),
  DATA_SORT_OPTIONS: [SORT_OPTIONS.asc, SORT_OPTIONS.dsc],
};

export const REGEX = {
  PHONE: /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]\\|;:'",.<>/?-]).{8,}$/,
  IMO: /^[0-9]{7}$/,
  DETECT_ID: /([A-Za-z]{2}\d+)/g,
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
  ],
};

export const COUNTDOWN_OPTIONS = options(['10m', '20m', '30m', '45m', '1h', '1h 30m', '2h']);

export const ACTIONS = {
  IMO: 'IMO',
  PORT: 'PORT',
  DATE: 'DATE',
  TANKER_NAME: 'TANKER_NAME',
  TANKER_DEACTIVATE: 'TANKER_DEACTIVATE',
  TANKER_REACTIVATE: 'TANKER_REACTIVATE',
  VIEW_OFFER: 'VIEW_OFFER',
  VIEW_COUNTEROFFER: 'VIEW_COUNTEROFFER',
  VIEW_CHARTERER_COUNTEROFFER: 'VIEW_CHARTERER_COUNTEROFFER',
  VIEW_SENT_OFFER: 'VIEW_SENT_OFFER',
  VIEW_FAILED_OFFER: 'VIEW_FAILED_OFFER',
  VIEW_COMMENTS: 'VIEW_COMMENTS',
  CHARTERER_INFORMATION: 'CHARTERER_INFORMATION',
  TANKER_INFORMATION: 'TANKER_INFORMATION',
  DOWNLOAD: 'DOWNLOAD',
  DELETE_TANKER_FROM_FLEET: 'DELETE_TANKER_FROM_FLEET',
  DELETE_TANKER: 'DELETE_TANKER',
  ADD_TANKER: 'ADD_TANKER',
  EDIT_FLEET: 'EDIT_FLEET',
  DELETE_FLEET: 'DELETE_FLEET',
  REQUEST_UPDATE_TANKER_INFO: 'REQUEST_UPDATE_TANKER_INFO',
  VIEW_QUESTIONAIRE: 'VIEW_QUESTIONAIRE',
  DELETE: 'DELETE',
  ASSIGN_FLEET: 'ASSIGN_FLEET',
};

export const TYPE = {
  SEMIBOLD: 'SEMIBOLD',
  SEMIBOLD_BLUE: 'SEMIBOLD_BLUE',
  RED: 'RED',
  GREY: 'GREY',
};

export const NO_DATA_MESSAGE = {
  DEFAULT: 'No data',
  IMO: 'Imo not found',
  PORT: 'No open port',
  DATE: 'No open date',
  HELPER_FLEETS: 'To add an open port and a date, you must first reactivate the tanker status',
};

export const NOTIFICATION_FILTERS = {
  all: 'all',
  systemUpd: 'SystemUpdates',
  dealUpd: 'DealUpdate',
  contactUs: 'ContactUsInquires',
  reminders: 'Reminders',
  tickets: 'Tickets',
  management: 'Management',
  cargoIdChat: 'CargoIdChat',
  helpCenterChat: 'HelpCenterChat',
  offerFailed: 'OfferFailed',
  offerAccepted: 'OfferAccepted',
  newOffer: 'NewOffer',
  counterOffer: 'CounterOffer',
  announcements: 'Announcements',
};

export const FREIGHT_PLACEHOLDERS = {
  WS: 'WS',
  Lumpsum: '$',
  '$/mt': '$/mt',
};

export const CARGO_TYPE_KEY = 'cargoType';

export const SYSTEM_ERROR = 'Something went wrong';
export const UNAUTHORIZED = 'You are not authorized';
export const EXISTING_VESSEL_ERROR =
  'Vessel you are trying to add already exists in our system, please contact us through chat or support@ship.link';

export const Authorization = (token) => ({ Authorization: `Bearer ${token}` });
export const ContentTypeJson = () => ({ 'Content-Type': 'application/json' });
export const ContentTypeUrlEncoded = () => ({ 'Content-Type': 'application/x-www-form-urlencoded' });

export const unassignedFleetOption = { label: 'Unassigned Fleet', value: null };
export const DEFAULT_COUNTDOWN_OPTION = '20 Mins';

export const PAGE_STATE = {
  sortOptions: NAVIGATION_PARAMS.DATA_SORT_OPTIONS,
  sortValue: NAVIGATION_PARAMS.DATA_SORT_OPTIONS[0],
  page: NAVIGATION_PARAMS.CURRENT_PAGE,
  pageSize: NAVIGATION_PARAMS.DATA_PER_PAGE[0].value,
};
export const COUNTEROFFER_REQUIREMENTS_ERROR = 'Counteroffer does not meet the requirements';
