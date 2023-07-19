export const dropdownStyles = (selectedOption, error, minWidth, expand = false) => ({
  option: (base, { isSelected }) => ({
    ...base,
    '&:hover': {
      background: 'transparent',
    },
    padding: '2px 10px',
    color: isSelected ? '#199AF5' : '#072D46',
    svg: {
      fill: isSelected ? '#199AF5' : '#072D46',
    },
  }),
  control: (base, { menuIsOpen }) => ({
    ...base,
    '&:hover': {
      border: menuIsOpen && '1px solid #199AF5',
    },
    background: selectedOption && '#E7ECF8',
    borderRadius: '6px',
    border: menuIsOpen ? '1px solid #199AF5' : `1px solid ${!error ? '#DADFEA' : '#E53636'} `,
    cursor: 'pointer',
  }),
  container: (base, { selectProps: { menuIsOpen, options } }) => {
    return {
      ...base,
      minHeight: menuIsOpen && expand && options?.length > 1 && 300,
      minWidth: minWidth ?? 34,
    };
  },
  valueContainer: (base) => ({
    ...base,
    background: 'transparent',
    padding: '2px 5px',
    minWidth: minWidth ?? 34,
    textTransform: 'capitalize',
    position: 'relative',
    left: '4px',
  }),
  menu: (base, { selectProps: { menuIsOpen, options } }) => ({
    ...base,
    background: '#ffffff',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    border: '1px solid #E7ECF8',
    borderRadius: '6px',
    marginTop: '5px',
    padding: '0px',
    top: menuIsOpen && expand && options?.length > 1 && 40,
  }),
  menuList: (base, { selectProps: { menuIsOpen, options } }) => {
    return {
      ...base,
      minHeight: menuIsOpen && expand && options?.length > 1 && 314,
    };
  },
  dropdownIndicator: (base, { selectProps: { menuIsOpen } }) => ({
    ...base,
    transform: menuIsOpen && 'rotate(180deg)',
    transition: 'all .5s ease',
    svg: {
      fill: menuIsOpen && '#199AF5',
    },
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: 'none',
  }),
  placeholder: (base) => {
    return {
      ...base,
      color: '#828C9C',
      fontSize: '14px',
      fontWeight: 500,
      fontFamily: ['Inter', 'sans-serif'],
    };
  },
});

export const dropdownTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: 'transparent',
    primary: 'transparent',
  },
});
