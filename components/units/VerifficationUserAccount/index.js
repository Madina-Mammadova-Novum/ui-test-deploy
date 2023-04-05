'use client';

import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { NextLink } from '@/elements';
import { postVeriff } from '@/services';
import { checkObjectValues } from '@/utils/helpers';
import { errorToast } from '@/utils/hooks';

const VerifficationUserAccount = () => {
  const [veriffUrl] = useState(null);

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
      const res = await postVeriff({ data });
      return res;
    }
    return null;
  };

  useEffect(() => {
    fetchVeriffUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
