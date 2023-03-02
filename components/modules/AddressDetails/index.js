import PropTypes from 'prop-types';

import { Dropdown, Input } from '@/elements';
import { useHookForm } from '@/utils/hooks';
import { dropdownOptions } from '@/utils/mock';

const AddressDetails = ({ title, variant, children }) => {
  const { register, control, formState } = useHookForm();
  const { errors } = formState;

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5">
        <p className="text-black font-semibold text-sm">{title}</p>
        <Input
          type="text"
          label="ADDRESS LINE #1"
          placeholder="Apartment, suite, unit, building, floor, etc."
          register={register}
          name={`address.${variant}.line.one`}
          error={errors.address?.[variant]?.line?.one?.message}
          required
        />
        <Input
          type="text"
          label="ADDRESS LINE #2 (OPTIONAL)"
          name={`address.${variant}.line.two`}
          placeholder="Apartment, suite, unit, building, floor, etc."
          register={register}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            type="text"
            label="city"
            placeholder="New York"
            name={`address.${variant}.city`}
            error={errors.address?.[variant]?.city?.message}
            register={register}
            required
          />
          <Input
            type="text"
            name={`address.${variant}.state`}
            label="STATE / PROVINCE / REGION (OPTIONAL)"
            placeholder="NY"
            register={register}
          />
          <Input
            type="text"
            label="ZIP / POSTAL CODE (OPTIONAL)"
            placeholder="10012"
            name={`address.${variant}.zip`}
            register={register}
          />
          <Dropdown
            label="COUNTRY"
            control={control}
            name={`address.${variant}.country`}
            error={errors.address?.[variant]?.country?.message}
            dropdownOptions={dropdownOptions}
          />
          {children}
        </div>
      </div>
    </div>
  );
};

AddressDetails.defaultProps = {
  title: '',
};

AddressDetails.propTypes = {
  title: PropTypes.string,
  variant: PropTypes.oneOf(['registration', 'correspondence']).isRequired,
};

export default AddressDetails;
