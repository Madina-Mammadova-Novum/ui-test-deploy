'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DynamicLoader, Title } from '@/elements';
import { fetchUserProfileData } from '@/store/entities/user/actions';
import { getUserDataSelector } from '@/store/selectors';
import {
  AccountCompanyDetails,
  AccountDeactivateDetails,
  AccountDeleteDetails,
  AccountPasswordDetails,
  AccountPersonalDetails,
} from '@/units';

const AccountDetails = () => {
  const dispatch = useDispatch();

  const { loading, data } = useSelector(getUserDataSelector);

  useEffect(() => {
    dispatch(fetchUserProfileData());
  }, []);

  const pendingRequest = data?.personalDetails?.hasPendingPersonalInfoUpdateRequest ?? false;

  return (
    <section className="flex flex-col items-start justify-start gap-2.5 px-5">
      <Title level="1" className="py-5">
        Account information
      </Title>
      {loading && <DynamicLoader animationDataType="account" className="size-40" />}
      {data && !loading && (
        <>
          <AccountPersonalDetails user={data?.personalDetails} />
          <AccountCompanyDetails company={data?.companyDetails} />
          <AccountPasswordDetails />
          <div className="pb-5 pt-2.5">
            <AccountDeactivateDetails pendingRequest={pendingRequest} />
            <AccountDeleteDetails pendingRequest={pendingRequest} />
          </div>
        </>
      )}
    </section>
  );
};

export default AccountDetails;
