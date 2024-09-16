import PropTypes from 'prop-types';

import { Button, Modal } from '@/elements';

const ConfirmModal = ({
  isOpen,
  onConfirm,
  onClose,
  title = 'Confirm Your Action',
  message = 'Are you sure you want to proceed?',
  okButtonProps = {},
  cancelButtonProps = {},
}) => {
  return (
    <Modal opened={isOpen} onClose={onClose}>
      <div className="p-4 text-center">
        {title && <h2 className="mb-4 text-xl font-bold text-black">{title}</h2>}
        <p className="mb-4 text-black">{message}</p>
        <div className="flex justify-center space-x-4">
          <Button
            buttonProps={{
              text: 'Confirm',
              variant: 'primary',
              size: 'large',
              ...okButtonProps,
            }}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          />
          <Button
            buttonProps={{
              text: 'Cancel',
              variant: 'secondary',
              size: 'large',
              ...cancelButtonProps,
            }}
            onClick={onClose}
          />
        </div>
      </div>
    </Modal>
  );
};

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  okButtonProps: PropTypes.shape({
    text: PropTypes.string,
    variant: PropTypes.string,
    size: PropTypes.string,
    icon: PropTypes.shape({
      before: PropTypes.element,
      after: PropTypes.element,
    }),
  }),
  cancelButtonProps: PropTypes.shape({
    text: PropTypes.string,
    variant: PropTypes.string,
    size: PropTypes.string,
    icon: PropTypes.shape({
      before: PropTypes.element,
      after: PropTypes.element,
    }),
  }),
};

export default ConfirmModal;
