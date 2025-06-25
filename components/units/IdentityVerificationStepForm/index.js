'use client';

import React from 'react';

import { useSearchParams } from 'next/navigation';
import PropTypes from 'prop-types';

import { Button, NextLink } from '@/elements';

const IdentityVerificationStepForm = ({ onFormValid, onMethodsReady }) => {
  const searchParams = useSearchParams();

  // Get URL parameters
  const redirectUrl = searchParams.get('redirectUrl');

  // Since this step doesn't have a form, we notify parent that it's always valid
  React.useEffect(() => {
    if (onFormValid) {
      onFormValid(true, {});
    }
    if (onMethodsReady) {
      onMethodsReady({ trigger: () => Promise.resolve(true) });
    }
  }, [onFormValid, onMethodsReady]);

  // Handle redirect URL case - show initial identity verification content
  if (redirectUrl) {
    return (
      <div className="flex flex-col gap-5">
        <div className="max-w-none">
          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 bg-white p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xsm font-semibold text-white">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-sm font-semibold text-gray-900">Identity Document Required</h3>
                  <p className="mb-3 text-xsm text-gray-700">
                    You will need to provide one of the following internationally recognized identity documents:
                  </p>
                  <ul className="mb-3 space-y-1 text-xsm text-gray-700">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                      Passport
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                      Driver&apos;s License
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                      National ID Card
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xsm font-semibold text-white">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-sm font-semibold text-gray-900">Face Verification</h3>
                  <p className="text-xsm text-gray-700">
                    A face check will be performed to match with the picture on your identity document. This ensures the
                    security and authenticity of your account.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <NextLink href={redirectUrl} className="block w-full">
                <Button
                  buttonProps={{
                    text: 'Start Identity Verification',
                    variant: 'primary',
                    size: 'large',
                  }}
                  customStyles="w-full"
                />
              </NextLink>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default case - no specific parameters, show placeholder
  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">Identity Verification</h2>
        <p className="text-sm text-gray-600">
          This step will be automatically handled based on the verification process.
        </p>
      </div>
    </div>
  );
};

IdentityVerificationStepForm.propTypes = {
  onFormValid: PropTypes.func,
  onMethodsReady: PropTypes.func,
};

export default IdentityVerificationStepForm;
