import PropTypes from 'prop-types';

import { DeactivateAccountForm } from '@/modules';
import { ModalWindow } from '@/units';

const AccountDeactivateDetails = ({ pendingRequest }) => {
  return (
    <ModalWindow
      buttonProps={{
        text: 'Do you want to deactivate your account?',
        variant: 'delete',
        size: 'small',
        className: '!py-0',
      }}
    >
      <DeactivateAccountForm title="Deactivation of your account" pendingRequest={pendingRequest} />
    </ModalWindow>
  );
};

AccountDeactivateDetails.propTypes = {
  pendingRequest: PropTypes.bool.isRequired,
};

export default AccountDeactivateDetails;
