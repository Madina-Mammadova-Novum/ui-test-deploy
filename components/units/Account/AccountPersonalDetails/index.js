import PropTypes from 'prop-types';

import { FieldsetContent, FieldsetContentWrapper, FieldsetHeader, FieldsetWrapper, TextRow } from '@/elements';
import { PersonalDetailsForm } from '@/modules';
import { ModalWindow } from '@/units';

const AccountPersonalDetails = ({ user = {} }) => {
  const { firstName, lastName, email, primaryPhone, secondaryPhone } = user;
  return (
    <FieldsetWrapper>
      <FieldsetHeader title="Personal Details">
        <ModalWindow buttonProps={{ text: 'Edit personal details', variant: 'primary', size: 'medium' }}>
          <PersonalDetailsForm />
        </ModalWindow>
      </FieldsetHeader>
      <FieldsetContentWrapper>
        <FieldsetContent className="col-start-1">
          {firstName && <TextRow title="First Name">{firstName}</TextRow>}
          {lastName && <TextRow title="Last Name">{lastName}</TextRow>}
          {email && <TextRow title="Email Address">{email}</TextRow>}
        </FieldsetContent>
        <FieldsetContent className="col-start-1 3sm:col-start-2">
          {primaryPhone && <TextRow title="Primary phone number">{primaryPhone}</TextRow>}
          {secondaryPhone && <TextRow title="Secondary phone number">{secondaryPhone}</TextRow>}
        </FieldsetContent>
      </FieldsetContentWrapper>
    </FieldsetWrapper>
  );
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
