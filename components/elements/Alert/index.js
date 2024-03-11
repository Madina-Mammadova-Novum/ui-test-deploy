'use client';

import { AlertPropTypes } from '@/lib/types';

import CheckCircleSVG from '@/assets/images/checkCircle.svg';
import CloseSVG from '@/assets/images/close.svg';
import InfoCircleSVG from '@/assets/images/infoCircle.svg';

const Alert = ({ variant = '', title, description, handleClose }) => {
  let alert;
  switch (variant) {
    case 'success': {
      alert = {
        icon: <CheckCircleSVG className="fill-green" />,
        theme: 'bg-green-light border-green',
      };
      break;
    }
    case 'error': {
      alert = {
        icon: <InfoCircleSVG className="fill-red" variant="error" />,
        theme: 'bg-red-light border-red',
      };
      break;
    }
    case 'warning': {
      alert = {
        icon: <InfoCircleSVG className="fill-yellow" variant="warning" />,
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
      className={`box-border ml-auto mb-0 w-max my-3 px-4 py-2.5 gap-2.5 flex justify-between border border-solid rounded-base ${theme}`}
    >
      <div className="flex items-center gap-2.5">
        {icon}
        <div className="flex flex-col">
          {title && <p className="text-black font-semibold text-xsm">{title}</p>}
          {description && (
            <pre className="text-black font-inter-sans font-normal text-xs-sm">
              <span>{description}</span>
            </pre>
          )}
        </div>
      </div>
      <button type="button" onClick={handleClose}>
        <CloseSVG />
      </button>
    </div>
  );
};

Alert.propTypes = AlertPropTypes;

export default Alert;
