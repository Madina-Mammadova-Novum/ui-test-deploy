import { Input } from '@/elements';
import { useHookForm } from '@/utils/hooks';

const CompanyDetails = () => {
  const { register, formState } = useHookForm();
  const { errors } = formState;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <Input
        type="text"
        label="company name"
        placeholder="Company"
        name="company.name"
        register={register}
        error={errors.company?.name?.message}
        required
      />
      <Input
        type="number"
        label="years of operation"
        placeholder="years"
        name="company.years"
        error={errors.company?.years?.message}
        register={register}
        required
      />
    </div>
  );
};

CompanyDetails.propTypes = {};

export default CompanyDetails;
