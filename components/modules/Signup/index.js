'use client';

import { useEffect, useState } from 'react';

import { Title } from '@/elements';
import { ROLES } from '@/lib/constants';
import { ChartererRegistrationForm, OwnerRegistrationForm } from '@/modules';
import { getSignUpData } from '@/services';
import { Tabs } from '@/units';
import { signUpTab } from '@/utils/mock';

const Signup = () => {
  const [role, setRole] = useState(ROLES.OWNER);

  const [state, setState] = useState({
    ports: [],
    countries: [],
  });

  const handleChangeState = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const fetchSignUpData = async () => {
    const data = await getSignUpData();

    handleChangeState('countries', data.countries);
  };

  useEffect(() => {
    fetchSignUpData();
  }, []);

  const roleBasedForm = {
    charterer: <ChartererRegistrationForm countries={state?.countries} ports={state?.ports} />,
    owner: <OwnerRegistrationForm countries={state?.countries} />,
  };

  const handleActiveTab = ({ target }) => setRole(target.value);

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
      />

      {roleBasedForm[role]}
    </div>
  );
};

export default Signup;
