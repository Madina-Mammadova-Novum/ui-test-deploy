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
      className={`my-3 mb-0 ml-auto box-border flex w-max justify-between gap-2.5 rounded-base border border-solid px-4 py-2.5 ${theme}`}
    >
      <div className="flex items-center gap-2.5">
        {icon}
        <div className="flex flex-col">
          {title && <p className="text-xsm font-semibold text-black">{title}</p>}
          {description && (
            <pre className="font-inter-sans text-xs-sm font-normal text-black">
              <span>{description}</span>
            </pre>
          )}
        </div>
      </div>
      <button type="button" onClick={handleClose}>
        <CloseSVG className="fill-black" />
      </button>
    </div>
  );
};

Alert.propTypes = AlertPropTypes;

export default Alert;
