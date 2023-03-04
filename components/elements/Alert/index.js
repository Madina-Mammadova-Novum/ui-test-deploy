import PropTypes from 'prop-types';

import { AcceptIcon, CloseIcon, InfoIcon } from '@/assets/icons';

const Alert = ({ variant, title, description, handleClose }) => {
  let alert;
  switch (variant) {
    case 'success': {
      alert = {
        icon: <AcceptIcon />,
        theme: 'bg-green-light border-green',
      };
      break;
    }
    case 'error': {
      alert = {
        icon: <InfoIcon variant="error" />,
        theme: 'bg-red-light border-red',
      };
      break;
    }
    case 'warning': {
      alert = {
        icon: <InfoIcon variant="warning" />,
        theme: 'bg-yellow-light border-yellow',
      };
      break;
    }
    default: {
      alert = {
        icon: null,
        theme: null,
      };
    }
  }

  const { icon, theme } = alert;

  return (
    <div
      className={`box-border ml-auto mb-0 max-w-lg my-3 px-4.5 py-2.5 gap-2.5 flex justify-between border border-solid rounded-base ${theme}`}
    >
      <div className="flex items-center gap-2.5">
        {icon}
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
