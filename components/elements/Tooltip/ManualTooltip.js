import PropTypes from 'prop-types';

import CloseIcon from '@/assets/images/close.svg';
import { Button } from '@/elements';

const ManualTooltip = ({ title, description, children, inView, onEnter, onClose }) => {
  return (
    <div className="group relative transition-all">
      <span onMouseEnter={onEnter} className="text-gray cursor-help font-bold text-xxs">
        {children}
      </span>
      {inView && (
        <div className="bg-white transition-all max-w-xs flex flex-col gap-2.5 h-auto text-black z-50 border border-solid border-gray-darker text-xsm font-semibold p-5 rounded-lg absolute -left-[205px] top-7 transform -translate-x-0">
          <div className="flex justify-between items-center min-w-[280px]">
            {title && <span className="capitalize font-semibold text-xsm">{title}</span>}
            <Button buttonProps={{ icon: <CloseIcon /> }} customStyles="!px-0 bg-gray-darker !py-0" onClick={onClose} />
          </div>
          <p className="text-xs-sm font-normal normal-case">{description}</p>
        </div>
      )}
    </div>
  );
};

ManualTooltip.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tooltipText: PropTypes.string.isRequired,
  inView: PropTypes.bool.isRequired,
  onEnter: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ManualTooltip;
