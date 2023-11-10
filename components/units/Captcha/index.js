'use client';

import ReCAPTCHA from 'react-google-recaptcha';

import { CaptchaPropTypes } from '@/lib/types';

import { InputErrorMessage } from '@/elements';
import { useHookForm } from '@/utils/hooks';

const Captcha = ({ onChange }) => {
  const {
    formState: { errors },
  } = useHookForm();

  return (
    <div>
      <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} className="my-2.5" onChange={onChange} />
      {errors?.captcha && <InputErrorMessage message={errors.captcha.message} />}
    </div>
  );
};

Captcha.propTypes = CaptchaPropTypes;

export default Captcha;
