'use client';

import { useEffect, useState } from 'react';

import { Title } from '@/elements';
import { ROLES } from '@/lib/constants';
import { RegistrationForm } from '@/modules';
import { getSignUpData } from '@/services';
import { Tabs } from '@/units';
import { signUpTab } from '@/utils/mock';

const Signup = () => {
  const [role, setRole] = useState(ROLES.OWNER);
  const [currentStep, setCurrentStep] = useState(1);

  const [countries, setCountries] = useState([]);

  const fetchSignUpData = async () => {
    const data = await getSignUpData();

    setCountries(data.countries);
  };

  useEffect(() => {
    fetchSignUpData();
  }, []);

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
