'use client';

import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import { CaptchaPropTypes } from '@/lib/types';

import { InputErrorMessage } from '@/elements';
import { useHookForm } from '@/utils/hooks';

const Captcha = React.forwardRef(({ onChange, className = 'my-2.5', errorClassName = 'text-xs-sm text-red' }, ref) => {
  const {
    formState: { submitCount, errors },
  } = useHookForm();

  return (
    <div>
      <ReCAPTCHA
        ref={ref}
        sitekey="6LeDBQMpAAAAAEFmHjH00wX_1kkrnUspo8ZG6ZZu"
        className={className}
        onChange={onChange}
      />
      {submitCount > 0 && errors?.captcha && (
        <InputErrorMessage className={errorClassName} message={errors.captcha.message} />
      )}
    </div>
  );
});

Captcha.displayName = 'Captcha';
Captcha.propTypes = CaptchaPropTypes;

export default Captcha;
