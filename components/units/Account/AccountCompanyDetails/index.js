import PropTypes from 'prop-types';

import { FieldsetContent, FieldsetContentWrapper, FieldsetHeader, FieldsetWrapper, TextRow } from '@/elements';
import Divider from '@/elements/Divider';
import { CompanyInfoForm } from '@/modules';
import { AddressInfo, ModalWindow } from '@/units';

const AccountCompanyDetails = ({ company }) => {
  return (
    // todo: rules for fields
    <FieldsetWrapper>
      <FieldsetHeader title="Company Details">
        <ModalWindow buttonProps={{ text: 'Edit company details', variant: 'primary', size: 'medium' }}>
          <CompanyInfoForm />
        </ModalWindow>
      </FieldsetHeader>
      <FieldsetContentWrapper>
        <FieldsetContent label="Company information">
          <TextRow title="Company name" subtitle={company?.name} />
          <TextRow title="Years in operation" subtitle={company?.years} />
          <TextRow title="Number of tankers" subtitle={company?.totalTankers} />
        </FieldsetContent>
        <Divider />
        <div className="grid grid-cols-2">
          <FieldsetContent className="col-start-1" label="Registration address">
            <AddressInfo data={company?.registration} />
          </FieldsetContent>
          <FieldsetContent className="col-start-1 3sm:col-start-2" label="Correspondence address">
            <AddressInfo data={company?.correspondence} />
          </FieldsetContent>
        </div>
      </FieldsetContentWrapper>
    </FieldsetWrapper>
  );
};

AccountCompanyDetails.propTypes = {
  company: PropTypes.shape({
    name: PropTypes.string,
    years: PropTypes.string,
    totalTankers: PropTypes.string,
    registration: PropTypes.shape({
      addressLine1: PropTypes.string,
      addressLine2: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      postal: PropTypes.string,
      country: PropTypes.string,
    }),
    correspondence: PropTypes.shape({
      addressLine1: PropTypes.string,
      addressLine2: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      postal: PropTypes.string,
      country: PropTypes.string,
    }),
  }),
};

export default AccountCompanyDetails;
