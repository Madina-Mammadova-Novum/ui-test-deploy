import PropTypes from 'prop-types';

import { DeleteAccountForm } from '@/modules';
import { ModalWindow } from '@/units';

const AccountDeleteDetails = ({ pendingRequest }) => {
  return (
    <ModalWindow
      containerClass="w-auto"
      buttonProps={{
        text: 'Do you want to delete your account?',
        variant: 'delete',
        size: 'small',
        className: '!py-0 !mr-7',
      }}
    >
      <DeleteAccountForm title="Delete your account" pendingRequest={pendingRequest} />
    </ModalWindow>
  );
};

AccountDeleteDetails.propTypes = {
  pendingRequest: PropTypes.bool.isRequired,
};

export default AccountDeleteDetails;
