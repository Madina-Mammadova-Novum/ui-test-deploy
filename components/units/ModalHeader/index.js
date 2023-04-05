import PropTypes from 'prop-types';

import GoBackArrowSVG from '@/assets/images/goBackArrow.svg';
import { Title } from '@/elements';

const ModalHeader = ({ children, goBack }) => {
  return (
    <div className="flex items-center">
      {goBack && <GoBackArrowSVG className="cursor-pointer ml-1.5 mr-4" onClick={goBack} />}
      <Title level={2}>{children}</Title>
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
