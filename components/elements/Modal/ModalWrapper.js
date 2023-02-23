import PropTypes from 'prop-types';

import CrossSVG from '@/assets/images/cross.svg';

const ModalWrapper = ({ closeModal, children }) => {
  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 bg-[#000000] opacity-[0.4]" />
      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-[30px] rounded-[10px]">
        <button type="button" onClick={closeModal} className="absolute top-3 right-3">
          <CrossSVG />
        </button>
        {children}
      </div>
    </>
  );
};

ModalWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default ModalWrapper;
