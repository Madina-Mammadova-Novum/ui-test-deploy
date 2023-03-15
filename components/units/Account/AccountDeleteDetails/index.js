import { DeleteAccountForm } from '@/modules';
import { ModalWindow } from '@/units';

const AccountDeleteDetails = () => {
  return (
    <ModalWindow buttonProps={{ text: 'Do you want to delete your account?', variant: 'delete', size: 'small' }}>
      <DeleteAccountForm />
    </ModalWindow>
  );
};

export default AccountDeleteDetails;
