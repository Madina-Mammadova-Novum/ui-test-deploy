import { TooltipParamsPropTypes } from '@/lib/types';

const HoverTooltip = ({ title, description, className, children, inView, onEnter, onClose }) => {
  return (
    <div className="group relative transition-all">
      <span onMouseEnter={onEnter} onMouseLeave={onClose} className="text-gray cursor-help">
        {children}
      </span>
      {inView && (
        <div
          className={`absolute top-8 ${className} bg-white transition-all w-max flex flex-col gap-2.5 h-auto text-black z-50 border border-solid border-gray-darker text-xsm font-semibold p-2.5 rounded-base`}
        >
          {title && <span>{title}</span>}
          {description ?? ''}
        </div>
      )}
    </div>
  );
};

HoverTooltip.propTypes = TooltipParamsPropTypes.isRequired;

export default HoverTooltip;
