export const dropdownStyles = (selectedOption, error, minWidth) => ({
  option: (base) => ({
    ...base,
    '&:hover': {
      background: 'transparent',
    },
  }),
  control: (base, { menuIsOpen }) => ({
    ...base,
    '&:hover': {
      border: menuIsOpen && '1px solid #199AF5',
    },
    background: selectedOption && '#E7ECF8',
    borderRadius: '6px',
    border: menuIsOpen ? '1px solid #199AF5' : `1px solid ${!error ? '#E7ECF8' : '#E53636'} `,
    cursor: 'pointer',
  }),
  container: (base) => ({
    ...base,
    minWidth: minWidth ?? 34,
  }),
  valueContainer: (base) => ({
    ...base,
    background: 'transparent',
    padding: '2px 5px',
    minWidth: minWidth ?? 34,
    textTransform: 'capitalize',
    position: 'relative',
    left: '4px',
  }),
  menu: (base) => ({
    ...base,
    background: '#ffffff',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    border: '1px solid #E7ECF8',
    borderRadius: '6px',
    marginTop: '5px',
  }),
  dropdownIndicator: (base, { selectProps: { menuIsOpen } }) => ({
    ...base,
    color: menuIsOpen && '#199AF5',
    transform: menuIsOpen && 'rotate(180deg)',
    transition: 'all .5s ease',
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
      // todo: add font-family after adding correct one to the project
    }
  }
});

export const dropdownTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: 'transpasrent',
    primary: 'transparent',
  },
});
