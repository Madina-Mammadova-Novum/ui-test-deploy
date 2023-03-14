import PropTypes from 'prop-types';

import { Portal } from '@/elements';
import ModalWrapper from '@/elements/Modal/ModalWrapper';

const Modal = ({ closeModal, children }) => {
  const handleClose = (e) => {
    e.stopPropagation();
    closeModal();
  };
  return (
    <Portal>
      <ModalWrapper closeModal={handleClose}>{children}</ModalWrapper>
    </Portal>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
