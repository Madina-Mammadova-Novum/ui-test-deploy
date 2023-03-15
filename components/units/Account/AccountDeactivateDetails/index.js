import { DeactivateAccountForm } from '@/modules';
import { ModalWindow } from '@/units';

const AccountDeactivateDetails = () => {
  return (
    <ModalWindow buttonProps={{ text: 'Do you want to deactivate your account?', variant: 'delete', size: 'small' }}>
      <DeactivateAccountForm />
    </ModalWindow>
  );
};

export default AccountDeactivateDetails;
