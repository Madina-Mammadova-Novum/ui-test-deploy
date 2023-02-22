import { useMemo } from 'react';

import PropTypes from 'prop-types';

import { AcceptIcon, CloseIcon, InfoIcon } from '@/assets/Icons';

const Alert = ({ variant, title, description, handleClose }) => {
  const printIcon = useMemo(() => {
    switch (variant) {
      case 'success':
        return <AcceptIcon />;
      case 'error':
        return <InfoIcon variant="error" />;
      case 'warning':
        return <InfoIcon variant="warning" />;
      default:
        return null;
    }
  }, [variant]);

  const printTheme = useMemo(() => {
    switch (variant) {
      case 'success':
        return 'bg-green-light border-green';
      case 'error':
        return 'bg-red-light border-red';
      case 'warning':
        return 'bg-yellow-light border-yellow';
      default:
        return null;
    }
  }, [variant]);

  return (
    <div
      className={`box-border ml-auto mb-0 max-w-lg my-3 px-4.5 py-2.5 gap-2.5 flex justify-between border border-solid rounded-base ${printTheme}`}
    >
      <div className="flex items-center gap-2.5">
        {printIcon}
        <div className="flex flex-col">
          <p className="text-black font-semibold text-xsm">{title}</p>
          <p className="text-black font-normal text-xs-sm">{description}</p>
        </div>
      </div>
      <button type="button" onClick={handleClose}>
        <CloseIcon />
      </button>
    </div>
  );
};

Alert.defaultProps = {
  variant: '',
  title: '',
  description: '',
  handleClose: () => {},
};

Alert.propTypes = {
  variant: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  handleClose: PropTypes.func,
};

export default Alert;
