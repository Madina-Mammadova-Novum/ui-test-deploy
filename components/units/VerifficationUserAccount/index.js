'use client';

import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { Loader, NextLink } from '@/elements';
import { postVeriff } from '@/services';
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

    if (message) errorToast(message);

    if (data) {
      const { link, error } = await postVeriff({ data });
      if (error) errorToast(error);
      if (link) setVeriffUrl(link);
    }

    return null;
  };

  useEffect(() => {
    fetchVeriffUrl();
  }, []);

  return (
    <div className="pt-5 w-1/3 mx-auto">
      {!invalidUrl ? (
        <NextLink
          href={veriffUrl}
          target="blank"
          className="px-5 py-2.5 rounded-md cursor-pointer bg-blue text-white hover:bg-blue-darker"
        >
          Verifficate
        </NextLink>
      ) : (
        <div className="px-5 py-2.5 rounded-md flex justify-center items-center gap-x-4 bg-black  opacity-50">
          <p className="text-white">Please wait...</p>
          <Loader className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};

export default VerifficationUserAccount;
