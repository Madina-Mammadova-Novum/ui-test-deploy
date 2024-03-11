'use client';

import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CommercialOfferTermsPropTypes } from '@/lib/types';

import { FormDropdown, Input, Title } from '@/elements';
import { FREIGHT_PLACEHOLDERS } from '@/lib/constants';
import { getDemurragePaymentTerms, getPaymentTerms } from '@/services/paymentTerms';
import { setDemurragePaymentTerms, setPaymentTerms } from '@/store/entities/offer/slice';
import { getOfferSelector } from '@/store/selectors';
import { convertDataToOptions, getValueWithPath } from '@/utils/helpers';
import { useHookForm } from '@/utils/hooks';

const CommercialOfferTerms = ({ offerData, searchData, loading, scrollToBottom, valid }) => {
  const dispatch = useDispatch();
  const { ranges } = useSelector(getOfferSelector);

  const { paymentTerms, demurragePaymentTerms, freightFormats } = offerData;

  const [freightEstimation, setFreightEstimation] = useState({});

  const [paymentLoader, setPaymentLoader] = useState(false);
  const [demurrageLoader, setDemurrageLoader] = useState(false);

  const {
    watch,
    register,
    setValue,
    getValues,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useHookForm();

  const freightValuePlaceholder = useMemo(() => FREIGHT_PLACEHOLDERS[watch('freight')?.label], [watch('freight')]);

  const handleChange = async (key, value) => {
    const error = getValueWithPath(errors, key);

    if (JSON.stringify(getValues(key)) === JSON.stringify(value)) return;

    if (key === 'freight') {
      setFreightEstimation({
        min: ranges?.freightFormats[Number(value?.value) - 1]?.ranges?.min?.start,
        max: ranges?.freightFormats[Number(value?.value) - 1]?.ranges?.max?.end,
      });
    }

    if (error) {
      clearErrors(key);
    }

    setValue(key, value);
  };

  const getPaymentData = async () => {
    setPaymentLoader(true);
    const paymentTermsData = await getPaymentTerms();
    const result = convertDataToOptions(paymentTermsData, 'id', 'name');

    dispatch(setPaymentTerms(result));
    setPaymentLoader(false);
  };

  const getDemurageData = async () => {
    setDemurrageLoader(true);

    const demurragePaymentTermsData = await getDemurragePaymentTerms();
    const result = convertDataToOptions(demurragePaymentTermsData, 'id', 'name');

    dispatch(setDemurragePaymentTerms(result));
    setDemurrageLoader(false);
  };

  const printProduct = (product, index) => {
    setValue(`products[${index}].tolerance`, product.tolerance);

    return (
      <div className="flex items-baseline mt-3 gap-x-5" key={product.product.value}>
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
          disabled
        />
        <Input
          {...register(`products[${index}].quantity`)}
          label="min quantity"
          placeholder="tons"
          customStyles="max-w-[138px]"
          error={errors.products ? errors.products[index]?.quantity?.message : null}
          disabled
        />
      </div>
    );
  };

  return (
    <>
      <Title level="3">Commercial offer terms</Title>
      <div className="flex items-center mt-3">
        <FormDropdown label="cargo type" disabled customStyles={{ className: 'w-1/2 pr-6' }} name="cargoType" />
      </div>
      {searchData?.products?.length > 0 && searchData.products.map(printProduct)}
      <div className="flex w-1/2 gap-x-5 items-baseline mt-3 pr-5">
        <FormDropdown
          label="Freight"
          name="freight"
          customStyles={{ className: 'w-1/2' }}
          options={freightFormats}
          disabled={!valid || loading}
          loading={loading}
          onChange={(option) => handleChange('freight', option)}
          asyncCall
        />
        <Input
          {...register('value')}
          label="Value"
          name="value"
          type="number"
          placeholder={freightValuePlaceholder}
          customStyles="w-1/2"
          helperText={freightEstimation.min && `${freightEstimation?.min} - ${freightEstimation?.max}`}
          error={errors.value?.message}
          disabled={!valid || isSubmitting}
          min={freightEstimation.min && String(freightEstimation.min)}
          max={freightEstimation.max && String(freightEstimation.max)}
          step="any"
        />
      </div>

      <Input
        {...register('demurrageRate')}
        label="Demurrage rate"
        name="demurrageRate"
        type="number"
        placeholder="$ per day"
        customStyles="w-1/2 mt-3 pr-5"
        error={errors.demurrageRate?.message}
        helperText={
          ranges?.demurrageRate?.min && `${ranges?.demurrageRate?.min?.start} - ${ranges?.demurrageRate?.max?.end}`
        }
        disabled={!valid || isSubmitting}
      />

      <div className="flex">
        <Input
          {...register('layTime')}
          label="lay time"
          name="layTime"
          type="number"
          placeholder="Hours"
          customStyles="w-1/2 mt-3 pr-5"
          helperText={`The maximum laytime is ${ranges?.layTime?.max?.end || 120} hours`}
          error={errors.layTime?.message}
          disabled={!valid || isSubmitting}
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
          options={demurragePaymentTerms}
          disabled={!valid || loading}
          loading={demurrageLoader ?? loading}
          onFocus={!demurragePaymentTerms?.length && getDemurageData}
          onChange={(option) => handleChange('undisputedDemurrage', option)}
          onExpand={scrollToBottom}
          asyncCall
        />

        <FormDropdown
          label="payment terms"
          name="paymentTerms"
          customStyles={{ className: 'mt-3' }}
          options={paymentTerms}
          disabled={!valid || loading}
          onFocus={!paymentTerms?.length && getPaymentData}
          loading={paymentLoader ?? loading}
          onChange={(option) => handleChange('paymentTerms', option)}
          onExpand={scrollToBottom}
          asyncCall
        />
      </div>
    </>
  );
};

CommercialOfferTerms.propTypes = CommercialOfferTermsPropTypes;

export default CommercialOfferTerms;
