'use client';

import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { NextLink } from '@/elements';
import { postVeriffData } from '@/services';
import { checkObjectValues } from '@/utils/helpers';
import { errorToast } from '@/utils/hooks';

const VerifficationUserAccount = () => {
  const [veriffUrl, setVeriffUrl] = useState(null);

  const query = useSearchParams();

  const invalidUrl = veriffUrl === null || veriffUrl === undefined || veriffUrl === '';

  const queryData = {
    userId: query.get('UserId'),
    code: query.get('Code').replace(/\s+/g, '+'),
    userType: query.get('UserType'),
  };

  const fetchVeriffUrl = async () => {
    const { data, message } = checkObjectValues({ data: queryData });

    if (message) errorToast(message);

    if (data) {
      const { data: result, error } = await postVeriffData({ data });
      if (error) errorToast('Oops something went wrong...');
      setVeriffUrl(result);
    }
  };

  useEffect(() => {
    fetchVeriffUrl();
  }, []);

  return !invalidUrl ? (
    <NextLink
      href={veriffUrl}
      className="px-5 py-2.5 rounded-md cursor-pointer bg-blue text-white hover:bg-blue-darker"
    >
      Verifficate
    </NextLink>
  ) : (
    <p className="px-5 py-2.5 rounded-md bg-black text-white opacity-50">Please wait...</p>
  );
};

export default VerifficationUserAccount;
