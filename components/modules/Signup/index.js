'use client';

import { useEffect, useState } from 'react';

import { UilCheckCircle, UilExclamationTriangle } from '@iconscout/react-unicons';
import { useSearchParams } from 'next/navigation';

import { NextLink, Title } from '@/elements';
import { ROLES } from '@/lib/constants';
import { RegistrationForm } from '@/modules';
import { getSignUpData } from '@/services';
import { Tabs } from '@/units';
import { signUpTab } from '@/utils/mock';

const Signup = () => {
  const searchParams = useSearchParams();

  // Get status from searchParams to handle success/failure after identity verification
  const success = searchParams.get('success');

  // Get role from searchParams and validate it, default to OWNER if invalid or not provided
  const roleFromParams = searchParams.get('role');
  const validRoles = [ROLES.OWNER, ROLES.CHARTERER];
  const initialRole = validRoles.includes(roleFromParams) ? roleFromParams : ROLES.OWNER;

  const [role, setRole] = useState(initialRole);
  const [currentStep, setCurrentStep] = useState(1);

  const [countries, setCountries] = useState([]);

  const fetchSignUpData = async () => {
    const data = await getSignUpData();

    setCountries(data.countries);
  };

  useEffect(() => {
    fetchSignUpData();
  }, []);

  // Update role when searchParams change
  useEffect(() => {
    const urlRole = searchParams.get('role');
    const allowedRoles = [ROLES.OWNER, ROLES.CHARTERER];
    const newRole = allowedRoles.includes(urlRole) ? urlRole : null;

    // Only update role if it's different and we're on step 1
    if (newRole && newRole !== role && currentStep === 1) {
      setRole(newRole);
    }
  }, [searchParams, role, currentStep]);

  // Email addresses for support
  const failedSupportEmail = 'registration.support@ship.link';
  const successSupportEmail = 'support@ship.link';

  // Render success content when status is true
  const renderSuccessContent = () => (
    <div className="flex flex-col gap-5">
      <div className="rounded-lg border border-green-200 bg-green-50 p-5">
        <div className="mb-2 flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100">
            <UilCheckCircle className="h-5 w-5 text-green-600" />
          </div>
          <h3 className="text-sm font-semibold text-green-900">Registration Successful!</h3>
        </div>
        <p className="text-xsm text-green-800">
          Congratulations! You have successfully completed your registration and passed our identity verification
          procedure. We take the security of our users seriously, and this is an important step in ensuring a safe and
          secure platform for everyone.
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
                  Your account will be fully activated in a few minutes, and you will be able to start exploring all the
                  features and services we offer. We&apos;re thrilled to have you on board and look forward to helping
                  you achieve your goals with <strong>Ship.Link</strong>.
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

  // Render failure content when status is false
  const renderFailureContent = () => (
    <div className="flex flex-col gap-5">
      <div className="rounded-lg border border-red-200 bg-red-50 p-5">
        <div className="mb-2 flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100">
            <UilExclamationTriangle className="h-5 w-5 text-red-600" />
          </div>
          <h3 className="text-sm font-semibold text-red-900">Registration Failed</h3>
        </div>
        <p className="text-xsm text-red-800">
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
                  Our support team will help you resolve this issue and guide you through the next steps. Please contact
                  us at{' '}
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

  const roleBasedForm = {
    // eslint-disable-next-line jsx-a11y/aria-role
    charterer: <RegistrationForm countries={countries} userRole="charterer" onStepChange={setCurrentStep} />,
    // eslint-disable-next-line jsx-a11y/aria-role
    owner: <RegistrationForm countries={countries} userRole="owner" onStepChange={setCurrentStep} />,
  };

  const handleActiveTab = ({ target }) => {
    // Only allow role change when on step 1
    if (currentStep === 1) {
      setRole(target.value);
    }
  };

  // If status is present, show success/failure content instead of registration form
  if (success === 'true') {
    return (
      <div className="flex flex-col gap-6">
        <Title level="1" className="text-center text-2.5xl font-bold text-black md:text-start">
          Registration Complete
        </Title>
        {renderSuccessContent()}
      </div>
    );
  }

  if (success === 'false') {
    return (
      <div className="flex flex-col gap-6">
        <Title level="1" className="text-center text-2.5xl font-bold text-black md:text-start">
          Registration Failed
        </Title>
        {renderFailureContent()}
      </div>
    );
  }

  // Default registration form when no status is present
  return (
    <div className="flex flex-col gap-6">
      <Title level="1" className="text-center text-2.5xl font-bold text-black md:text-start">
        Registration
      </Title>
      <Tabs
        tabs={signUpTab?.tabs}
        activeTab={role}
        onClick={handleActiveTab}
        buttonClassName="w-full md:w-auto"
        customStyles="!w-full md:!w-min"
        groupClassName="w-full md:w-auto"
        disabled={currentStep !== 1}
      />

      {roleBasedForm[role]}
    </div>
  );
};

export default Signup;
