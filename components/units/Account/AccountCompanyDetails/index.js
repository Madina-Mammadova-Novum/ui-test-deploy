'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { AccountCompanyDetailsPropTypes } from '@/lib/types';

import { Button, FieldsetContent, FieldsetContentWrapper, FieldsetHeader, FieldsetWrapper, TextRow } from '@/elements';
import Divider from '@/elements/Divider';
import StatusIndicator from '@/elements/StatusIndicator';
import { CompanyInfoForm } from '@/modules';
import { cancelUpdateCompany } from '@/services';
import { fetchUserProfileData } from '@/store/entities/user/actions';
import { AccountAmountOfTankers, AddressInfo, ModalWindow } from '@/units';
import { errorToast, successToast } from '@/utils/hooks';

const AccountCompanyDetails = ({ company = {} }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

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

  const handleCancelRequest = async () => {
    setIsLoading(true);
    const { error } = await cancelUpdateCompany();
    setIsLoading(false);

    if (error) {
      errorToast(error?.title, error?.message);
    } else {
      successToast(
        'Your update request has been cancelled',
        'You can update your company info anytime you want. The remaining changes will still require admin approval.'
      );

      dispatch(fetchUserProfileData());
    }
  };

  return (
    <FieldsetWrapper>
      <FieldsetHeader title="Company Details">
        <div className="flex gap-2">
          {company?.pendingRequest ? (
            <Button
              buttonProps={{
                text: 'Cancel Request',
                variant: 'delete',
                size: 'medium',
                className: '!px-2.5 !py-0.5 text-xsm',
              }}
              onClick={handleCancelRequest}
              disabled={isLoading}
            />
          ) : null}
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
        </div>
      </FieldsetHeader>
      <span className="inline-flex items-center gap-1 whitespace-nowrap text-sm font-bold text-black">
        <StatusIndicator status={company?.pendingRequest ? 'PendingRequest' : 'Active'} />
        {company?.pendingRequest ? 'Update Requested' : 'Active'}
      </span>
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

        <div className="grid grid-cols-1 gap-y-5 md:grid-cols-2">
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
