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
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'primary',
  size = 'large',
}) => {
  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  return (
    <Modal opened={isOpen} onClose={onClose}>
      <div className="w-96">
        {title && <h2 className="mb-4 text-xl font-bold text-black">{title}</h2>}
        <p className="mb-6 text-sm leading-relaxed text-black">{message}</p>
        <div className="flex gap-x-2.5">
          <Button
            buttonProps={{
              text: cancelText,
              variant: 'tertiary',
              size,
              ...cancelButtonProps,
            }}
            customStyles="w-full whitespace-nowrap"
            onClick={onClose}
          />
          <Button
            buttonProps={{
              text: confirmText,
              variant,
              size,
              ...okButtonProps,
            }}
            customStyles="w-full whitespace-nowrap"
            onClick={handleConfirm}
          />
        </div>
      </div>
    </Modal>
  );
};

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'delete']),
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  okButtonProps: PropTypes.shape({
    text: PropTypes.string,
    variant: PropTypes.string,
    size: PropTypes.string,
    icon: PropTypes.shape({
      before: PropTypes.element,
      after: PropTypes.element,
    }),
    disabled: PropTypes.bool,
  }),
  cancelButtonProps: PropTypes.shape({
    text: PropTypes.string,
    variant: PropTypes.string,
    size: PropTypes.string,
    icon: PropTypes.shape({
      before: PropTypes.element,
      after: PropTypes.element,
    }),
    disabled: PropTypes.bool,
  }),
};

export default ConfirmModal;
