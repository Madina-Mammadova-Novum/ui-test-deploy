'use client';

import { useSearchParams } from 'next/navigation';

import { LinkAsButton, NextLink } from '@/elements';
import { AuthWrapper } from '@/modules';

const SuccessfulVerifPageContent = () => {
  const searchParams = useSearchParams();

  // TODO: const transactionId = searchParams.get('transaction_id');
  const isSuccess = searchParams.get('success') === 'true';

  if (!isSuccess) {
    return (
      <AuthWrapper title="Identity Verification Failed" containerClass="md:px-24 min-w-[450px] 3md:w-7/12 3md:ml-auto">
        <div className="my-5 grid gap-4 text-xsm">
          <p>
            Unfortunately, your identity verification has failed. Please try again or contact our support team for
            assistance.
          </p>
          <p>
            For further assistance, please reach out to us at{' '}
            <NextLink href="mailto:support@ship.link" className="inline text-blue">
              support@ship.link
            </NextLink>
            .
          </p>
        </div>
        <LinkAsButton href="/" buttonProps={{ size: 'large', variant: 'primary' }}>
          Return to Homepage
        </LinkAsButton>
      </AuthWrapper>
    );
  }

  return (
    <AuthWrapper
      title="Identity Verification Successful!"
      containerClass="md:px-24 min-w-[450px] 3md:w-7/12 3md:ml-auto"
    >
      <div className="my-5 grid gap-4 text-xsm">
        <p>
          Congratulations! You have successfully passed our identity verification procedure. We take the security of our
          users seriously, and this is an important step in ensuring a safe and secure platform for everyone.
        </p>
        <p>
          Your account will be fully activated in 10-15 minutes, and you will be able to start exploring all the
          features and services we offer. We&apos;re thrilled to have you on board and look forward to helping you
          achieve your goals with <b>Ship.Link</b>.
        </p>
        <p>
          If you have any questions or need assistance, our support team is here to help. Contact us at{' '}
          <NextLink href="mailto:support@ship.link" className="inline text-blue">
            support@ship.link
          </NextLink>{' '}
          or simply start the chat to get live assistance.
        </p>
      </div>
      <p className="my-5 text-xsm">Thank you for choosing our platform!</p>
      <LinkAsButton href="/" buttonProps={{ size: 'large', variant: 'primary' }}>
        Return to Homepage
      </LinkAsButton>
    </AuthWrapper>
  );
};

export default SuccessfulVerifPageContent;
