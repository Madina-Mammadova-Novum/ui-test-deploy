'use client';

import { useState } from 'react';

import PropTypes from 'prop-types';

import { ROLES } from '@/lib/constants';
import { ChartererRegistrationForm, OwnerRegistrationForm } from '@/modules';
import { Step, Tabs } from '@/units';
import { signUpTab } from '@/utils/mock';

const Signup = () => {
  const [role, setRole] = useState(ROLES.OWNER);

  const handleActiveTab = (event) => {
    const { value } = event.target;
    setRole(value);
  };

  const handleFormType = (typeOfForm) => {
    switch (typeOfForm) {
      case ROLES.CHARTERER:
        return <ChartererRegistrationForm />;
      default:
        return <OwnerRegistrationForm />;
    }
  };

  return (
    <>
      <Step title="Step #1: Choose who you are" containerClass="flex flex-col pt-5 gap-5">
        <Tabs tabs={signUpTab?.tabs} activeTab={role} onClick={handleActiveTab} />
      </Step>
      {handleFormType(role)}
    </>
  );
};

Signup.defaultProps = {
  containerClass: '',
};

Signup.propTypes = {
  containerClass: PropTypes.string,
};

export default Signup;
