'use client';

import { useEffect, useState } from 'react';

import { ROLES } from '@/lib/constants';
import { ChartererRegistrationForm, OwnerRegistrationForm } from '@/modules';
import { getSignUpData } from '@/services';
import { Step, Tabs } from '@/units';
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

    handleChangeState('ports', data.ports);
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
    <>
      <Step title="Step #1: Choose who you are" containerClass="flex flex-col pt-5 gap-5">
        <Tabs tabs={signUpTab?.tabs} activeTab={role} onClick={handleActiveTab} />
      </Step>
      {roleBasedForm[role]}
    </>
  );
};

export default Signup;
