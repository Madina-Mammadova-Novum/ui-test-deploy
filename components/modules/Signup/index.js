import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import { FormManager } from '@/common';
import { ChartererForm, OwnerForm, Step, Tabs } from '@/elements';
import { setRole } from '@/store/entities/signup/slice';
import { useSignupSelector } from '@/store/selectors';
import { signupOptions } from '@/utils/formOptions';
import { signUpTab } from '@/utils/mock';

const Signup = ({ containerClass }) => {
  const dispatch = useDispatch();
  const { role, sameAddress, isNested } = useSignupSelector();

  const handleActiveTab = useCallback(
    (value) => {
      dispatch(setRole(value));
    },
    [dispatch]
  );

  const printForm = useMemo(() => {
    switch (role) {
      case 'charterer':
        return <ChartererForm />;
      default:
        return <OwnerForm />;
    }
  }, [role]);

  return (
    <div className={containerClass}>
      <h1 className="text-lg text-black font-bold">Registration</h1>
      <Step title="Step #1: Choose who you are" containerClass="flex flex-col pt-5 gap-5">
        <Tabs
          tabs={signUpTab?.tabs}
          activeTab={role}
          defaultTab={role}
          onClick={({ target }) => handleActiveTab(target?.value)}
        />
      </Step>
      <FormManager options={signupOptions({ sameAddress, isNested })}>{printForm}</FormManager>
    </div>
  );
};

Signup.defaultProps = {
  containerClass: '',
};

Signup.propTypes = {
  containerClass: PropTypes.string,
};

export default Signup;
