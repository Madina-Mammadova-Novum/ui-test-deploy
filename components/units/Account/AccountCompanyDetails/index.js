import { AccountCompanyDetailsPropTypes } from '@/lib/types';

import { FieldsetContent, FieldsetContentWrapper, FieldsetHeader, FieldsetWrapper, TextRow } from '@/elements';
import Divider from '@/elements/Divider';
import { CompanyInfoForm } from '@/modules';
import { AddressInfo, ModalWindow } from '@/units';

const AccountCompanyDetails = ({ company = {} }) => {
  const {
    companyName,
    companyYearsOfOperation,
    totalTankers,
    registrationAddress,
    registrationAddress2,
    registrationCityId,
    registrationProvince,
    registrationPostalCode,
    registrationCountry,
    correspondenceAddress,
    correspondenceAddress2,
    correspondenceCityId,
    correspondenceProvince,
    correspondenceCountry,
    correspondencePostalCode,
  } = company;

  const registration = {
    addressLine1: registrationAddress,
    addressLine2: registrationAddress2,
    city: registrationCityId,
    state: registrationProvince,
    country: registrationCountry,
    postal: registrationPostalCode,
  };

  const correspondence = {
    addressLine1: correspondenceAddress,
    addressLine2: correspondenceAddress2,
    city: correspondenceCityId,
    state: correspondenceProvince,
    country: correspondenceCountry,
    postal: correspondencePostalCode,
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
          {companyName && <TextRow title="Company name">{companyName}</TextRow>}
          {companyYearsOfOperation && <TextRow title="Years in operation">{companyYearsOfOperation}</TextRow>}
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

AccountCompanyDetails.propTypes = AccountCompanyDetailsPropTypes;

export default AccountCompanyDetails;
