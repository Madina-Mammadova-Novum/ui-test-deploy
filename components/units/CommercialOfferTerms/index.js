import { Dropdown, Input } from '@/elements';
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
      <h3>Commercial offer terms</h3>
      <Dropdown
        label="cargo type"
        defaultValue="Crude Oil"
        id="cargo_type"
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
            id="product_1"
            name={`product${index}`}
            disabled
            customStyles="w-[296px]"
            options={testOption}
          />
          <Input
            {...register(`density${index}`)}
            label="density"
            name={`density${index}`}
            placeholder="mt/m³"
            customStyles="max-w-[138px]"
            error={errors[`density${index}`]?.message}
            disabled={isSubmitting}
          />
          <Input
            {...register(`quantity${index}`)}
            label="min quantity"
            name={`quantity${index}`}
            placeholder="tons"
            customStyles="max-w-[138px]"
            error={errors[`quantity${index}`]?.message}
            disabled={isSubmitting}
          />
        </div>
      ))}
      <div className="flex gap-x-5 items-center mt-3">
        <Dropdown
          label="freight"
          name="freight"
          id="freight"
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
        id="undisputed_demurrage"
        name="undisputedDemurrage"
        customStyles="mt-3"
        options={testOption}
        onChange={(option) => handleChange('undisputedDemurrage', option)}
      />

      <Dropdown
        label="payemnt terms"
        name="paymentTerms"
        id="payment_teerms"
        customStyles="mt-3"
        options={testOption}
        onChange={(option) => handleChange('paymentTerms', option)}
      />
    </div>
  );
};

export default CommercialOfferTerms;
