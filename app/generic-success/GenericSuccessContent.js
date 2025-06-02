'use client';

import { useSearchParams } from 'next/navigation';
import PropTypes from 'prop-types';

import { LinkAsButton, NextImage, NextLink, Title } from '@/elements';

const GenericSuccessContent = () => {
  const searchParams = useSearchParams();

  const title = searchParams.get('title') || 'Success!';
  const message = searchParams.get('message') || 'Your action was completed successfully.';
  const ctaText = searchParams.get('cta');
  const ctaLink = searchParams.get('link');
  const showContact = searchParams.get('contact') === 'true';
  const showHome = searchParams.get('home') === 'true';

  return (
    <main>
      <section className="relative bg-gray-light pb-[195px] pt-[115px]">
        <div className="container mx-auto max-w-[1152px] px-4 md:px-8 xl:px-0">
          {showHome && (
            <div className="relative z-10 mb-8 md:mb-3 3md:mb-4">
              <p className="text-xs-sm text-white">
                Home <span className="text-[#FFFFFF99]">/</span> <span className="text-gray">{title}</span>
              </p>
            </div>
          )}
          <NextImage
            alt="waves"
            height={352}
            quality={100}
            width={1440}
            src="https://cdne-shiplinkfront-prod-001-a0hmdrbncmhhgfbw.a03.azurefd.net/pageimages/dark_waves_1x.webp"
            customStyles="absolute inset-0 z-0 h-full w-full object-fill object-center"
          />
        </div>
      </section>

      <section className="container relative z-10 mx-auto -mt-28 max-w-3xl px-4 pb-16">
        <div className="rounded-base bg-white px-4 py-8 shadow-2xmd md:px-5 3md:px-8">
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

            {(title || message) && (
              <div className="flex flex-col gap-1">
                {/* Title */}
                {title && (
                  <Title level="1" className="!text-black">
                    {title}
                  </Title>
                )}

                {/* Message */}
                {message && <p className="text-base !text-gray">{message}</p>}
              </div>
            )}

            {/* Contact Information */}
            {showContact && (
              <div className="rounded-base bg-gray-light p-4">
                <p className="text-sm !text-black">
                  If you have any questions, please contact us at{' '}
                  <NextLink href="mailto:support@ship.link" className="font-medium text-blue hover:text-blue-darker">
                    support@ship.link
                  </NextLink>
                </p>
              </div>
            )}

            {/* CTA Button */}
            {ctaText && ctaLink && (
              <div className="flex justify-center">
                <LinkAsButton href={ctaLink} buttonProps={{ size: 'large', variant: 'primary' }}>
                  {ctaText}
                </LinkAsButton>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

GenericSuccessContent.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  ctaText: PropTypes.string,
  ctaLink: PropTypes.string,
  showContact: PropTypes.bool,
  showHome: PropTypes.bool,
};

export default GenericSuccessContent;
