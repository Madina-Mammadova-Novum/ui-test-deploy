import PropTypes from 'prop-types';

import { FieldsetContent, FieldsetContentWrapper, FieldsetHeader, FieldsetWrapper, TextRow } from '@/elements';
import { PersonalDetailsForm } from '@/modules';
import { ModalWindow } from '@/units';

const AccountPersonalDetails = ({ user }) => {
  // todo: rules for fields

  return (
    <FieldsetWrapper>
      <FieldsetHeader title="Personal Details">
        <ModalWindow buttonProps={{ text: 'Edit personal details', variant: 'primary', size: 'medium' }}>
          <PersonalDetailsForm />
        </ModalWindow>
      </FieldsetHeader>
      <FieldsetContentWrapper>
        <FieldsetContent className="col-start-1">
          <TextRow title="First Name" subtitle={user?.firstName} />
          <TextRow title="Last Name" subtitle={user?.lastName} />
          <TextRow title="Email Address" subtitle={user?.email} />
        </FieldsetContent>
        <FieldsetContent className="col-start-1 3sm:col-start-2">
          <TextRow title="Primary phone number" subtitle={user?.primaryPhone} />
          <TextRow title="Secondary phone number" subtitle={user?.secondaryPhone} />
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
