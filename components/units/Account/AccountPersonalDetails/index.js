import { AccountPersonalDetailsPropTypes } from '@/lib/types';

import { FieldsetContent, FieldsetContentWrapper, FieldsetHeader, FieldsetWrapper, TextRow } from '@/elements';
import { PersonalDetailsForm } from '@/modules';
import { ModalWindow } from '@/units';

const AccountPersonalDetails = ({ user = {} }) => {
  const { firstName, lastName, email, primaryPhone, secondaryPhone } = user;

  const printPhoneNumber = (phone) => {
    if (!phone) return '—';
    return `+${phone}`;
  };

  return (
    <FieldsetWrapper>
      <FieldsetHeader title="Personal Details">
        <ModalWindow
          containerClass="w-[672px]"
          buttonProps={{
            text: 'Edit personal details',
            variant: 'primary',
            size: 'medium',
            className: '!px-2.5 !py-0.5 text-xsm',
          }}
        >
          <PersonalDetailsForm />
        </ModalWindow>
      </FieldsetHeader>
      <FieldsetContentWrapper className="grid grid-cols-1 3md:grid-cols-2 pt-2.5">
        <FieldsetContent className="col-start-1">
          <TextRow title="First Name">{firstName || '—'}</TextRow>
          <TextRow title="Last Name">{lastName || '—'}</TextRow>
          <TextRow title="Email Address">{email || '—'}</TextRow>
        </FieldsetContent>
        <FieldsetContent className="col-start-1 3md:col-start-2">
          <TextRow title="Primary phone number">{printPhoneNumber(primaryPhone)}</TextRow>
          <TextRow title="Secondary phone number">{printPhoneNumber(secondaryPhone)}</TextRow>
        </FieldsetContent>
      </FieldsetContentWrapper>
    </FieldsetWrapper>
  );
};

AccountPersonalDetails.propTypes = AccountPersonalDetailsPropTypes;

export default AccountPersonalDetails;
