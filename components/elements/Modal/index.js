import PropTypes from 'prop-types';

import { Portal } from '@/elements';
import { ModalWrapper } from '@/modules';

const Modal = ({ opened, onClose, children }) => {
  return (
    <Portal>
      <ModalWrapper opened={opened} onClose={onClose}>
        {children}
      </ModalWrapper>
    </Portal>
  );
};

Modal.propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
