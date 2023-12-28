'use client';

import { useState } from 'react';

import PropTypes from 'prop-types';

import { ROLES } from '@/lib/constants';
import { ChartererRegistrationForm, OwnerRegistrationForm } from '@/modules';
import { Step, Tabs } from '@/units';
import { signUpTab } from '@/utils/mock';

const Signup = ({ countries, ports }) => {
  const [role, setRole] = useState(ROLES.OWNER);

  const roleBasedForm = {
    charterer: <ChartererRegistrationForm countries={countries} ports={ports} />,
    owner: <OwnerRegistrationForm countries={countries} />,
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

Signup.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.shape()),
  ports: PropTypes.arrayOf(PropTypes.shape()),
};

export default Signup;
