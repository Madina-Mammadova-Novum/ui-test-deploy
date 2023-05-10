import { ModalPropTypes } from '@/lib/types';

import { Portal } from '@/elements';
import { ModalWrapper } from '@/modules';

const Modal = ({ opened, containerClass, onClose, children }) => {
  return (
    <Portal>
      <ModalWrapper containerClass={containerClass} opened={opened} onClose={onClose}>
        {children}
      </ModalWrapper>
    </Portal>
  );
};

Modal.propTypes = ModalPropTypes;

export default Modal;
