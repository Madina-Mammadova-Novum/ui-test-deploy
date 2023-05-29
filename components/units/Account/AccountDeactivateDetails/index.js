import { DeactivateAccountForm } from '@/modules';
import { ModalWindow } from '@/units';

const AccountDeactivateDetails = () => {
  return (
    <ModalWindow
      containerClass="w-[672px]"
      buttonProps={{
        text: 'Do you want to deactivate your account?',
        variant: 'delete',
        size: 'small',
        className: '!py-0',
      }}
    >
      <DeactivateAccountForm title="Deactivation of your account" />
    </ModalWindow>
  );
};

export default AccountDeactivateDetails;
