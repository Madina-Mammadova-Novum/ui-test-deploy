import { Input, PhoneInput } from '@/elements';
import { useHookForm } from '@/utils/hooks';

const PersonalDetails = () => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useHookForm();

  return (
    <>
      <div className="grid grid-cols-2 gap-5">
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
