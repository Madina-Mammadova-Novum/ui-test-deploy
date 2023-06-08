'use client'
import { FormDropdown, Input, Title } from '@/elements';
import { getDemurragePaymentTerms, getPaymentTerms } from '@/services/paymentTerms';
import { searchSelector } from '@/store/selectors';
import { convertDataToOptions, getValueWithPath } from '@/utils/helpers';
import { useHookForm } from '@/utils/hooks';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const testOption = [{ label: 'testLabel', value: 'testValue' }];

const CommercialOfferTerms = () => {
  const [initialLoading, setInitialLoading] = useState(false)
  const [paymentTerms, setPaymentTerms] = useState([])
  const [demurragePaymentTerms, setDemurragePaymentTerms] = useState([])
  const {
    register,
    clearErrors,
    formState: { errors, isSubmitting },
    setValue,
  } = useHookForm();

  const { searchData: {
    products,
  } } = useSelector(searchSelector)

  const handleChange = (key, value) => {
    const error = getValueWithPath(errors, key);
    if (error) {
      clearErrors(key);
    }
    setValue(key, value);
  };

  useEffect(() => {
    (async () => {
      setInitialLoading(true);
      const [paymentTermsData, demurragePaymentTermsData] = await Promise.all([getPaymentTerms(), getDemurragePaymentTerms()]);
      setPaymentTerms(convertDataToOptions(paymentTermsData?.data, 'id', 'name'));
      setDemurragePaymentTerms(convertDataToOptions(demurragePaymentTermsData?.data, 'id', 'name'));
      setInitialLoading(false);
    })();
  }, []);

  return (
    <>
      <Title level="3">Commercial offer terms</Title>
      <div className="flex items-center mt-3">
        <FormDropdown
          label="cargo type"
          disabled
          customStyles={{ className: 'w-1/2 pr-6' }}
          name="cargoType"
        />
      </div>
      {products.filter(product => product).map((_, index) => (
        <div className="flex items-baseline mt-3 gap-x-5">
          <FormDropdown
            label={`product #${index + 1}`}
            name={`products[${index}].product`}
            disabled
            customStyles={{ className: 'w-1/2' }}
          />
          <Input
            {...register(`products[${index}].density`)}
            label="Density"
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
      <div className="flex w-1/2 gap-x-5 items-baseline mt-3 pr-5">
        <FormDropdown
          label="Freight"
          name="freight"
          customStyles={{ className: 'w-1/2' }}
          options={testOption}
          onChange={(option) => handleChange('freight', option)}
        />
        <Input
          {...register('value')}
          label="Value"
          name="value"
          placeholder="WS"
          customStyles="w-1/2"
          error={errors.value?.message}
          disabled={isSubmitting}
        />
      </div>

      <Input
        {...register('demurrageRate')}
        label="Demurrage rate"
        name="demurrageRate"
        placeholder="Daily payment"
        customStyles="w-1/2 mt-3 pr-5"
        error={errors.demurrageRate?.message}
        disabled={isSubmitting}
      />

      <div className="flex">
        <Input
          {...register('layTime')}
          label="lay time"
          name="layTime"
          helperText="The maximum laytime is 100 hours"
          placeholder="Daily payment"
          customStyles="w-1/2 mt-3 pr-5"
          error={errors.layTime?.message}
          disabled={isSubmitting}
        />
        <Input
          {...register('nor')}
          label="nor"
          name="nor"
          placeholder="6+6 hours"
          value="6+6 hours"
          disabled
          customStyles="w-1/2 mt-3"
        />
      </div>

      <div className="pt-4">
        <FormDropdown
          label="undisputed demurrage payment terms"
          name="undisputedDemurrage"
          customStyles="mt-3"
          options={paymentTerms}
          disabled={initialLoading}
          asyncCall={initialLoading}
          onChange={(option) => handleChange('undisputedDemurrage', option)}
        />

        <FormDropdown
          label="payemnt terms"
          name="paymentTerms"
          customStyles="mt-3"
          options={demurragePaymentTerms}
          disabled={initialLoading}
          asyncCall={initialLoading}
          onChange={(option) => handleChange('paymentTerms', option)}
        />
      </div>
    </>
  );
};

export default CommercialOfferTerms;
