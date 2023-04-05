import PropTypes from 'prop-types';

import { FieldsetContent, FieldsetContentWrapper, FieldsetHeader, FieldsetWrapper, TextRow } from '@/elements';
import { PersonalDetailsForm } from '@/modules';
import { ModalWindow } from '@/units';

const AccountPersonalDetails = ({ user }) => {
  const { firstName, lastName, email, primaryPhone, secondaryPhone } = user;
  return (
    <FieldsetWrapper>
      <FieldsetHeader title="Personal Details">
        <ModalWindow
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
      <FieldsetContentWrapper className="grid grid-cols-1 3sm:grid-cols-2 pt-2.5">
        <FieldsetContent className="col-start-1">
          <TextRow title="First Name">{firstName || '—'}</TextRow>
          <TextRow title="Last Name">{lastName || '—'}</TextRow>
          <TextRow title="Email Address">{email || '—'}</TextRow>
        </FieldsetContent>
        <FieldsetContent className="col-start-1 3sm:col-start-2">
          <TextRow title="Primary phone number">{primaryPhone || '—'}</TextRow>
          <TextRow title="Secondary phone number">{secondaryPhone || '—'}</TextRow>
        </FieldsetContent>
      </FieldsetContentWrapper>
    </FieldsetWrapper>
  );
};

AccountPersonalDetails.defaultProps = {
  user: {
    firstName: '',
    lastName: '',
    email: '',
    primaryPhone: '',
    secondaryPhone: '',
  },
};

AccountPersonalDetails.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    primaryPhone: PropTypes.string,
    secondaryPhone: PropTypes.string,
  }),
};

export default AccountPersonalDetails;
