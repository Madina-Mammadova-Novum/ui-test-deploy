'use client';

import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { Loader, NextLink } from '@/elements';
import { postVeriffData } from '@/services';
import { checkObjectValues } from '@/utils/helpers';
import { errorToast } from '@/utils/hooks';

const VerifficationUserAccount = () => {
  const [veriffUrl, setVeriffUrl] = useState(null);

  const query = useSearchParams();

  const invalidUrl = veriffUrl === null || veriffUrl === undefined || veriffUrl === '';

  const queryData = {
    userId: query.get('UserId'),
    code: query.get('Code')?.replace(/\s+/g, '+'), // todo: temporary solution
    userType: query.get('UserType'),
  };

  const fetchVeriffUrl = async () => {
    const { data, message } = checkObjectValues({ data: queryData });

    if (message) errorToast('Bad request', message);

    if (data) {
      const { data: link, error } = await postVeriffData({ data });
      setVeriffUrl(link?.redirectUrl);
      if (error) errorToast(error?.title, error?.message);
    }
  };

  useEffect(() => {
    fetchVeriffUrl();
  }, []);

  return !invalidUrl ? (
    <NextLink
      href={veriffUrl}
      target="blank"
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

export default VerifficationUserAccount;
