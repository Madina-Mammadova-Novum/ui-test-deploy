import { AccountCompanyDetailsPropTypes } from '@/lib/types';

import { FieldsetContent, FieldsetContentWrapper, FieldsetHeader, FieldsetWrapper, TextRow } from '@/elements';
import Divider from '@/elements/Divider';
import { CompanyInfoForm } from '@/modules';
import { AccountAmountOfTankers, AddressInfo, ModalWindow } from '@/units';

const AccountCompanyDetails = ({ company = {} }) => {
  const registration = {
    addressLine1: company?.registrationAddress,
    addressLine2: company?.registrationAddress2,
    city: company?.registrationCity?.label,
    state: company?.registrationProvince,
    country: company?.registrationCountry?.label,
    postal: company?.registrationPostalCode,
  };

  const correspondence = {
    addressLine1: company?.correspondenceAddress,
    addressLine2: company?.correspondenceAddress2,
    city: company?.correspondenceCity?.label,
    state: company?.correspondenceProvince,
    country: company?.correspondenceCountry?.label,
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
          {company?.companyYearsOfOperation ? (
            <TextRow title="Years in operation">{company?.companyYearsOfOperation}</TextRow>
          ) : null}
          {company?.totalTankers ? (
            <AccountAmountOfTankers data={company?.cargoes?.listOfCargoes} total={company?.totalTankers} />
          ) : null}
        </FieldsetContent>

        <Divider className="my-4" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5">
          {registration && (
            <FieldsetContent className="col-start-1" label="Registration address">
              <AddressInfo address={registration} />
            </FieldsetContent>
          )}
          {correspondence && (
            <FieldsetContent className="col-start-1 md:col-start-2" label="Correspondence address">
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
