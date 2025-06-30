// import PropTypes from 'prop-types';

import { DeactivateAccountForm } from '@/modules';
import { ModalWindow } from '@/units';

const AccountDeactivateDetails = () => {
  return (
    <ModalWindow
      buttonProps={{
        text: 'Do you want to deactivate your account?',
        variant: 'primary',
        size: 'medium',
        className: '!py-0',
        'data-deactivate-account-action': 'deactivate-account-button',
      }}
    >
      <DeactivateAccountForm title="Deactivation of your account" />
    </ModalWindow>
  );
};

export default AccountDeactivateDetails;
