'use client';

import { useEffect, useState } from 'react';

import { AuthWrapper, Signup } from '@/modules';
import { getSignUpData } from '@/services';

export default function SignUp() {
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

  return (
    <AuthWrapper title="Registration" containerClass="w-full px-10 3md:px-0 pt-5 col-start-1 3md:col-start-2">
      <Signup countries={state.countries} ports={state.ports} />
    </AuthWrapper>
  );
}
