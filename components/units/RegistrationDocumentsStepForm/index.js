'use client';

import React from 'react';

import { UilEnvelopeAlt } from '@iconscout/react-unicons';
import PropTypes from 'prop-types';

import { NextLink } from '@/elements';
import { getCookieFromBrowser } from '@/utils/helpers';

const RegistrationDocumentsStepForm = ({ onFormValid, onMethodsReady, userRole }) => {
  const email = getCookieFromBrowser('session-user-email');
  const emailText = email || 'your mail address';
  const supportEmail = 'registration.support@ship.link';

  // Since this step doesn't have a form, we notify parent that it's always valid
  React.useEffect(() => {
    if (onFormValid) {
      onFormValid(true, {});
    }
    if (onMethodsReady) {
      onMethodsReady({ trigger: () => Promise.resolve(true) });
    }
  }, [onFormValid, onMethodsReady]);

  const isCharterer = userRole === 'charterer';

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
                <h3 className="mb-2 text-sm font-semibold text-gray-900">Document Submission</h3>
                <p className="mb-3 text-xsm text-gray-700">
                  We have sent an email to <strong className="text-blue-600">{emailText}</strong> containing templates
                  for the following documents:
                </p>
                <ul className="mb-3 space-y-1 text-xsm text-gray-700">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                    Acknowledgment Letter
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                    Non-Disclosure Agreement (NDA)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                    User Authorization Letter
                  </li>
                  {isCharterer && (
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                      Commission Agreement
                    </li>
                  )}
                </ul>
                <p className="text-xsm text-gray-700">
                  Please fill out these documents on your company letterhead and submit them as instructed in the email.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gray-400 text-xsm font-semibold text-white">
                2
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-sm font-semibold text-gray-900">Document Review</h3>
                <p className="text-xsm text-gray-700">
                  Once we receive your documents, our team will review them. This process may take a few business days.
                  We will notify you via email once your documents have been reviewed and you can proceed to the next
                  step.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center gap-3">
              <UilEnvelopeAlt className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Need Support?</p>
                <p className="text-xsm text-gray-600">
                  If you have any questions or need assistance, contact our support team at{' '}
                  <NextLink href={`mailto:${supportEmail}`} className="text-blue-600 underline hover:text-blue-800">
                    {supportEmail}
                  </NextLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

RegistrationDocumentsStepForm.propTypes = {
  onFormValid: PropTypes.func,
  onMethodsReady: PropTypes.func,
  userRole: PropTypes.oneOf(['owner', 'charterer']),
};

export default RegistrationDocumentsStepForm;
