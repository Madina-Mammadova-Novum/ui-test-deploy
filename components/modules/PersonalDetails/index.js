import { Input, PhoneInput } from '@/elements';
import { PasswordValidation } from '@/modules';
import { useHookForm } from '@/utils/hooks';

const PersonalDetails = () => {
  const { register, control, formState } = useHookForm();
  const { errors } = formState;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          type="text"
          label="first name"
          placeholder="John"
          name="user.name"
          register={register}
          error={errors.user?.name?.message}
          required
        />
        <Input
          type="text"
          label="last name"
          placeholder="Doe"
          name="user.surname"
          register={register}
          error={errors.user?.surname?.message}
          required
        />
        <Input
          type="mail"
          label="email address"
          placeholder="example@.com"
          name="user.email"
          register={register}
          error={errors.user?.email?.message}
          required
        />
      </div>
      <div className="flex flex-col gap-5">
        <p className="text-black w- font-semibold b-l text-sm pt-5">Provide contact phone numbers to contact you</p>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
          <PhoneInput
            control={control}
            name="user.phone.primary"
            label="primary phone number"
            error={errors.user?.phone?.primary}
            errorMsg={errors.user?.phone?.primary?.message}
          />
          <PhoneInput
            control={control}
            name="user.phone.secondary"
            label="secondary phone number (optional)"
            error={errors.user?.phone?.secondary}
            errorMsg={errors.user?.phone?.secondary?.message}
          />
        </div>
        <div>
          <p className="text-black font-semibold text-sm py-5">Enter a strong password according to our requirements</p>
          <PasswordValidation />
        </div>
      </div>
    </>
  );
};

export default PersonalDetails;
