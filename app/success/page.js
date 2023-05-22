import { metaData } from '@/adapters/metaData';
import { LinkAsButton, NextLink } from '@/elements';
import { AuthWrapper } from '@/modules';

export function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Successful Verification',
      },
    },
  });
}

const SuccessfulVerifPage = () => {
  return (
    <AuthWrapper title="Identity Verification Successful!" containerClass="md:px-28 min-w-[450px]">
      <div className="grid gap-2 my-5 text-xsm">
        <p>
          Congratulations! You have successfully passed our identity verification procedure. We take the security of our
          users seriously, and this is an important step in ensuring a safe and secure platform for everyone.
        </p>
        <p>
          As part of the next steps, you will receive an email from us shortly. This email will contain templates of the
          mandatory documents you need to fill and send back to the same email address. Please ensure that you fill out
          all the necessary information accurately and completely.
        </p>
        <p>
          If you have any questions or concerns about the process, please don&apos;t hesitate to reach out to our
          support team (
          <NextLink href="mailto:support@ship.link" className="inline text-blue">
            support@ship.link
          </NextLink>
          ). We&apos;re here to help and ensure that everything goes as smoothly as possible.
        </p>
      </div>
      <p className="my-5 text-xsm">Thank you for choosing our platform!</p>
      <LinkAsButton href="/" buttonProps={{ size: 'large', variant: 'primary' }}>
        Return to Homepage
      </LinkAsButton>
    </AuthWrapper>
  );
};

export default SuccessfulVerifPage;
