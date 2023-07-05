import { DatePicker, FormDropdown, Input } from '@/elements';
import { options } from '@/utils/helpers';
import { useHookForm } from '@/utils/hooks';

const PostFixtureFilter = () => {
  const { setValue, clearErrors, register } = useHookForm();

  const handleCargoTypeChange = (params) => {
    clearErrors('cargoType');
    setValue('cargoType', params);
  };

  const handleDateChange = (value) => {
    clearErrors('fixtureDate');
    setValue('fixtureDate', value);
  };

  return (
    <div className="grid grid-cols-2 3md:grid-cols-4 gap-5 w-full">
      <Input {...register('cargoId')} placeholder="TY7621" label="Cargo ID" customStyles="w-full 3md:basis-2/12" />
      <Input
        {...register('tankerName')}
        label="tanker name"
        placeholder="Harvey Deep Sea"
        customStyles="w-full 3md:basis-2/12"
      />
      <FormDropdown
        name="cargoType"
        label="cargo type"
        placeholder="Select cargo type"
        onChange={handleCargoTypeChange}
        options={options(['Asphalt/Bitumen', 'CPP', 'DPP', 'Gas (Liquified)', 'Crude Oil'])}
        customStyles={{
          className: 'w-full 3md:basis-2/12',
        }}
      />

      <DatePicker
        inputClass="w-full 3md:basis-2/12"
        label="fixture date"
        name="fixtureDate"
        onChange={handleDateChange}
      />
    </div>
  );
};

PostFixtureFilter.propTypes = {};

export default PostFixtureFilter;
