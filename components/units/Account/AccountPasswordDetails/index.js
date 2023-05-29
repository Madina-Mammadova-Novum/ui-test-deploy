import { FieldsetHeader, FieldsetWrapper } from '@/elements';
import { PasswordInfoForm } from '@/modules';
import { ModalWindow } from '@/units';

const AccountPasswordDetails = () => {
  return (
    <FieldsetWrapper>
      <FieldsetHeader title="Password">
        <ModalWindow
          containerClass="w-[672px]"
          buttonProps={{
            text: 'Change your password',
            variant: 'primary',
            size: 'medium',
            className: '!px-2.5 !py-0.5 text-xsm',
          }}
        >
          <PasswordInfoForm />
        </ModalWindow>
      </FieldsetHeader>
    </FieldsetWrapper>
  );
};

export default AccountPasswordDetails;
