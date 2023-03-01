import { useSelector } from 'react-redux';

export const useSignupSelector = () => {
  const role = useSelector(({ signup }) => signup.role);
  const list = useSelector(({ signup }) => signup.list);
  const rules = useSelector(({ signup }) => signup.rules);
  const sameAddress = useSelector(({ signup }) => signup.sameAddress);
  const isNested = useSelector(({ signup }) => signup.isNested);

  return { role, rules, list, sameAddress, isNested };
};
