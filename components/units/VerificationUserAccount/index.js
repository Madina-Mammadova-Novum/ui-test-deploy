'use client';

import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { LinkAsButton, Loader, Title } from '@/elements';
import { postVerificationData } from '@/services';
import { checkObjectValues } from '@/utils/helpers';
import { errorToast } from '@/utils/hooks';

const VerificationUserAccount = () => {
  const [confirmationStatus, setConfirmationStatus] = useState('loading'); // 'loading', 'success', 'error'

  const query = useSearchParams();

  const queryData = {
    userId: query.get('UserId'),
    code: query.get('Code')?.replace(/\s+/g, '+'), // todo: temporary solution
    userType: query.get('UserType'),
  };

  const confirmEmail = async () => {
    const { data, message } = checkObjectValues({ data: queryData });

    if (message) {
      errorToast('Bad request', message);
      setConfirmationStatus('error');
      return;
    }

    if (data) {
      const { error } = await postVerificationData({ data });

      if (error) {
        errorToast(error?.title, error?.message);
        setConfirmationStatus('error');
      } else {
        setConfirmationStatus('success');
      }
    } else {
      setConfirmationStatus('error');
    }
  };

  useEffect(() => {
    confirmEmail();
  }, []);

  // Loading state
  if (confirmationStatus === 'loading') {
    return (
      <div className="flex items-center justify-center gap-x-4 whitespace-nowrap rounded-md bg-black px-5 py-2.5 opacity-50">
        <p className="text-white">Please wait...</p>
        <Loader className="h-4 w-4" />
      </div>
    );
  }

  // Success state
  if (confirmationStatus === 'success') {
    return (
      <div className="flex flex-col items-center justify-center gap-8 text-center">
        {/* Success Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-light">
          <svg className="h-8 w-8 text-green" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <div className="flex flex-col gap-1">
          <Title level="1" className="!text-black">
            Email Confirmed Successfully!
          </Title>
          <p className="text-base !text-gray">
            Your email address has been verified. You will now be redirected to the admin panel to complete your account
            setup.
          </p>
        </div>

        <div className="flex justify-center">
          <LinkAsButton href={process.env.NEXT_PUBLIC_ADMIN_URL} buttonProps={{ size: 'large', variant: 'primary' }}>
            Continue to Admin Panel
          </LinkAsButton>
        </div>
      </div>
    );
  }

  // Error state
  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center">
      {/* Error Icon */}
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-light">
        <svg className="h-8 w-8 text-red" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <div className="flex flex-col gap-1">
        <Title level="1" className="!text-black">
          Email Confirmation Failed
        </Title>
        <p className="text-base !text-gray">
          We couldn&apos;t verify your email address. The verification link may have expired or is invalid. Please
          contact our support team for assistance.
        </p>
      </div>

      <div className="flex justify-center">
        <LinkAsButton href="/contact-us" buttonProps={{ size: 'large', variant: 'primary' }}>
          Contact Support
        </LinkAsButton>
      </div>
    </div>
  );
};

export default VerificationUserAccount;
