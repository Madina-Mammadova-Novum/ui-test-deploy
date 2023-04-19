import PropTypes from 'prop-types';

import { BUTTON_SIZES, STYLES } from '@/lib/constants';

/**
 * re
 */

const shape = (props) => PropTypes.shape({ ...props });

export const navBarPropTypes = shape({
  placeholder: PropTypes.string.isRequired,
  cta: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  contrasted: PropTypes.bool,
});

export const linkTargetPropTypes = PropTypes.oneOf([null, '_blank', '_self', '_parent', '_top']);
export const buttonVariantsPropTypes = PropTypes.oneOf(STYLES);
export const buttonSizesPropTypes = PropTypes.oneOf(BUTTON_SIZES);
export const countryFlagPropTypes = PropTypes.oneOf([PropTypes.node, PropTypes.string]);

export const authorPropTypes = shape({
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
});

export const categoryPropTypes = shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  shortDescription: PropTypes.string,
  coverImage: shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    attributes: shape({
      alternativeText: PropTypes.string,
      mime: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      name: PropTypes.string,
    }),
  }),
});

export const ctaPropTypes = shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string,
  shortDescription: PropTypes.string,
  buttons: PropTypes.arrayOf(
    shape({
      label: PropTypes.string,
      path: PropTypes.string,
    })
  ),
});

export const dropdownOptionTypes = shape({
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
});

export const BlockTypes = shape({
  id: PropTypes.number.isRequired,
  __component: PropTypes.string.isRequired,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  shortDescription: PropTypes.string,
});

export const BlocksTypes = shape({
  blocks: PropTypes.arrayOf(BlockTypes),
});

/* Buttons props start */

export const ButtonParamsPropTypes = shape({
  text: PropTypes.string,
  helperText: PropTypes.string,
  icon: {
    before: PropTypes.node,
    after: PropTypes.node,
  },
  iconContainerStyles: PropTypes.string,
  variant: buttonVariantsPropTypes,
  size: buttonSizesPropTypes,
});

export const ButtonPropTypes = shape({
  buttonProps: ButtonParamsPropTypes.isRequired,
  type: PropTypes.string,
  customStyles: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
});

/* Buttons props end */

export const FormManagerPropTypes = shape({
  submitButton: ButtonParamsPropTypes.isRequired,
  submitAction: PropTypes.func.isRequired,
  className: PropTypes.string,
});

export const AlertPropTypes = shape({
  variant: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  handleClose: PropTypes.func,
});

export const DatePickePropTypes = shape({
  inputClass: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
});

export const DateTimePropTypes = shape({
  date: PropTypes.string,
  time: PropTypes.string,
});

export const DividerPropTypes = shape({
  className: PropTypes.string,
});

export const SimpleDropdownPropTypes = shape({
  asyncCall: PropTypes.bool,
  options: PropTypes.arrayOf(dropdownOptionTypes),
  loadOptions: PropTypes.arrayOf(dropdownOptionTypes),
});

export const DropdownStylesPropTypes = shape({
  dropdownWidth: PropTypes.string,
  className: PropTypes.string,
});

export const DropdownPropTypes = shape({
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  asyncCall: PropTypes.bool,
  options: PropTypes.arrayOf(dropdownOptionTypes).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  customStyles: DropdownStylesPropTypes,
});

export const OptionsListPropTypes = shape({
  label: PropTypes.string.isRequired,
});

export const OptionRowPropTypes = shape({
  countryFlag: countryFlagPropTypes,
  value: PropTypes.string.isRequired,
});

export const ExpandableCardHeaderPropTypes = shape({
  toggle: PropTypes.bool,
  headerData: PropTypes.arrayOf(shape({})),
});

export const ExpandableCardWrapperPropTypes = shape({
  headerComponent: PropTypes.node.isRequired,
  footerComponent: PropTypes.node,
  expandAll: shape({ value: PropTypes.string }),
  className: PropTypes.string,
});

export const FieldsetContentPropTypes = shape({
  label: PropTypes.string,
  className: PropTypes.string,
});

export const FieldsetContentWrapperPropTypes = shape({
  className: PropTypes.string,
});

export const FieldsetHeaderPropTypes = shape({
  title: PropTypes.string.isRequired,
});

export const HoverableIconPropTypes = shape({
  icon: PropTypes.node.isRequired,
  className: PropTypes.string,
});

export const IconComponentPropTypes = shape({
  icon: PropTypes.string,
});

export const CheckBoxInputPropTypes = shape({
  customStyles: PropTypes.string,
  labelStyles: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  register: PropTypes.func,
  checked: PropTypes.bool,
});

export const InputPropTypes = shape({
  label: PropTypes.string,
  type: PropTypes.string,
  customStyles: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  icon: PropTypes.node,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
});

export const RadioInputPropTypes = shape({
  customStyles: PropTypes.string,
  labelStyles: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  register: PropTypes.func,
  checked: PropTypes.bool,
});

export const PhoneInputPropTypes = shape({
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
});

export const InputErrorMessagePropTypes = shape({
  message: PropTypes.string,
});

export const LabelPropTypes = shape({
  className: PropTypes.string,
  name: PropTypes.string,
});

export const LinkAsButtonPropTypes = shape({
  buttonProps: ButtonParamsPropTypes.isRequired,
  href: PropTypes.string.isRequired,
  customStyles: PropTypes.string,
  disabled: PropTypes.bool,
  target: linkTargetPropTypes,
});

export const LoaderPropTypes = shape({
  className: PropTypes.string,
});

export const ModalPropTypes = shape({
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
});

export const NavButtonPropTypes = shape({
  path: PropTypes.string.isRequired,
  customStyles: PropTypes.string,
  disabled: PropTypes.bool,
  target: linkTargetPropTypes,
});

export const NextImagePropTypes = shape({
  src: PropTypes.shape({}).isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  customStyles: PropTypes.string,
});

export const NextLinkPropTypes = shape({
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  target: linkTargetPropTypes,
});

export const StatusIndicatorPropTypes = shape({
  status: PropTypes.string,
  customStyles: PropTypes.string,
});

export const TablePropTypes = shape({
  headerData: PropTypes.shape([]),
  rows: PropTypes.shape([]),
});

export const TableHeaderPropTypes = shape({
  headerData: PropTypes.shape([]).isRequired,
  className: PropTypes.string,
});

export const TableHeaderCellPropTypes = shape({
  text: PropTypes.string.isRequired,
  helperData: shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  icon: PropTypes.node,
  className: PropTypes.string,
});

export const TableRowPropTypes = shape({
  rowData: PropTypes.shape([]),
  indexCell: PropTypes.number,
});

export const TableCellPropTypes = shape({
  cellProps: shape({
    countryFlag: countryFlagPropTypes,
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
});

export const TextAreaPropTypes = shape({
  name: PropTypes.string.isRequired,
  register: PropTypes.func,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  customStyles: PropTypes.string,
  inputStyles: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
});

export const TextRowPropTypes = shape({
  title: PropTypes.string,
});

export const TextWithLabelPropTypes = shape({
  text: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  customStyles: PropTypes.string,
  coverImage: PropTypes.node,
});

export const TitlePropTypes = shape({
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
  className: PropTypes.string,
});

export const TooltipParamsPropTypes = shape({
  title: PropTypes.string,
  description: PropTypes.string,
  tooltipText: PropTypes.string,
  inView: PropTypes.bool,
  onEnter: PropTypes.func,
  onClose: PropTypes.func,
});

export const TooltipPropTypes = shape({
  variant: PropTypes.string.isRequired,
  data: shape({
    title: PropTypes.string,
    description: PropTypes.element,
  }).isRequired,
});

export const AccordionBodyPropTypes = shape({
  isFullWidth: PropTypes.bool,
});

export const BaseLayoutPropTypes = shape({
  className: PropTypes.string,
});

export const AuthBasePropTypes = shape({
  navigation: PropTypes.shape(navBarPropTypes).isRequired,
});
