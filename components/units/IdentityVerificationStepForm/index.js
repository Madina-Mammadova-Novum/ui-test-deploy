'use client';

import React from 'react';

import { UilCheckCircle, UilExclamationTriangle, UilUser } from '@iconscout/react-unicons';
import { useSearchParams } from 'next/navigation';
import PropTypes from 'prop-types';

import { Button, NextLink } from '@/elements';

const IdentityVerificationStepForm = ({ onFormValid, onMethodsReady }) => {
  const searchParams = useSearchParams();

  // Get URL parameters
  const redirectUrl = searchParams.get('redirectUrl');
  const status = searchParams.get('status');

  // Email addresses for support
  const failedSupportEmail = 'registration.support@ship.link';
  const successSupportEmail = 'support@ship.link';

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
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100">
              <UilUser className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="text-sm font-semibold text-blue-900">Identity Verification Required</h3>
          </div>
          <p className="text-xsm leading-relaxed text-blue-800">
            To complete your registration and activate your account, you need to complete the identity verification
            process.
          </p>
        </div>

        <div className="max-w-none">
          <h2 className="mb-4 text-sm font-semibold text-gray-900">Identity Verification Process</h2>

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

  // Handle status=false case - verification failed
  if (status === 'false') {
    return (
      <div className="flex flex-col gap-5">
        <div className="rounded-lg border border-red-200 bg-red-50 p-5">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100">
              <UilExclamationTriangle className="h-5 w-5 text-red-600" />
            </div>
            <h3 className="text-sm font-semibold text-red-900">Identity Verification Failed</h3>
          </div>
          <p className="text-xsm leading-relaxed text-red-800">
            Unfortunately, your identity verification has failed. Please try again or contact our support team for
            assistance.
          </p>
        </div>

        <div className="max-w-none">
          <h2 className="mb-4 text-sm font-semibold text-gray-900">Next Steps</h2>

          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 bg-white p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xsm font-semibold text-white">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-sm font-semibold text-gray-900">Contact Support for Assistance</h3>
                  <p className="text-xsm text-gray-700">
                    Our support team will help you resolve this issue and guide you through the next steps. Please
                    contact us at{' '}
                    <NextLink
                      href={`mailto:${failedSupportEmail}`}
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      {failedSupportEmail}
                    </NextLink>{' '}
                    with your account details.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xsm font-semibold text-white">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-sm font-semibold text-gray-900">What to Include</h3>
                  <p className="text-xsm text-gray-700">
                    When contacting support, please include your registered email address and any relevant details about
                    the verification process. This will help us assist you more efficiently.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle status=true case - verification successful
  if (status === 'true') {
    return (
      <div className="flex flex-col gap-5">
        <div className="rounded-lg border border-green-200 bg-green-50 p-5">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100">
              <UilCheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="text-sm font-semibold text-green-900">Identity Verification Successful!</h3>
          </div>
          <p className="text-xsm leading-relaxed text-green-800">
            Congratulations! You have successfully passed our identity verification procedure. We take the security of
            our users seriously, and this is an important step in ensuring a safe and secure platform for everyone.
          </p>
        </div>

        <div className="max-w-none">
          <h2 className="mb-4 text-sm font-semibold text-gray-900">What&apos;s Next?</h2>

          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 bg-white p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xsm font-semibold text-white">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-sm font-semibold text-gray-900">Account Activation</h3>
                  <p className="text-xsm text-gray-700">
                    Your account will be fully activated in a few minutes, and you will be able to start exploring all
                    the features and services we offer. We&apos;re thrilled to have you on board and look forward to
                    helping you achieve your goals with <strong>Ship.Link</strong>.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xsm font-semibold text-white">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-sm font-semibold text-gray-900">Get Support</h3>
                  <p className="text-xsm text-gray-700">
                    If you have any questions or need assistance, our support team is here to help. Contact us at{' '}
                    <NextLink
                      href={`mailto:${successSupportEmail}`}
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      {successSupportEmail}
                    </NextLink>{' '}
                    or simply start the chat to get live assistance.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <p className="mb-2 text-sm font-medium text-gray-900">Thank you for choosing our platform!</p>
              <p className="text-xsm text-gray-600">
                You can now return to the homepage to start using Ship.Link&apos;s features and services.
              </p>
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
