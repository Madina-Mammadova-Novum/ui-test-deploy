import PropTypes from 'prop-types';

import { BUTTON_SIZES, STYLES } from '@/lib/constants';

export const linkTargetPropTypes = PropTypes.oneOf([null, '_blank', '_self', '_parent', '_top']);
export const buttonVariantsPropTypes = PropTypes.oneOf(STYLES);
export const buttonSizesPropTypes = PropTypes.oneOf(BUTTON_SIZES);

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

export const linkOptionsPropTypes = PropTypes.shape({
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

export const buttonPropTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  buttonOptions: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    style: PropTypes.oneOf([STYLES]),
  }),
};

export const valuePropTypes = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  value: PropTypes.shape({
    title: PropTypes.string,
    shortDescription: PropTypes.string,
    valueType: PropTypes.string,
    coverImage: mediaPropTypes,
  }),
});
export const valuesPropTypes = PropTypes.arrayOf(valuePropTypes);

export const navigationPropTypes = PropTypes.shape({
  mainNavigation: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      menuAttached: PropTypes.bool,
      order: PropTypes.number,
      path: PropTypes.string,
      type: PropTypes.string,
      uiRouterKey: PropTypes.string,
      slug: PropTypes.string,
      external: PropTypes.bool,
    })
  ),
});

export const globalPropTypes = PropTypes.shape({
  howItWorkBlock: PropTypes.shape({
    title: PropTypes.string,
    shortDescription: PropTypes.string,
    values: valuesPropTypes,
  }),
  navigation: navigationPropTypes,
  footer: PropTypes.shape({}),
});

export const metaPropTypes = PropTypes.shape({
  pagination: PropTypes.shape({
    page: PropTypes.number,
    pageSize: PropTypes.number,
    pageCount: PropTypes.number,
    total: PropTypes.number,
  }),
});

export const categoryPropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
});

export const iconPropTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

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

export const dropdownOptionTypes = PropTypes.shape({
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
});

export const BlockTypes = PropTypes.shape({
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

export const ButtonParamsPropTypes = PropTypes.shape({
  text: PropTypes.string,
  helperText: PropTypes.string,
  icon: PropTypes.shape({
    before: PropTypes.node,
    after: PropTypes.node,
  }),
  iconContainerStyles: PropTypes.string,
  variant: buttonVariantsPropTypes,
  size: buttonSizesPropTypes,
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
  submitButton: ButtonParamsPropTypes.isRequired,
  submitAction: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export const AlertPropTypes = {
  variant: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  handleClose: PropTypes.func,
};

export const DatePickePropTypes = {
  inputClass: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
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
  loadOptions: PropTypes.arrayOf(dropdownOptionTypes),
};

export const DropdownStylesPropTypes = PropTypes.shape({
  dropdownWidth: PropTypes.string,
  className: PropTypes.string,
});

export const DropdownPropTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  asyncCall: PropTypes.bool,
  options: PropTypes.arrayOf(dropdownOptionTypes).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  customStyles: DropdownStylesPropTypes,
};

export const OptionsListPropTypes = {
  countryFlag: PropTypes.string,
  label: PropTypes.string.isRequired,
};

export const OptionRowPropTypes = {
  countryFlag: PropTypes.string,
  coverImage: PropTypes.node,
  value: PropTypes.string.isRequired,
};

export const ExpandableCardPropTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({}),
};

export const ExpandableCardHeaderPropTypes = {
  toggle: PropTypes.bool,
  headerData: PropTypes.arrayOf(PropTypes.shape({})),
};

export const AccountToolsPropTypes = {
  title: PropTypes.string,
  className: PropTypes.string
};


export const ExpandableCardWrapperPropTypes = {
  headerComponent: PropTypes.node.isRequired,
  footerComponent: PropTypes.node,
  expandAll: PropTypes.shape({ value: PropTypes.string }),
  className: PropTypes.string,
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

export const IconComponentPropTypes = {
  icon: PropTypes.string,
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
};

export const PasswordInputPropTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  helperText: PropTypes.string,
  placeholder: PropTypes.string,
};

export const InputPropTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  customStyles: PropTypes.string,
  inputStyles: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  icon: PropTypes.node,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
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
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export const InputErrorMessagePropTypes = {
  message: PropTypes.string,
};

export const TextAreaErrorMessagePropTypes = {
  message: PropTypes.string,
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
};

export const LoaderPropTypes = {
  className: PropTypes.string,
};

export const ModalPropTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  containerClass: PropTypes.string,
};

export const ModalHeaderPropTypes = {
  title: PropTypes.string.isRequired,
  goBack: PropTypes.func,
};

export const ModalWindowPropTypes = {
  buttonProps: ButtonParamsPropTypes.isRequired,
  containerClass: PropTypes.string,
};

export const NavButtonPropTypes = {
  path: PropTypes.string.isRequired,
  customStyles: PropTypes.string,
  disabled: PropTypes.bool,
  target: linkTargetPropTypes,
};

export const NextLinkPropTypes = {
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  target: linkTargetPropTypes,
};

export const StatusIndicatorPropTypes = {
  status: PropTypes.string,
  customStyles: PropTypes.string,
};

export const TabsPropTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  activeTab: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  customStyles: PropTypes.string,
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
  headerData: PropTypes.shape([]),
  rows: PropTypes.shape([]),
  noDataMessage: PropTypes.string,
};

export const TableHeaderPropTypes = {
  headerData: PropTypes.shape([]).isRequired,
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
  rowData: PropTypes.shape([]),
};

export const TableCellPropTypes = {
  cellProps: PropTypes.shape({
    countryFlag: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    name: PropTypes.string,
    editIcon: PropTypes.node,
    badge: PropTypes.string,
    toggle: PropTypes.bool,
    editable: PropTypes.bool,
    disabled: PropTypes.bool,
    id: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
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
  onChange: PropTypes.func,
};

export const TextRowPropTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};

export const TextWithLabelPropTypes = {
  text: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  customStyles: PropTypes.string,
  textStyles: PropTypes.string,
  coverImage: PropTypes.node,
};

export const TitlePropTypes = {
  level: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  className: PropTypes.string,
  customStyle: PropTypes.oneOf(['date-styles', 'offer-styles']),
};

export const TooltipParamsPropTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

export const TooltipPropTypes = {
  variant: PropTypes.string.isRequired,
  data: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.element,
  }).isRequired,
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
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  containerClass: PropTypes.string,
};

export const CommentPropTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
};

export const CommentsContentPropTypes = {
  data: PropTypes.shape([]),
  areaDisabled: PropTypes.bool,
};

export const ConfirmCounterofferPropTypes = {
  goBack: PropTypes.func,
  closeModal: PropTypes.func,
};

export const CountdownPropTypes = {
  time: PropTypes.string.isRequired,
  customStyles: PropTypes.string,
};

export const DeactivateAccountFormPropTypes = {
  title: PropTypes.string,
};

export const DeleteAccountFormPropTypes = {
  title: PropTypes.string,
};

export const ExpandableRowPropTypes = {
  header: PropTypes.node.isRequired,
  footer: PropTypes.node.isRequired,
  expand: PropTypes.bool,
  className: PropTypes.string,
};

export const ExpandableRowHeaderPropTypes = {
  toggle: PropTypes.bool,
  headerData: PropTypes.arrayOf(PropTypes.shape({})),
};

export const InformationRowPropTypes = {
  iconProps: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }),
  keyText: PropTypes.string,
  label: PropTypes.string,
};

export const NegotiatingExpandedFooterPropTypes = {
  isCharterer: PropTypes.bool,
};

export const NegotiatingAcceptOfferPropTypes = {
  goBack: PropTypes.func,
  closeModal: PropTypes.func,
};

export const NotificationPropTypes = {
  numberOfNotifications: PropTypes.number.isRequired,
};

export const OfferModalContentPropTypes = {
  setStep: PropTypes.func,
  closeModal: PropTypes.func,
};

const underNegotiationPropType = PropTypes.bool;

export const DetailsContentPropTypes = {
  underNegotiation: underNegotiationPropType.isRequired,
};

export const PreFixtureExpandedContentPropTypes = {
  underNegotiation: underNegotiationPropType.isRequired,
};

export const PreFixtureExpandedFooterPropTypes = {
  underNegotiation: underNegotiationPropType.isRequired,
};

export const PartyTermsItemPropTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
};

export const ProfileMenuPropTypes = {
  image: PropTypes.string.isRequired,
};

export const SendCounterOfferPropTypes = {
  goBack: PropTypes.func,
  closeModal: PropTypes.func,
};

export const SidebarPropTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  containerStyles: PropTypes.string,
};

export const SidebarXlPropTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  searchVal: PropTypes.string.isRequired,
  isResized: PropTypes.bool.isRequired,
  onResize: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export const SidebarSmPropTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  active: PropTypes.string.isRequired,
  searchVal: PropTypes.string.isRequired,
  isResized: PropTypes.bool.isRequired,
  onResize: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
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
  }).isRequired,
  request: PropTypes.bool.isRequired,
  params: PropTypes.arrayOf(dropdownOptionTypes),
  directions: PropTypes.arrayOf(dropdownOptionTypes),
  onChange: PropTypes.func,
};

export const ViewIncomingOfferPropTypes = {
  closeModal: PropTypes.func,
};

export const ViewOfferPropTypes = {
  setStep: PropTypes.func,
  closeModal: PropTypes.func,
};

export const VoyageDetailsContentPropTypes = {
  data: PropTypes.shape({
    dates: PropTypes.shape([]),
    ports: PropTypes.shape([]),
  }),
};

const AddressDetailsPropTypes = {
  addressLine1: PropTypes.string,
  addressLine2: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  postal: PropTypes.string,
  country: PropTypes.string,
};

export const AccountCompanyDetailsPropTypes = {
  company: PropTypes.shape({
    name: PropTypes.string,
    years: PropTypes.string,
    totalTankers: PropTypes.string,
    registration: AddressDetailsPropTypes,
    correspondence: AddressDetailsPropTypes,
  }),
};

export const AccountPersonalDetailsPropTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    primaryPhone: PropTypes.string,
    secondaryPhone: PropTypes.string,
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
  perPage: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.number, value: PropTypes.number })),
  totalPages: PropTypes.number,
  dataPerPage: PropTypes.arrayOf(PropTypes.number),
};

export const PaginationComponentPropTypes = {
  currentPage: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  containerStyles: PropTypes.string,
};

const COTOptionsPropType = {
  key: PropTypes.string,
  label: PropTypes.string,
};

export const COTTabContentPropTypes = {
  data: PropTypes.shape({
    cargo: PropTypes.arrayOf(COTOptionsPropType),
    products: PropTypes.arrayOf(COTOptionsPropType),
    details: PropTypes.arrayOf(COTOptionsPropType),
  }),
};

export const DateDetailsFormPropTypes = {
  portName: PropTypes.string,
};

export const PortDetailsFormPropTypes = {
  portName: PropTypes.string,
};

export const StepPropTypes = {
  title: PropTypes.string.isRequired,
  containerClass: PropTypes.string,
  titleClass: PropTypes.string,
  bodyClass: PropTypes.string,
};

export const StepHeaderPropTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export const StepBodyPropTypes = {
  className: PropTypes.string,
};

export const SearchFormPropTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export const DeactivateTankerFormPropTypes = {
  title: PropTypes.string.isRequired,
  portName: PropTypes.string,
  description: PropTypes.string,
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
  subtitle: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

export const OfferDeclinePropTypes = {
  goBack: PropTypes.func,
  closeModal: PropTypes.func,
  title: PropTypes.string,
};

export const PasswordValidationPropTypes = {
  title: PropTypes.string,
  customStyles: PropTypes.string,
};

export const ToggleRowsPropTypes = {
  onToggleClick: PropTypes.func,
  value: PropTypes.bool,
};

export const VoyageDetailsTabContentPropTypes = {
  data: PropTypes.shape({
    dates: PropTypes.shape([]),
    ports: PropTypes.shape([]),
  }),
};

/* blocks */

export const BlockHeroImagePropTypes = {
  title: PropTypes.string,
  shortDescription: PropTypes.string,
  coverImage: PropTypes.shape(mediaPropTypes).isRequired,
};

export const BlockStepPropTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    coverImage: mediaPropTypes,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export const galleryPropTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  coverImage: PropTypes.shape(mediaPropTypes),
};

export const MapPropTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export const ctaListPropTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string,
  cta: PropTypes.arrayOf({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    text: PropTypes.string,
    buttons: buttonsPropTypes,
  }),
};

export const PersonalDetailsFormPropTypes = {
  closeModal: PropTypes.func.isRequired,
};

export const CompanyInfoFormPropTypes = {
  closeModal: PropTypes.func.isRequired,
};

export const PasswordInfoFormPropTypes = {
  closeModal: PropTypes.func.isRequired,
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
  rowsData: PropTypes.arrayOf(PropTypes.shape({})),
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

export const LoginPagePropTypes = {
  searchParams: PropTypes.shape({
    message: PropTypes.string,
  }),
};

export const ExpandedContentPropTypes = {
  data: PropTypes.shape({
    vesselOwnerData: PropTypes.arrayOf(PropTypes.shape({})),
    tankerData: PropTypes.arrayOf(PropTypes.shape({})),
    countryData: PropTypes.arrayOf(PropTypes.shape({})),
  }),
};
export const FleetsExpandedContentPropTypes = {
  rowsData: PropTypes.arrayOf(PropTypes.shape({})),
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
};

export const AddTankerWithImoFormPropTypes = {
  closeModal: PropTypes.func,
  handleNextStep: PropTypes.func,
};

export const TankerSlotsPropTypes = {
  helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
};

export const CargoesSlotsPropTypes = {
  helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
};
