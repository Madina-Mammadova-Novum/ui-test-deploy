import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';

import { FormManager } from '@/common';
import { Button } from '@/elements';
import ResetPasswordForm from '@/ui/ResetPassword/ResetPasswordForm';

const ResetPasswordBlock = ({ title, subtitle }) => {
  const router = useRouter();
  return (
    <FormManager>
      <h2>{title}</h2>
      <p className="mt-5 text-xsm text-black max-w-[296px]">{subtitle}</p>
      <ResetPasswordForm />
      <Button
        onClick={() => router.push('/login')}
        type="button"
        buttonProps={{ text: 'Return to Log in', variant: 'primary', size: 'small' }}
        customStyles="w-[296px] mt-2.5"
      />
    </FormManager>
  );
};

ResetPasswordBlock.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default ResetPasswordBlock;
