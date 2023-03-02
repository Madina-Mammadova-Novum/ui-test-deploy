import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';

import { FormManager } from '@/common';
import { Button } from '@/elements';
import ForgotPasswordForm from '@/modules/ForgotPassword/ForgotPasswordForm';

const ForgotPasswordBlock = ({ title, subtitle }) => {
  const router = useRouter();
  return (
    <FormManager>
      <h2>{title}</h2>
      <p className="mt-5 text-xsm text-black">{subtitle}</p>
      <ForgotPasswordForm />
      <Button
        onClick={() => router.push('/login')}
        type="button"
        buttonProps={{ text: 'Return to Log in', variant: 'primary', size: 'small' }}
        customStyles="w-full mt-2.5"
      />
    </FormManager>
  );
};

ForgotPasswordBlock.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default ForgotPasswordBlock;
