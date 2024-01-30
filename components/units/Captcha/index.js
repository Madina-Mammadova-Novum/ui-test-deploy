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
      <ReCAPTCHA sitekey="6LeDBQMpAAAAAEFmHjH00wX_1kkrnUspo8ZG6ZZu" className="my-2.5" onChange={onChange} />
      {errors?.captcha && <InputErrorMessage message={errors.captcha.message} />}
    </div>
  );
};

Captcha.propTypes = CaptchaPropTypes;

export default Captcha;
