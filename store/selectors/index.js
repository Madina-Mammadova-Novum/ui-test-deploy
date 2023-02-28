import { useSelector } from 'react-redux';

export const useSignupSelector = () => {
  const role = useSelector(({ signup }) => signup.role);
  const imos = useSelector(({ signup }) => signup.imos);

  return { role, imos };
};
