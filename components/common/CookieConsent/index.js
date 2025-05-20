'use client';

import { useEffect, useState } from 'react';

import { Button, NextLink } from '@/elements';
import { COOKIE_CONSENT_KEY, ROUTES } from '@/lib/constants';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem(COOKIE_CONSENT_KEY);

    // Check for inApp=true in query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const inApp = urlParams.get('inApp') === 'true';

    if (inApp && !hasConsented) {
      // Auto-consent if inApp=true is present in URL
      localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    } else if (!hasConsented) {
      // Only show consent banner if not already consented
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    setShowConsent(false);
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full shadow-2xl">
      <div className="bg-white py-4 shadow-2xl md:py-6 3md:py-5">
        <div className="mx-auto flex max-w-[1152px] flex-row items-center justify-between gap-2 px-4 md:gap-4 md:px-8 3md:gap-8 xl:px-0">
          <div className="flex-1">
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
