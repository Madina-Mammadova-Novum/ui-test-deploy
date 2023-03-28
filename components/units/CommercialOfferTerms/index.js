import { Dropdown, Input, Title } from '@/elements';
import { useHookForm } from '@/utils/hooks';

const testOption = [{ label: 'testLabel', value: 'testValue' }];

const CommercialOfferTerms = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useHookForm();

  const handleChange = (key, value) => {
    setValue(key, value);
  };

  return (
    <div className="pb-5">
      <Title component="h3">Commercial offer terms</Title>
      <Dropdown
        label="cargo type"
        defaultValue="Crude Oil"
        disabled
        customStyles="max-w-[296px] mt-3"
        name="cargoType"
        options={testOption}
      />
      {[1, 2].map((_, index) => (
        <div className="flex items-center mt-3 gap-x-5">
          <Dropdown
            label={`product #${index + 1}`}
            defaultValue="Light Crude Oil"
            name={`products[${index}].product`}
            disabled
            customStyles="w-[296px]"
            options={testOption}
          />
          <Input
            {...register(`products[${index}].density`)}
            label="density"
            placeholder="mt/m³"
            customStyles="max-w-[138px]"
            error={errors.products ? errors.products[index]?.density?.message : null}
            disabled={isSubmitting}
          />
          <Input
            {...register(`products[${index}].quantity`)}
            label="min quantity"
            placeholder="tons"
            customStyles="max-w-[138px]"
            error={errors.products ? errors.products[index]?.quantity?.message : null}
            disabled={isSubmitting}
          />
        </div>
      ))}
      <div className="flex gap-x-5 items-center mt-3">
        <Dropdown
          label="freight"
          name="freight"
          customStyles="max-w-[138px]"
          options={testOption}
          onChange={(option) => handleChange('freight', option)}
        />
        <Input
          {...register('value')}
          label="value"
          name="value"
          placeholder="WS"
          customStyles="max-w-[138px]"
          error={errors.value?.message}
          disabled={isSubmitting}
        />
      </div>

      <Input
        {...register('demurrageRate')}
        label="demurrage rate"
        name="demurrageRate"
        placeholder="Daily payment"
        customStyles="max-w-[296px] mt-3"
        error={errors.demurrageRate?.message}
        disabled={isSubmitting}
      />

      <div className="flex gap-x-5">
        <Input
          {...register('layTime')}
          label="lay time"
          name="layTime"
          helperText="The maximum laytime is 100 hours"
          placeholder="Daily payment"
          customStyles="w-full max-w-[296px] mt-3 "
          error={errors.layTime?.message}
          disabled={isSubmitting}
        />
        <Input
          {...register('nor')}
          label="nor"
          name="nor"
          placeholder="Daily payment"
          disabled
          customStyles="w-full max-w-[296px] mt-3"
        />
      </div>

      <Dropdown
        label="undisputed demurrage payment terms"
        name="undisputedDemurrage"
        customStyles="mt-3"
        options={testOption}
        onChange={(option) => handleChange('undisputedDemurrage', option)}
      />

      <Dropdown
        label="payemnt terms"
        name="paymentTerms"
        customStyles="mt-3"
        options={testOption}
        onChange={(option) => handleChange('paymentTerms', option)}
      />
    </div>
  );
};

export default CommercialOfferTerms;
