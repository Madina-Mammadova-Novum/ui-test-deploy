import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import { FormManager } from '@/common';
import { OwnerForm, Step, Tabs } from '@/elements';
import { setRole } from '@/store/entities/signup/slice';
import { useSignupSelector } from '@/store/selectors';
import { options } from '@/utils/formOptions';
import { signUpTab } from '@/utils/mock';

const Signup = ({ containerClass }) => {
  const dispatch = useDispatch();
  const { role } = useSignupSelector();

  const { signup } = options;

  const handleActiveTab = useCallback(
    (value) => {
      dispatch(setRole(value));
    },
    [dispatch]
  );

  const setFormOptions = useMemo(() => {
    switch (role) {
      case 'charterer':
        return signup.charterer;
      default:
        return signup.owner;
    }
  }, [role, signup.charterer, signup.owner]);

  const printForm = useMemo(() => {
    switch (role) {
      case 'charterer':
        return null;
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
      <FormManager options={setFormOptions}>{printForm}</FormManager>
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
