'use client';

import { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';

import { Loader, Title } from '@/elements';
import { getUserDetails } from '@/services';
import {
  AccountCompanyDetails,
  AccountDeactivateDetails,
  AccountDeleteDetails,
  AccountPasswordDetails,
  AccountPersonalDetails,
} from '@/units';

const AccountDetails = () => {
  const [accountData, setAccountData] = useState(null);

  const { data: session } = useSession();

  const fetchData = async () => {
    const data = await getUserDetails();
    setAccountData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <section className="flex justify-start items-start flex-col gap-2.5">
      <Title level={1} className="py-5">
        Account information
      </Title>
      {accountData ? (
        <>
          <AccountPersonalDetails user={accountData?.personalDetails} />
          <AccountCompanyDetails company={accountData?.companyDetails} />
          <AccountPasswordDetails user={accountData?.accountDetails} />
          <div className="pt-2.5 pb-5">
            <AccountDeactivateDetails />
            <AccountDeleteDetails />
          </div>
        </>
      ) : (
        <Loader className="h-8 w-8 absolute top-1/2 left-1/2" />
      )}
    </section>
  );
};

export default AccountDetails;
