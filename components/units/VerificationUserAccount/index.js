'use client';

import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { Loader, NextLink } from '@/elements';
import { postVerificationData } from '@/services';
import { checkObjectValues } from '@/utils/helpers';
import { errorToast } from '@/utils/hooks';

const VerificationUserAccount = () => {
  const [verificationUrl, setVerificationUrl] = useState(null);

  const query = useSearchParams();

  const invalidUrl = verificationUrl === null || verificationUrl === undefined || verificationUrl === '';

  const queryData = {
    userId: query.get('UserId'),
    code: query.get('Code')?.replace(/\s+/g, '+'), // todo: temporary solution
    userType: query.get('UserType'),
  };

  const fetchVerificationUrl = async () => {
    const { data, message } = checkObjectValues({ data: queryData });

    if (message) errorToast('Bad request', message);

    if (data) {
      const { data: link, error } = await postVerificationData({ data });
      setVerificationUrl(link?.redirectUrl);
      if (error) errorToast(error?.title, error?.message);
    }
  };

  useEffect(() => {
    fetchVerificationUrl();
  }, []);

  return !invalidUrl ? (
    <NextLink
      href={verificationUrl}
      target="_blank"
      className="cursor-pointer rounded-md bg-blue px-5 py-2.5 text-white hover:bg-blue-darker"
    >
      Verify
    </NextLink>
  ) : (
    <div className="flex items-center justify-center gap-x-4 whitespace-nowrap rounded-md bg-black px-5 py-2.5 opacity-50">
      <p className="text-white">Please wait...</p>
      <Loader className="h-4 w-4" />
    </div>
  );
};

export default VerificationUserAccount;
