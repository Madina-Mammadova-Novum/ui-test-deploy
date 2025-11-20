import PropTypes from 'prop-types';

import { BUTTON_SIZES, STYLES } from '@/lib/constants';

const linkTargetPropTypes = PropTypes.oneOf([null, '_blank', '_self', '_parent', '_top']);
const buttonVariantsPropTypes = PropTypes.oneOf(STYLES);
const buttonSizesPropTypes = PropTypes.oneOf(BUTTON_SIZES);

export const buttonsPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    label: PropTypes.string,
    path: PropTypes.string,
  })
);

export const mediaPropTypes = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  attributes: PropTypes.shape({
    alternativeText: PropTypes.string,
    mime: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    name: PropTypes.string,
  }),
});

const linkOptionsPropTypes = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  target: PropTypes.oneOf([null, '_blank', '_self', '_parent', '_top']),
  style: PropTypes.oneOf(STYLES),
  rel: PropTypes.oneOf([null, 'noopener noreferrer', 'noopener', 'noreferrer']),
  isExternal: PropTypes.bool,
});

export const linkPropTypes = PropTypes.shape({
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  type: buttonVariantsPropTypes,
  target: PropTypes.oneOf([null, '_blank', '_self', '_parent', '_top']),
  isExternal: PropTypes.bool,
  rel: PropTypes.oneOf([null, 'noopener noreferrer', 'noopener', 'noreferrer']),
});

export const linkImagePropTypes = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  path: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(STYLES),
  image: mediaPropTypes,
  linkOptions: linkOptionsPropTypes,
});

export const UserIconPropTypes = {
  isOnline: PropTypes.bool,
};

export const ShipIconPropTypes = {
  isOnline: PropTypes.bool,
};

export const BellIconPropTypes = {
  counter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export const ChatSessionIconPropTypes = {
  name: PropTypes.string,
  isOnline: PropTypes.bool,
};

export const CloseIconPropTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

const valuePropTypes = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  value: PropTypes.shape({
    title: PropTypes.string,
    shortDescription: PropTypes.string,
    valueType: PropTypes.string,
    coverImage: mediaPropTypes,
  }),
});
export const valuesPropTypes = PropTypes.arrayOf(valuePropTypes);

export const navBarPropTypes = {
  placeholder: PropTypes.string.isRequired,
  cta: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  contrasted: PropTypes.bool,
};

export const authorPropTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  fullName: PropTypes.string,
  content: PropTypes.string,
  phoneNumber: PropTypes.string,
  // tags,
  // email: PropTypes.string,
  // coverImage: coverImage ? imageAdapter(coverImage) : null,
  // gallery: gallery ? imagesAdapter(gallery) : null,
  // contactLink: PropTypes.arrayOf(PropTypes.shape({})),
  // socialLinks: PropTypes.arrayOf(PropTypes.shape({})),
};

export const categoryPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  shortDescription: PropTypes.string,
  coverImage: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    attributes: PropTypes.shape({
      alternativeText: PropTypes.string,
      mime: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      name: PropTypes.string,
    }),
  }),
});

export const ctaPropTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string,
  shortDescription: PropTypes.string,
  buttons: buttonsPropTypes,
};

const dropdownOptionTypes = PropTypes.shape({
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.element]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
});

const BlockTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  __component: PropTypes.string.isRequired,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  shortDescription: PropTypes.string,
});

export const BlocksTypes = {
  blocks: PropTypes.arrayOf(BlockTypes),
};

/* Buttons props start */

const ButtonParamsPropTypes = PropTypes.shape({
  text: PropTypes.string,
  helperText: PropTypes.string,
  icon: PropTypes.shape({
    before: PropTypes.node,
    after: PropTypes.node,
  }),
  iconContainerStyles: PropTypes.string,
  variant: buttonVariantsPropTypes,
  size: buttonSizesPropTypes,
  textClassName: PropTypes.string,
});

export const ButtonPropTypes = {
  buttonProps: ButtonParamsPropTypes.isRequired,
  type: PropTypes.string,
  customStyles: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export const LoginButtonPropTypes = {
  text: PropTypes.string,
  variant: PropTypes.string,
  className: PropTypes.string,
};

export const LogoutButtonPropTypes = {
  text: PropTypes.string,
  variant: PropTypes.string,
  className: PropTypes.string,
};

/* Buttons props end */

export const FormManagerPropTypes = {
  submitButton: ButtonParamsPropTypes,
  submitAction: PropTypes.func,
  className: PropTypes.string,
};

export const AlertPropTypes = {
  variant: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  handleClose: PropTypes.func,
};

export const NotificationAlertPropTypes = {
  handleClose: PropTypes.func,
  notificationData: PropTypes.array,
};

export const BadgePropTypes = {
  counter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  hovered: PropTypes.bool,
  isNotificationBadge: PropTypes.bool,
};

export const DatePickerPropTypes = {
  inputClass: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  labelBadge: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  calendarClass: PropTypes.string,
};

export const DateTimePropTypes = {
  date: PropTypes.string,
  time: PropTypes.string,
};

export const DividerPropTypes = {
  className: PropTypes.string,
};

export const SimpleDropdownPropTypes = {
  asyncCall: PropTypes.bool,
  options: PropTypes.arrayOf(dropdownOptionTypes),
  loadOptions: PropTypes.func,
  components: PropTypes.shape({}),
};

const DropdownStylesPropTypes = PropTypes.shape({
  dropdownWidth: PropTypes.number,
  className: PropTypes.string,
});

export const DropdownPropTypes = {
  reset: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  labelBadge: PropTypes.string,
  asyncCall: PropTypes.bool,
  options: PropTypes.arrayOf(dropdownOptionTypes),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  customStyles: DropdownStylesPropTypes,
};

export const OptionsListPropTypes = {
  countryFlag: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.element]).isRequired,
};

export const OptionRowPropTypes = {
  countryFlag: PropTypes.string,
  coverImage: PropTypes.node,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.element]),
};

export const ExpandableCardPropTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({}),
  isOpened: PropTypes.bool,
  expandAll: PropTypes.bool,
  index: PropTypes.number,
};

export const ExpandableCardHeaderPropTypes = {
  toggle: PropTypes.bool,
  headerData: PropTypes.arrayOf(PropTypes.shape({})),
};

export const AccountToolsPropTypes = {
  title: PropTypes.string,
  customHeight: PropTypes.string,
  className: PropTypes.string,
  isLoggedIn: PropTypes.bool,
};

export const ExpandableCardWrapperPropTypes = {
  headerComponent: PropTypes.node.isRequired,
  footerComponent: PropTypes.node,
  expandAll: PropTypes.bool,
  className: PropTypes.string,
  index: PropTypes.number,
};

export const FieldsetContentPropTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
};

export const FieldsetContentWrapperPropTypes = {
  className: PropTypes.string,
};

export const FieldsetHeaderPropTypes = {
  title: PropTypes.string.isRequired,
};

export const HoverableIconPropTypes = {
  icon: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const IconWrapperPropTypes = {
  iconData: PropTypes.shape({
    icon: PropTypes.node,
    className: PropTypes.string,
  }).isRequired,
};

export const CheckBoxInputPropTypes = {
  customStyles: PropTypes.string,
  labelStyles: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  register: PropTypes.func,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  boxStyles: PropTypes.string,
};

export const PasswordInputPropTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  helperText: PropTypes.string,
  placeholder: PropTypes.string,
  labelBadge: PropTypes.string,
};

export const InputPropTypes = {
  label: PropTypes.string,
  labelBadge: PropTypes.string,
  type: PropTypes.string,
  customStyles: PropTypes.string,
  inputStyles: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  helperText: PropTypes.string,
  icon: PropTypes.node,
  disabled: PropTypes.bool,
  name: PropTypes.string,
};

export const RadioInputPropTypes = {
  customStyles: PropTypes.string,
  labelStyles: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  register: PropTypes.func,
  checked: PropTypes.bool,
};

export const PhoneInputPropTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  labelBadge: PropTypes.string,
};

export const InputErrorMessagePropTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
};

export const LabelPropTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
};

export const LinkAsButtonPropTypes = {
  buttonProps: ButtonParamsPropTypes.isRequired,
  href: PropTypes.string.isRequired,
  customStyles: PropTypes.string,
  disabled: PropTypes.bool,
  target: linkTargetPropTypes,
  prefetch: PropTypes.bool,
};

export const LoaderPropTypes = {
  className: PropTypes.string,
};

export const DynamicLoaderPropTypes = {
  className: PropTypes.string,
  animationDataType: PropTypes.string,
};

export const ModalPropTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  containerClass: PropTypes.string,
};

export const ModalHeaderPropTypes = {
  disabled: PropTypes.bool,
  goBack: PropTypes.func,
};

export const ModalWindowPropTypes = {
  buttonProps: ButtonParamsPropTypes,
  buttonComponent: PropTypes.node,
  containerClass: PropTypes.string,
};

export const NavButtonPropTypes = {
  path: PropTypes.string.isRequired,
  customStyles: PropTypes.string,
  disabled: PropTypes.bool,
  target: linkTargetPropTypes,
  prefetch: PropTypes.bool,
};

export const NextLinkPropTypes = {
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  target: linkTargetPropTypes,
  prefetch: PropTypes.bool,
};

export const PageLoaderPropTypes = {
  text: PropTypes.string,
};

export const StatusIndicatorPropTypes = {
  status: PropTypes.string,
  customStyles: PropTypes.string,
};

export const TabsPropTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({})),
  activeTab: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  customStyles: PropTypes.string,
  hasUnreadComment: PropTypes.bool,
  disabled: PropTypes.bool,
  groupClassName: PropTypes.string,
  buttonClassName: PropTypes.string,
};

export const TabAsLinkPropTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeTab: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  customStyles: PropTypes.string,
};

export const TablePropTypes = {
  headerData: PropTypes.arrayOf(PropTypes.shape({})),
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
  noDataMessage: PropTypes.string,
};

export const TableHeaderPropTypes = {
  headerData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  className: PropTypes.string,
};

export const TableHeaderCellPropTypes = {
  text: PropTypes.string.isRequired,
  helperData: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  icon: PropTypes.node,
  className: PropTypes.string,
};

export const TableRowPropTypes = {
  rowData: PropTypes.arrayOf(PropTypes.shape({})),
};

export const TableCellPropTypes = {
  cellProps: PropTypes.shape({
    countryFlag: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
    name: PropTypes.string,
    editIcon: PropTypes.node,
    badge: PropTypes.string,
    toggle: PropTypes.bool,
    editable: PropTypes.bool,
    disabled: PropTypes.bool,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

export const TextAreaPropTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  customStyles: PropTypes.string,
  inputStyles: PropTypes.string,
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
};

export const TextRowPropTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};

export const TextWithLabelPropTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.number]),
  label: PropTypes.string,
  customStyles: PropTypes.string,
  textStyles: PropTypes.string,
  coverImage: PropTypes.node,
};

export const TitlePropTypes = {
  level: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  customStyle: PropTypes.oneOf(['date-styles', 'offer-styles']),
};

export const TooltipParamsPropTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  groupClassName: PropTypes.string,
};

export const AccordionPropTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      headerContent: PropTypes.string,
      bodyContent: PropTypes.node,
    })
  ).isRequired,
  isFullWidth: PropTypes.bool,
  open: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.node,
};

export const AccordionHeaderPropTypes = {
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  isFullWidth: PropTypes.bool,
};

export const AccordionBodyPropTypes = {
  isFullWidth: PropTypes.bool,
};

export const BaseLayoutPropTypes = {
  className: PropTypes.string,
};

export const AuthBasePropTypes = {
  navigation: PropTypes.shape(navBarPropTypes).isRequired,
  containerClass: PropTypes.string,
};

export const AccountWrapperPropTypes = {
  containerClass: PropTypes.string,
};

export const AuthWrapperPropTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  containerClass: PropTypes.string,
};

export const CommentPropTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
  sentBy: PropTypes.string,
};

export const CommentsContentPropTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      date: PropTypes.string,
      time: PropTypes.string,
      sentBy: PropTypes.string,
    })
  ),
  areaDisabled: PropTypes.bool,
};

export const ConfirmCounterofferPropTypes = {
  goBack: PropTypes.func,
  closeModal: PropTypes.func,
};

export const CountdownPropTypes = {
  time: PropTypes.shape({ date: PropTypes.number.isRequired, autoStart: PropTypes.bool }).isRequired,
  customStyles: PropTypes.string,
};

export const ExpandableRowPropTypes = {
  header: PropTypes.node.isRequired,
  footer: PropTypes.node,
  expand: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  className: PropTypes.string,
};

export const NegotiatingExpandedFooterPropTypes = {
  isCharterer: PropTypes.bool,
};

export const NegotiatingAcceptOfferPropTypes = {
  goBack: PropTypes.func,
};

export const OfferModalContentPropTypes = {
  setStep: PropTypes.func,
  closeModal: PropTypes.func,
  tankerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tankerData: PropTypes.shape({}),
  products: PropTypes.arrayOf(PropTypes.shape({})),
};

const underNegotiationPropType = PropTypes.bool;

export const DetailsContentPropTypes = {
  detailsData: PropTypes.shape({}),
};

export const PreFixtureExpandedContentPropTypes = {
  params: PropTypes.shape({}),
  detailsData: PropTypes.shape({}),
  charterPartyData: PropTypes.shape({}),
  documentsData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
  offerId: PropTypes.string,
};

export const PreFixtureExpandedFooterPropTypes = {
  underNegotiation: underNegotiationPropType.isRequired,
};

export const PartyTermsItemPropTypes = {
  body: PropTypes.string,
};

export const SendCounterOfferPropTypes = {
  goBack: PropTypes.func,
  closeModal: PropTypes.func,
};

const nestedItemPropTypes = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
});

export const menuItemPropTypes = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  path: PropTypes.string,
  items: PropTypes.arrayOf(nestedItemPropTypes).isRequired, // Use the nested item shape here
});

export const SidebarPropTypes = {
  data: PropTypes.arrayOf(menuItemPropTypes).isRequired,
};

export const SidebarGenericPropTypes = {
  data: PropTypes.arrayOf(menuItemPropTypes).isRequired, // Use the main menu item shape
  isResized: PropTypes.bool.isRequired,
  onResize: PropTypes.func.isRequired,
};

export const NavTreeSubBodyPropTypes = {
  data: PropTypes.shape({
    label: PropTypes.string,
    path: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  collapsed: PropTypes.bool,
};

export const TankerSearchResultPropTypes = {
  data: PropTypes.shape({
    exactResults: PropTypes.arrayOf(PropTypes.shape({})),
    partialResults: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  request: PropTypes.bool.isRequired,
  params: PropTypes.arrayOf(dropdownOptionTypes),
  directions: PropTypes.arrayOf(dropdownOptionTypes),
  onChange: PropTypes.func,
  isAccountSearch: PropTypes.bool,
};

export const ViewIncomingOfferPropTypes = {
  closeModal: PropTypes.func,
  minimizeModal: PropTypes.func,
};

export const ViewOfferPropTypes = {
  setStep: PropTypes.func,
};

const AddressDetailsPropTypes = PropTypes.shape({
  addressLine1: PropTypes.string,
  addressLine2: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  postal: PropTypes.string,
  country: PropTypes.string,
});

const CityPropTypes = PropTypes.shape({
  value: PropTypes.string,
  label: PropTypes.string,
});

const CountryPropTypes = PropTypes.shape({
  value: PropTypes.string,
  label: PropTypes.string,
  countryFlag: PropTypes.string,
});

export const AccountCompanyDetailsPropTypes = {
  company: PropTypes.shape({
    companyName: PropTypes.string,
    companyYearsOfOperation: PropTypes.number,
    registrationAddress: PropTypes.string,
    registrationAddress2: PropTypes.string,
    registrationCity: CityPropTypes,
    registrationCountry: CountryPropTypes,
    registrationPostalCode: PropTypes.string,
    correspondenceAddress: PropTypes.string,
    correspondenceAddress2: PropTypes.string,
    correspondenceCity: CityPropTypes,
    correspondenceCountry: CountryPropTypes,
    correspondencePostalCode: PropTypes.string,
    totalTankers: PropTypes.number,
    pendingRequest: PropTypes.bool,
  }),
};

export const AccountPersonalDetailsPropTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    primaryPhone: PropTypes.string,
  }),
};

export const AddressInfoPropTypes = {
  address: AddressDetailsPropTypes.isRequired,
};

export const AddressDetailsFormPropTypes = {
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
  countries: PropTypes.arrayOf(PropTypes.shape({})),
};

export const ComplexPaginationPropTypes = {
  page: PropTypes.number,
  perPage: PropTypes.number,
  totalPages: PropTypes.number,
  dataPerPage: PropTypes.arrayOf(PropTypes.number),
};

export const PaginationComponentPropTypes = {
  currentPage: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  containerStyles: PropTypes.string,
};

const COTOptionsPropType = PropTypes.shape({
  key: PropTypes.string,
  label: PropTypes.string,
});

export const COTTabContentPropTypes = {
  data: PropTypes.shape({
    cargo: PropTypes.arrayOf(COTOptionsPropType),
    products: PropTypes.arrayOf(PropTypes.arrayOf(COTOptionsPropType)),
    details: PropTypes.arrayOf(COTOptionsPropType),
  }),
};

export const DateDetailsFormPropTypes = {
  portName: PropTypes.string,
};

export const PortDetailsFormPropTypes = {
  portName: PropTypes.string,
};

export const SearchFormPropTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  isAccountSearch: PropTypes.bool,
};

export const DeactivateTankerFormPropTypes = {
  title: PropTypes.string.isRequired,
  portName: PropTypes.string,
};

export const ReactivateTankerFormPropTypes = {
  title: PropTypes.string.isRequired,
  portName: PropTypes.string,
};

export const EditPortFormPropTypes = {
  title: PropTypes.string.isRequired,
  portName: PropTypes.string,
};

export const EditDateFormPropTypes = {
  title: PropTypes.string.isRequired,
  portName: PropTypes.string,
};

export const FavoriteSearchFormPropTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  variant: PropTypes.string,
};

export const FavoriteSearchListPropTypes = {
  onClose: PropTypes.func,
};

export const FooterNavBlockPropTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      path: PropTypes.string,
    })
  ),
};

export const NotesPropTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

export const OfferDeclinePropTypes = {
  goBack: PropTypes.func,
  closeModal: PropTypes.func,
  title: PropTypes.string,
  showCancelButton: PropTypes.bool,
  offerDetails: PropTypes.shape({}),
  itemId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export const PasswordValidationPropTypes = {
  title: PropTypes.string,
  customStyles: PropTypes.string,
  inputGroupClassName: PropTypes.string,
};

export const ToggleRowsPropTypes = {
  onToggleClick: PropTypes.func,
  expandAll: PropTypes.bool,
};

export const VoyageDetailsTabContentPropTypes = {
  data: PropTypes.shape({
    dates: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
    ports: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
  }),
};

/* blocks */
const imageFormatPropTypes = PropTypes.shape({
  url: PropTypes.string.isRequired,
  mime: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
});

const galleryMediaPropTypes = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  alternativeText: PropTypes.string,
  format: PropTypes.objectOf(imageFormatPropTypes).isRequired, // Use objectOf for dynamic keys
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
});

export const galleryPropTypes = PropTypes.arrayOf(galleryMediaPropTypes).isRequired;

export const ctaListPropTypes = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string,
  cta: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string,
      text: PropTypes.string,
      buttons: buttonsPropTypes,
    })
  ),
});

export const PersonalDetailsFormPropTypes = {
  onUpdatePage: PropTypes.bool,
  closeModal: PropTypes.func,
};

export const CompanyInfoFormPropTypes = {
  closeModal: PropTypes.func,
};

export const PasswordInfoFormPropTypes = {
  closeModal: PropTypes.func,
};

export const ModalFormManagerPropTypes = {
  submitButton: ButtonParamsPropTypes.isRequired,
  submitAction: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export const negotiatingExpandedContentPropTypes = {
  data: PropTypes.shape({
    sentCounteroffers: PropTypes.arrayOf(PropTypes.shape({})),
    failedOffers: PropTypes.arrayOf(PropTypes.shape({})),
    incomingOffers: PropTypes.arrayOf(PropTypes.shape({})),
  }),
};

export const documentsContentPropTypes = {
  rowsData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
  offerId: PropTypes.string,
};

export const charterPartyContentPropTypes = {
  charterPartyData: PropTypes.shape({}),
  offerId: PropTypes.string,
  isCountdownActive: PropTypes.bool,
};

export const OnSubsExpandedFooterPropTypes = {
  underRecap: PropTypes.bool,
};

export const FailTheSubsModalContentPropTypes = {
  closeModal: PropTypes.func,
};
export const ChartererInformationContentPropTypes = {
  title: PropTypes.string,
};

export const CounterofferFormPropTypes = {
  allowSubmit: PropTypes.bool,
  hideSubmitButton: PropTypes.bool,
};

export const ResetPasswordFormPropTypes = {
  params: PropTypes.shape({}).isRequired,
};

export const ResetPasswordPagePropTypes = {
  params: PropTypes.shape({}).isRequired,
};

export const FixtureDocumentsContentPropTypes = {
  rowsData: PropTypes.arrayOf(PropTypes.shape({})),
};

export const FixtureExpandedContentPropTypes = {
  rowsData: PropTypes.arrayOf(PropTypes.shape({})),
};

export const PostFixtureDocumentsContentPropTypes = {
  rowsData: PropTypes.arrayOf(PropTypes.shape({})),
};

export const FailedOffersDocumentsContentPropTypes = {
  rowsData: PropTypes.arrayOf(PropTypes.shape({})),
};

export const PostFixtureExpandedContentPropTypes = {
  rowsData: PropTypes.arrayOf(PropTypes.shape({})),
};

export const FailedOffersExpandedContentPropTypes = {
  rowsData: PropTypes.arrayOf(PropTypes.shape({})),
};

export const ExpandedContentPropTypes = {
  data: PropTypes.shape({
    vesselOwnerData: PropTypes.arrayOf(PropTypes.shape({})),
    tankerData: PropTypes.arrayOf(PropTypes.shape({})),
    countryData: PropTypes.arrayOf(PropTypes.shape({})),
  }),
};
export const FleetsExpandedContentPropTypes = {
  rowsData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
};

export const AddNewTankerPropTypes = {
  closeModal: PropTypes.func,
};

export const CreateFleetFormPropTypes = {
  closeModal: PropTypes.func,
};
export const DeleteFleetModalPropTypes = {
  closeModal: PropTypes.func,
  id: PropTypes.string.isRequired,
};
export const DeleteTankerModalPropTypes = {
  closeModal: PropTypes.func,
};
export const EditFleetFormPropTypes = {
  closeModal: PropTypes.func,
  id: PropTypes.string.isRequired,
};
export const UpdateTankerFormPropTypes = {
  closeModal: PropTypes.func,
};

export const AddTankerManuallyFormPropTypes = {
  closeModal: PropTypes.func,
  goBack: PropTypes.func,
  fleetData: PropTypes.object,
  q88: PropTypes.object,
  vesselId: PropTypes.string,
};

export const TankerSlotsPropTypes = {
  data: PropTypes.shape({}),
  applyHelper: PropTypes.bool,
};

export const CargoesSlotsPropTypes = {
  data: PropTypes.shape({}),
  applyHelper: PropTypes.bool,
};

export const DropZonePropTypes = {
  areaParams: PropTypes.func,
  inputParams: PropTypes.func,
  error: PropTypes.string,
  isMultiple: PropTypes.bool,
};

export const CargoesInfoModalPropTypes = {
  data: PropTypes.shape({}).isRequired,
};

export const TankerExpandedFooterPropTypes = {
  tankerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export const CommercialOfferTermsPropTypes = {
  tankerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({})),
  scrollToBottom: PropTypes.func,
};

export const OfferFormPropTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
export const DetailsOwnerContentPropTypes = {
  data: PropTypes.shape({}).isRequired,
  title: PropTypes.string,
};
export const DetailsChartererContentPropTypes = {
  data: PropTypes.shape({}).isRequired,
};
export const ResetButtonPropTypes = {
  text: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export const SubmitButtonPropTypes = {
  text: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export const PostFixtureResultContentPropTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  toggle: PropTypes.bool,
};

export const FailedOffersResultContentPropTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  toggle: PropTypes.bool,
};

export const FilterByFormPropTypes = {
  title: PropTypes.string,
  isLoading: PropTypes.bool,
};

export const SendCounterofferFormFieldsPropTypes = {
  data: PropTypes.shape({
    products: PropTypes.arrayOf(PropTypes.shape({})),
    tankerId: PropTypes.string,
    loadPortId: PropTypes.string,
    dischargePortId: PropTypes.string,
  }),
};

export const ViewFailedOfferPropTypes = {
  itemId: PropTypes.string.isRequired,
};

export const NotFoundPropTypes = {
  code: PropTypes.string,
  message: PropTypes.string,
  messageDetail: PropTypes.string,
  reset: PropTypes.func,
};

export const AuthNavButtonsPropTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export const UnassignedFleetExpandedContentPropTypes = {
  rowsData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))).isRequired,
};

export const CaptchaPropTypes = {
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export const UnassignedFleetPropTypes = {
  toggle: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})),
  index: PropTypes.number,
};

export const LabelAsOptionPropTypes = {
  icon: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }),
  text: PropTypes.string.isRequired,
};

export const NotificationControlPropTypes = {
  containerClass: PropTypes.string,
};

export const NotificationSearchPropTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  containerClass: PropTypes.string,
};

export const NotificationTabsPropTypes = {
  activeTab: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  containerClass: PropTypes.string,
};

export const NotificationFilterPropTypes = {
  containerClass: PropTypes.string,
  onChange: PropTypes.func,
};

export const NotificationCardBodyPropTypes = {
  message: PropTypes.string,
  url: PropTypes.string,
  urlId: PropTypes.string,
  handleClose: PropTypes.func,
  watched: PropTypes.bool,
  isSignal: PropTypes.bool,
};

export const NotificationCardHeaderPropTypes = {
  time: PropTypes.string,
  topic: PropTypes.string,
};

export const NotificationListPropTypes = {
  data: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    notifications: PropTypes.arrayOf(PropTypes.shape({})),
  }),
};

export const NotificationPlaceholderPropTypes = {
  containerClass: PropTypes.string,
  text: PropTypes.string,
};

export const AssignToFleetPropTypes = {
  tankerId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  currentFleetId: PropTypes.string,
};

export const UpdateVesselCategoryTwoPropTypes = {
  vesselId: PropTypes.string.isRequired,
  tankerName: PropTypes.string.isRequired,
  vesselCategoryOneId: PropTypes.string.isRequired,
  vesselTypeId: PropTypes.string.isRequired,
  vesselCategoryTwoOptions: PropTypes.array.isRequired,
  closeModal: PropTypes.func.isRequired,
  currentValue: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
};

export const DropzoneFormPropTypes = {
  showTextFields: PropTypes.bool,
  dropzoneProps: PropTypes.shape({
    multiple: PropTypes.bool,
    maxFiles: PropTypes.number,
    maxSize: PropTypes.number,
    accept: PropTypes.shape({}),
  }),
};

export const ViewCounterofferPropTypes = {
  itemId: PropTypes.string.isRequired,
};

export const ChatPropTypes = {
  token: PropTypes.string,
};

export const OfferDetailsPropTypes = {
  voyageDetails: PropTypes.shape({}),
  commercialOfferTerms: PropTypes.shape({}),
};

export const ChatModalHeaderPropTypes = {
  onClose: PropTypes.func.isRequired,
  onCollapse: PropTypes.func,
  useCollapse: PropTypes.bool,
  loading: PropTypes.bool,
};

export const ChatSessionPropTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    cargoId: PropTypes.string,
    unread: PropTypes.string,
    isActive: PropTypes.bool,
  }).isRequired,
};

export const ChatButtonPropTypes = {
  counter: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  className: PropTypes.string,
  variant: PropTypes.string,
  name: PropTypes.string,
  isOnline: PropTypes.bool,
  isTyping: PropTypes.bool,
  withCancel: PropTypes.bool,
};

export const ArchiveButtonPropTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export const ChatTabsPropTypes = {
  containerClass: PropTypes.string,
  activeTab: PropTypes.string,
  searchValue: PropTypes.string,
  activeCounter: PropTypes.number,
  archivedCounter: PropTypes.number,
  onClick: PropTypes.func,
};

export const AuthChatPropTypes = {
  opened: PropTypes.bool,
  token: PropTypes.string,
};

export const ChatSearchPropTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  containerClass: PropTypes.string,
};

export const ChatListPropTypes = {
  loading: PropTypes.bool,
  tab: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

export const ChatSupportPropTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export const ChatSubModalPropTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  tab: PropTypes.string,
};

export const ChatConversationCardPropTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    isActive: PropTypes.bool,
    description: PropTypes.string,
    cargoId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    additional: PropTypes.shape({
      port: PropTypes.string,
      laycan: PropTypes.string,
      quantity: PropTypes.string,
      products: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          name: PropTypes.string.isRequired,
        })
      ),
    }),
  }),
};

export const ChatModalPropTypes = {
  isOpened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  useCollapse: PropTypes.bool,
  onCollapse: PropTypes.func,
  loading: PropTypes.bool,
};

export const ChatConversationPropTypes = {
  isOpened: PropTypes.bool,
  isMediumScreen: PropTypes.bool,
  isSmallScreen: PropTypes.bool,
  isChatModalOpened: PropTypes.bool,
};

export const ChatLoadMoreCtaPropTypes = {
  disabled: PropTypes.bool,
  tab: PropTypes.string,
  onClick: PropTypes.func,
};

export const ChatControlPropTypes = {
  tab: PropTypes.string,
  search: PropTypes.string,
  activeCounter: PropTypes.number,
  archivedCounter: PropTypes.number,
};

export const ChatAdditionalPropTypes = {
  data: PropTypes.shape({}).isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export const ChatConversationMessagePropTypes = {
  sender: PropTypes.string,
  message: PropTypes.string,
  time: PropTypes.string,
  isBroker: PropTypes.bool,
  type: PropTypes.string,
};

export const ChatConversationBodyPropTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape(ChatConversationMessagePropTypes)),
};

export const AnonChatPropTypes = {
  isOpened: PropTypes.bool,
  handleClose: PropTypes.func,
};

export const ViewCommentContentPropTypes = {
  data: PropTypes.shape({}),
  closeModal: PropTypes.func,
};

export const NegotiatingTankerInformationPropTypes = {
  offerId: PropTypes.string.isRequired,
};
export const OnSubsExpandedContentPropTypes = {
  detailsData: PropTypes.shape({}).isRequired,
};

export const FlagPropTypes = {
  countryCode: PropTypes.string,
  className: PropTypes.string,
};

export const UrlPropTypes = {
  params: PropTypes.shape({}),
  searchParams: PropTypes.shape({}),
};

export const TankerSearchTypes = {
  isAccountSearch: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

export const UploadFormPropTypes = {
  onSubmit: PropTypes.func.isRequired,
  dropzoneProps: PropTypes.shape({
    multiple: PropTypes.bool,
    maxFiles: PropTypes.number,
    maxSize: PropTypes.number,
    accept: PropTypes.shape({}),
  }),
};

export const RequestDocumentDeletionModalPropTypes = {
  closeModal: PropTypes.func,
  documentId: PropTypes.string.isRequired,
};

export const RevokeDocumentDeletionModalPropTypes = {
  closeModal: PropTypes.func,
  documentId: PropTypes.string.isRequired,
};

export const DynamicCountdownTimerPropTypes = {
  date: PropTypes.number.isRequired,
  autoStart: PropTypes.bool,
  variant: PropTypes.string,
};

export const PostFixtureDetailsContentPropTypes = {
  detailsData: PropTypes.shape({}).isRequired,
};

export const FailedOffersDetailsContentPropTypes = {
  detailsData: PropTypes.shape({}).isRequired,
};

export const FixtureDetailsContentPropTypes = {
  detailsData: PropTypes.shape({}).isRequired,
};

export const FixtureExpandedFooterPropTypes = {
  underRecap: PropTypes.bool,
  identity: PropTypes.shape({
    isOwner: PropTypes.bool,
    isCharterer: PropTypes.bool,
  }),
};

export const RangeDatePickerPropTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.shape({}),
};

export const AccountNestedLayoutPropTypes = {
  config: PropTypes.shape({
    data: PropTypes.shape({
      title: PropTypes.string,
      label: PropTypes.string,
    }),
    pagination: PropTypes.shape({
      perPage: PropTypes.number,
      currentPage: PropTypes.number,
      totalPages: PropTypes.number,
      handleSelectedPageChange: PropTypes.func,
      onChangeOffers: PropTypes.func,
    }),
    onToggle: PropTypes.func.isRequired,
  }),
};

export const SocialNetworksPropTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export const LegalNavigationPropTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export const CalculatedDetailsPropTypes = {
  isFreight: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export const CalculatedResultPropTypes = {
  isFreight: PropTypes.bool,
  className: PropTypes.string,
};

export const MapPropTypes = {
  className: PropTypes.string,
};

export const ChangeViewPropTypes = {
  center: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  zoom: PropTypes.number,
};

export const TypingIndicatorPropTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
};

export const ProvidersPropTypes = {
  loader: PropTypes.oneOf(['page', 'search']),
};

export const SearchNotFoundTypes = {
  isAccountSearch: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

export const RequestCharterPartyFormPropTypes = {
  closeModal: PropTypes.func,
};

export const IconUploadPropTypes = {
  getInputProps: PropTypes.func.isRequired,
  onClick: PropTypes.func,
};

export const DocumentRequestFormPropTypes = {
  role: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
  initialDocuments: PropTypes.arrayOf(PropTypes.string),
  revisionComments: PropTypes.arrayOf(PropTypes.string),
  status: PropTypes.string,
  disabled: PropTypes.bool,
  documentRequestId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  offerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  requestedFiles: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
};

export const PreFixtureDocumentRequestFormPropTypes = {
  role: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
  requestedFiles: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  comments: PropTypes.string,
  status: PropTypes.string,
  disabled: PropTypes.bool,
  documentRequestId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
