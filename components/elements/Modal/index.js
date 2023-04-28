import { ModalPropTypes } from '@/lib/types';

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

Modal.propTypes = ModalPropTypes;

export default Modal;
