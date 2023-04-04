import PropTypes from 'prop-types';

import GoBackArrowSVG from '@/assets/images/goBackArrow.svg';

const ModalHeader = ({ title, goBack }) => {
  return (
    <div className="flex items-center">
      {goBack && <GoBackArrowSVG className="cursor-pointer ml-1.5 mr-4" onClick={goBack} />}
      <h2>{title}</h2>
    </div>
  );
};

ModalHeader.defaultProps = {
  goBack: null,
};

ModalHeader.propTypes = {
  title: PropTypes.string.isRequired,
  goBack: PropTypes.func,
};

export default ModalHeader;
