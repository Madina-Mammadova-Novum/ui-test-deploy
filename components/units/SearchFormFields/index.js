'use client';

import { DatePicker, Dropdown, Input } from '@/elements';
import { getValueWithPath } from '@/utils/helpers';
import { useHookForm } from '@/utils/hooks';

const SearchFormFields = () => {
  const {
    register,
    clearErrors,
    formState: { errors, isSubmitting },
    setValue,
  } = useHookForm();

  const handleChange = (key, value) => {
    const error = getValueWithPath(errors, key);
    if (error) {
      clearErrors(key);
    }
    setValue(key, value);
  };

  const testOption = [{ label: 'testLabel', value: 'testValue' }];

  return (
    <div className="flex">
      <div className="w-full flex flex-col gap-y-4 pr-5 mr-5 border-r">
        <div className="flex gap-x-5">
          <DatePicker
            label="laycan start"
            inputClass="w-full"
            onChange={(date) => handleChange('laycanStart', date)}
            error={errors.laycanStart?.message}
          />
          <DatePicker
            label="laycan end"
            inputClass="w-full"
            onChange={(date) => handleChange('laycanEnd', date)}
            error={errors.laycanEnd?.message}
          />
        </div>
        <div className="flex gap-x-5">
          <Dropdown
            name="loadPort"
            value="54"
            options={testOption}
            id="loadPort"
            label="load port"
            customStyles="w-full"
            onChange={(option) => handleChange('loadPort', option)}
          />
          <Dropdown
            name="loadTerminal"
            options={testOption}
            label="load terminal"
            customStyles="w-full"
            onChange={(option) => handleChange('loadTerminal', option)}
          />
        </div>
        <div className="flex gap-x-5">
          <Dropdown
            name="dischargePort"
            options={testOption}
            label="discharge port"
            customStyles="w-full"
            onChange={(option) => handleChange('dischargePort', option)}
          />
          <Dropdown
            name="dischargeTerminal"
            options={testOption}
            label="dischargee terminal"
            customStyles="w-full"
            onChange={(option) => handleChange('dischargeTerminal', option)}
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-y-4">
        <Dropdown
          label="cargo type"
          name="cargoType"
          id="cargoType"
          options={testOption}
          onChange={(option) => handleChange('cargoType', option)}
        />
        {[1, 2].map((_, index) => (
          <div className="flex gap-x-5" key={`products${_}`}>
            <Dropdown
              onChange={(option) => handleChange(`products[${index}].product`, option)}
              name={`products[${index}].product`}
              options={testOption}
              label={`product #${index + 1}`}
              customStyles="w-1/2"
            />
            <Input
              {...register(`products[${index}].density`)}
              label="density"
              placeholder="mt/m³"
              customStyles="w-2/5"
              error={errors.products ? errors.products[index]?.density?.message : null}
              disabled={isSubmitting}
            />
            <Input
              {...register(`products[${index}].quantity`)}
              label="quantity"
              placeholder="tons"
              customStyles="w-2/5"
              error={errors.products ? errors.products[index]?.quantity?.message : null}
              disabled={isSubmitting}
            />
            <Input
              {...register(`products[${index}].tolerance`)}
              label="tolerance"
              placeholder="%"
              customStyles="w-1/5"
              error={errors.products ? errors.products[index]?.tolerance?.message : null}
              disabled={isSubmitting}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchFormFields;
