import { TooltipParamsPropTypes } from '@/lib/types';

const HoverTooltip = ({ title, description, children, inView, onEnter, onClose }) => {
  return (
    <div className="group relative transition-all">
      <span onMouseEnter={onEnter} onMouseLeave={onClose} className="text-gray cursor-help">
        {children}
      </span>
      {inView && (
        <div className="bg-white transition-all w-[550px] flex flex-col h-auto text-black z-50 border border-solid border-gray-darker font-semibold py-2 px-2 rounded-lg absolute left-0 top-7 transform -translate-x-0">
          {title && <span>{title}</span>}
          {description ?? ''}
        </div>
      )}
    </div>
  );
};

HoverTooltip.propTypes = TooltipParamsPropTypes.isRequired;

export default HoverTooltip;
