'use client';

import { useEffect, useState } from 'react';

import { Button, NextLink, Title } from '@/elements';
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
    <div className="fixed bottom-5 left-0 right-0 z-50 mx-auto w-full max-w-3xl px-4">
      <div className="rounded-base bg-white p-6 shadow-2xl">
        <Title level="3" className="mb-2 text-black">
          Cookie Notice
        </Title>
        <p className="mb-4 text-xsm text-black">
          We use cookies to enhance your experience on our website and to analyze our traffic. By continuing to use our
          site, you agree to our use of cookies as outlined in our{' '}
          <NextLink href={ROUTES.LEGAL_EXCLUDED} className="font-semibold text-blue">
            Cookie Statement
          </NextLink>
          .
        </p>
        <p className="mb-6 text-xsm font-semibold text-black">By using this site, you consent to our cookie policy.</p>
        <div className="flex justify-end">
          <Button
            buttonProps={{
              text: 'Accept and Continue',
              variant: 'primary',
              size: 'large',
            }}
            onClick={handleAccept}
          />
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
