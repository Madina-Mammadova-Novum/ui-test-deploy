'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Loader, Title } from '@/elements';
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

  return (
    <section className="flex justify-start items-start flex-col gap-2.5">
      <Title level={1} className="py-5">
        Account information
      </Title>
      {loading && <Loader className="h-8 w-8 absolute top-1/2 left-1/2" />}
      {data && !loading && (
        <>
          <AccountPersonalDetails user={data?.personalDetails} />
          <AccountCompanyDetails company={data?.companyDetails} />
          <AccountPasswordDetails />
          <div className="pt-2.5 pb-5">
            <AccountDeactivateDetails />
            <AccountDeleteDetails />
          </div>
        </>
      )}
    </section>
  );
};

export default AccountDetails;
