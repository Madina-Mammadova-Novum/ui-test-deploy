import { FieldsetHeader, FieldsetWrapper } from '@/elements';
import { PasswordInfoForm } from '@/modules';
import { ModalWindow } from '@/units';

const AccountPasswordDetails = () => {
  return (
    <FieldsetWrapper>
      <FieldsetHeader title="Password">
        <ModalWindow buttonProps={{ text: 'Change your password', variant: 'primary', size: 'medium' }}>
          <PasswordInfoForm />
        </ModalWindow>
      </FieldsetHeader>
    </FieldsetWrapper>
  );
};

export default AccountPasswordDetails;
