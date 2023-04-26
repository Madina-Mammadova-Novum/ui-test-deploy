import PropTypes from 'prop-types';

import { FieldsetContent, FieldsetContentWrapper, FieldsetHeader, FieldsetWrapper, TextRow } from '@/elements';
import Divider from '@/elements/Divider';
import { CompanyInfoForm } from '@/modules';
import { AddressInfo, ModalWindow } from '@/units';

const AccountCompanyDetails = ({ company = {} }) => {
  const { name, years, totalTankers, registration, correspondence } = company;
  return (
    <FieldsetWrapper>
      <FieldsetHeader title="Company Details">
        <ModalWindow
          buttonProps={{
            text: 'Edit company details',
            variant: 'primary',
            size: 'medium',
            className: '!px-2.5 !py-0.5 text-xsm',
          }}
        >
          <CompanyInfoForm />
        </ModalWindow>
      </FieldsetHeader>
      <FieldsetContentWrapper>
        <FieldsetContent label="Company information" className="pt-5">
          {name && <TextRow title="Company name">{name}</TextRow>}
          {years && <TextRow title="Years in operation">{years}</TextRow>}
          {totalTankers && <TextRow title="Number of tankers">{totalTankers}</TextRow>}
        </FieldsetContent>

        <Divider className="my-4" />

        <div className="grid grid-cols-1 3md:grid-cols-2 gap-y-5">
          {registration && (
            <FieldsetContent className="col-start-1" label="Registration address">
              <AddressInfo address={registration} />
            </FieldsetContent>
          )}
          {correspondence && (
            <FieldsetContent className="col-start-1 3md:col-start-2" label="Correspondence address">
              <AddressInfo address={correspondence} />
            </FieldsetContent>
          )}
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
