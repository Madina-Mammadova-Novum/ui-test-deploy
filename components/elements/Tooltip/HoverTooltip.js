import { memo } from 'react';

import PropTypes from 'prop-types';

const ManualTooltip = memo(({ title, description, tooltipText, inView, onEnter, onClose }) => {
  return (
    <div className="group relative transition-all">
      <span onMouseEnter={onEnter} onMouseLeave={onClose} className="text-gray cursor-help font-bold text-xxs">
        {tooltipText}
      </span>
      {inView && (
        <div className="bg-white transition-all max-w-xs flex flex-col gap-2.5 h-auto text-black z-50 border border-solid border-gray-darker text-xsm font-semibold p-5 rounded-lg absolute left-0 top-7 transform -translate-x-0">
          {title && <span>{title}</span>}
          {description ?? ''}
        </div>
      )}
    </div>
  );
});

ManualTooltip.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tooltipText: PropTypes.string.isRequired,
  inView: PropTypes.bool.isRequired,
  onEnter: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ManualTooltip;
