import { AccountCompanyDetailsPropTypes } from '@/lib/types';

import { FieldsetContent, FieldsetContentWrapper, FieldsetHeader, FieldsetWrapper, TextRow } from '@/elements';
import Divider from '@/elements/Divider';
import { CompanyInfoForm } from '@/modules';
import { AddressInfo, ModalWindow } from '@/units';

const AccountCompanyDetails = ({ company = {} }) => {
  const registration = {
    addressLine1: company?.registrationAddress,
    addressLine2: company?.registrationAddress2,
    city: company?.registrationCityId,
    state: company?.registrationProvince,
    country: company?.registrationCountry,
    postal: company?.registrationPostalCode,
  };

  const correspondence = {
    addressLine1: company?.correspondenceAddress,
    addressLine2: company?.correspondenceAddress2,
    city: company?.correspondenceCityId,
    state: company?.correspondenceProvince,
    country: company?.correspondenceCountry,
    postal: company?.correspondencePostalCode,
  };

  return (
    <FieldsetWrapper>
      <FieldsetHeader title="Company Details">
        <ModalWindow
          containerClass="w-[672px]"
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
          {company?.companyName && <TextRow title="Company name">{company?.companyName}</TextRow>}
          {company?.companyYearsOfOperation && (
            <TextRow title="Years in operation">{company?.companyYearsOfOperation}</TextRow>
          )}
          {company?.totalTankers && <TextRow title="Number of tankers">{company?.totalTankers}</TextRow>}
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

AccountCompanyDetails.propTypes = AccountCompanyDetailsPropTypes;

export default AccountCompanyDetails;
