import classnames from 'classnames';

import { Input, PhoneInput } from '@/elements';
import { useHookForm } from '@/utils/hooks';

const PersonalDetails = () => {
  const {
    register,
    getValues,
    formState: { errors, isSubmitting },
  } = useHookForm();

  const values = getValues();

  const { pending, pendingRequest, firstName, lastName, email } = values;

  return (
    <>
      <div className="grid grid-cols-2 gap-5">
        <Input
          {...register('firstName')}
          label="First name"
          labelBadge={
            pendingRequest ? (
              <p className={classnames('font-bold', pending?.name === firstName ? 'text-green' : 'text-blue')}>
                {pending?.name}
              </p>
            ) : null
          }
          placeholder="John"
          error={errors.firstName?.message}
          disabled
        />
        <Input
          {...register('lastName')}
          label="Last name"
          labelBadge={
            pendingRequest ? (
              <p className={classnames('font-bold', pending?.surname === lastName ? 'text-green' : 'text-blue')}>
                {pending?.surname}
              </p>
            ) : null
          }
          placeholder="Doe"
          error={errors.lastName?.message}
          disabled
        />
        <Input
          {...register('email')}
          label="Email"
          labelBadge={
            pendingRequest ? (
              <p className={classnames('font-bold', pending?.email === email ? 'text-green' : 'text-blue')}>
                {pending?.email}
              </p>
            ) : null
          }
          placeholder="Enter your email"
          error={errors.email?.message}
          disabled={isSubmitting}
        />
      </div>
      <div className="flex flex-col gap-5">
        <p className="text-black w- font-semibold b-l text-sm pt-5">Contact Information</p>
        <div className="grid gap-5 grid-cols-2">
          <PhoneInput
            {...register('primaryPhone')}
            onBlur={() => {}}
            label="Primary phone number"
            disabled={isSubmitting}
            error={errors.primaryPhone?.message}
          />
          <PhoneInput
            onBlur={() => {}}
            {...register('secondaryPhone')}
            label="Secondary phone number (optional)"
            disabled={isSubmitting}
            error={errors.secondaryPhone?.message}
          />
        </div>
      </div>
    </>
  );
};

export default PersonalDetails;
