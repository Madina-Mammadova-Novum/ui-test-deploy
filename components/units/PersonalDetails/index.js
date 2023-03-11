import PropTypes from 'prop-types';

import { Input, PhoneInput } from '@/elements';
import { PasswordValidation } from '@/units';
import { useHookForm } from '@/utils/hooks';

const PersonalDetails = ({ includePassword }) => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useHookForm();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          {...register('firstName')}
          label="First name"
          placeholder="John"
          error={errors.firstName?.message}
          disabled={isSubmitting}
        />
        <Input
          {...register('lastName')}
          label="Last name"
          placeholder="Doe"
          error={errors.lastName?.message}
          disabled={isSubmitting}
        />
        <Input
          {...register('email')}
          label="Email"
          placeholder="Enter your email"
          error={errors.email?.message}
          disabled={isSubmitting}
          type="email"
        />
      </div>
      <div className="flex flex-col gap-5">
        <p className="text-black w- font-semibold b-l text-sm pt-5">Provide contact phone numbers to contact you</p>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
          <PhoneInput
            {...register('primaryPhoneNumber')}
            label="Primary phone number"
            disabled={isSubmitting}
            error={errors.primaryPhoneNumber?.message}
          />
          <PhoneInput
            {...register('secondaryPhoneNumber')}
            label="Secondary phone number"
            disabled={isSubmitting}
            error={errors.secondaryPhoneNumber?.message}
          />
        </div>
        {includePassword && (
          <div>
            <p className="text-black font-semibold text-sm py-5">
              Enter a strong password according to our requirements
            </p>
            <PasswordValidation />
          </div>
        )}
      </div>
    </>
  );
};

PersonalDetails.defaultProps = {
  includePassword: true,
};

PersonalDetails.propTypes = {
  includePassword: PropTypes.bool,
};

export default PersonalDetails;
