import PropTypes from 'prop-types';

import { CloseIcon } from '@/assets/icons';
import { Button } from '@/elements';

const ModalWrapper = ({ opened, onClose, children }) => {
  return (
    opened && (
      <>
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-[#000000] opacity-40" />
        <div className="fixed top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[calc(100vh-10rem)] bg-white p-8 rounded-lg overflow-y-auto">
          <Button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3"
            buttonProps={{ icon: <CloseIcon /> }}
          />
          {children}
        </div>
      </>
    )
  );
};

ModalWrapper.propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalWrapper;
