'use client';

import { useEffect, useState } from 'react';

import { Button, NextLink } from '@/elements';
import { COOKIE_CONSENT_KEY, ROUTES } from '@/lib/constants';
import { getCookieFromBrowser, setCookie } from '@/utils/helpers';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = getCookieFromBrowser(COOKIE_CONSENT_KEY);
    if (!hasConsented) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    setCookie(COOKIE_CONSENT_KEY, 'true');
    setShowConsent(false);
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full shadow-2xl">
      <div className="bg-white px-4 py-3 shadow-2xl">
        <div className="mx-auto flex max-w-[90rem] flex-row items-center justify-between gap-2">
          <div className="ml-6 flex-1">
            <p className="text-xsm text-black">
              We use cookies to enhance your experience on our website and to analyze our traffic. By continuing to use
              our site, you agree to our use of cookies as outlined in our{' '}
              <NextLink href={ROUTES.LEGAL_EXCLUDED} className="font-semibold text-blue">
                Cookie Statement
              </NextLink>
              .{' '}
              <span className="text-xsm font-semibold text-black">
                By using this site, you consent to our cookie policy.
              </span>
            </p>
          </div>

          <div className="flex">
            <Button
              buttonProps={{
                text: 'Accept',
                variant: 'primary',
                size: 'large',
              }}
              customStyles="h-full"
              onClick={handleAccept}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
