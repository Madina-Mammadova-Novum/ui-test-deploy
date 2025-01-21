'use client';

import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SendCounterofferFormFieldsPropTypes } from '@/lib/types';

import { FormDropdown, Input, Title } from '@/elements';
import { FREIGHT_PLACEHOLDERS } from '@/lib/constants';
import { fetchOfferOptions } from '@/store/entities/offer/actions';
import { getOfferSelector } from '@/store/selectors';
import { getValueWithPath } from '@/utils/helpers';
import { useHookForm } from '@/utils/hooks';

const SendCounterofferFormFields = ({ data, scrollToBottom }) => {
  const dispatch = useDispatch();

  const {
    watch,
    register,
    setValue,
    getValues,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useHookForm();

  const [freightEstimation, setFreightEstimation] = useState({});
  const { ranges, valid, loading, data: helperData } = useSelector(getOfferSelector);
  const { paymentTerms, demurragePaymentTerms, freightFormats } = helperData;

  const { products } = data;

  const currentFreight = watch('freight');

  const getFreightValue = () => {
    const currentFreightType = parseFloat(currentFreight?.value);
    return freightFormats?.find((format) => parseFloat(format?.value) === currentFreightType);
  };

  const selectedFreight = getFreightValue();
  const freightValuePlaceholder = useMemo(() => FREIGHT_PLACEHOLDERS[selectedFreight?.label], [selectedFreight]);

  const minValue = freightEstimation?.min;
  const maxValue = freightEstimation?.max;

  const helperFreightFormat =
    selectedFreight?.label === 'WS'
      ? freightEstimation?.min && `WS ${minValue} - WS ${maxValue}`
      : freightEstimation?.min && `${minValue}$ - ${maxValue}$`;

  const helperRangeFormat =
    ranges?.demurrageRate?.min && `${ranges?.demurrageRate?.min?.start}$ - ${ranges?.demurrageRate?.max?.end}$`;

  const helperLaytimeFormat = `Laytime available in range from ${ranges?.layTime?.min?.start || 12} to ${
    ranges?.layTime?.min?.end || 94
  }`;

  const handleChange = async (key, value) => {
    const error = getValueWithPath(errors, key);
    if (JSON.stringify(getValues(key)) === JSON.stringify(value)) return;

    if (value?.label === '$/mt') {
      setValue('value', '');
    }

    if (error) {
      clearErrors(key);
    }
    setValue(key, value);
  };

  useEffect(() => {
    const selectedFormat = ranges?.freightFormats?.find((format) => format.id === selectedFreight?.value);

    setFreightEstimation({
      min: selectedFormat?.ranges?.min?.start,
      max: selectedFormat?.ranges?.max?.end,
    });
  }, [selectedFreight, ranges]);

  useEffect(() => {
    if (valid) {
      dispatch(
        fetchOfferOptions({
          isCounterOffer: true,
          freightFormats: ranges?.freightFormats?.map(({ id, value }) => ({ value: id, label: value })) || [],
        })
      );
    }
  }, [ranges, valid]);

  const printProduct = (_, index) => {
    return (
      <div key={index} className="mt-3 flex items-baseline gap-x-5">
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
          step="any"
        />
        <Input
          {...register(`products[${index}].minQuantity`)}
          label="min quantity"
          placeholder="tons"
          customStyles="max-w-[138px]"
          error={errors.products ? errors.products[index]?.minQuantity?.message : null}
          disabled
        />
      </div>
    );
  };

  return (
    <>
      <Title level="3">Commercial offer terms</Title>
      <div className="mt-3 flex items-center">
        <FormDropdown label="cargo type" disabled customStyles={{ className: 'w-1/2 pr-4' }} name="cargoType" />
      </div>
      {products?.filter((product) => product).map(printProduct)}
      <div className="mt-3 flex w-1/2 items-baseline gap-x-5 pr-5">
        <FormDropdown
          label="Freight"
          name="freight"
          customStyles={{ className: 'w-1/2' }}
          options={freightFormats}
          disabled={loading || !valid}
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
          customStyles="w-1/2 whitespace-nowrap"
          helperText={helperFreightFormat}
          error={errors.value?.message}
          disabled={isSubmitting || !valid}
          step="0.001"
        />
      </div>

      <Input
        {...register('demurrageRate')}
        label="Demurrage rate"
        name="demurrageRate"
        type="number"
        placeholder="$ per day"
        customStyles="w-1/2 mt-3 pr-5 whitespace-nowrap"
        helperText={helperRangeFormat}
        error={errors.demurrageRate?.message}
        disabled={isSubmitting || !valid}
      />

      <div className="flex">
        <Input
          {...register('layTime')}
          label="lay time"
          name="layTime"
          type="number"
          placeholder="Hours"
          customStyles="w-1/2 mt-3 pr-5"
          disabled={isSubmitting || !valid}
          error={errors.layTime?.message}
          helperText={helperLaytimeFormat}
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
          disabled={loading || !valid}
          loading={loading}
          onChange={(option) => handleChange('undisputedDemurrage', option)}
          onExpand={scrollToBottom}
          asyncCall
        />

        <FormDropdown
          label="payment terms"
          name="paymentTerms"
          customStyles={{ className: 'mt-3' }}
          options={paymentTerms}
          disabled={loading || !valid}
          loading={loading}
          onChange={(option) => handleChange('paymentTerms', option)}
          onExpand={scrollToBottom}
          asyncCall
        />
      </div>
    </>
  );
};

SendCounterofferFormFields.propTypes = SendCounterofferFormFieldsPropTypes;

export default SendCounterofferFormFields;
