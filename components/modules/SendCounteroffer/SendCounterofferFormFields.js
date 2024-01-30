'use client';

import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SendCounterofferFormFieldsPropTypes } from '@/lib/types';

import { FormDropdown, Input, Title } from '@/elements';
import { FREIGHT_PLACEHOLDERS } from '@/lib/constants';
import { calculateFreightEstimation } from '@/services/calculator';
import { fetchOfferOptioins } from '@/store/entities/offer/actions';
import { getUserDataSelector, offerSelector } from '@/store/selectors';
import { calculateIntDigit, calculateTotal, getRoleIdentity, getValueWithPath } from '@/utils/helpers';
import { useHookForm } from '@/utils/hooks';

const SendCounterofferFormFields = ({ data, scrollToBottom }) => {
  const [freightEstimation, setFreightEstimation] = useState({});
  const dispatch = useDispatch();
  const {
    register,
    clearErrors,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    watch,
  } = useHookForm();

  const { role } = useSelector(getUserDataSelector);
  const { isOwner } = getRoleIdentity({ role });

  const { tankerId, products, loadPortId, dischargePortId } = data;

  const {
    data: { paymentTerms, demurragePaymentTerms, freightFormats },
    loading: initialLoading,
  } = useSelector(offerSelector);

  const handleFormat = async () => {
    const productsData = getValues('products');
    const totalCargoQuantity = calculateTotal(productsData, 'quantity');

    const body = { loadPortId, dischargePortId, totalCargoQuantity };
    const response = await calculateFreightEstimation({ data: body });

    if (!response.error) {
      setFreightEstimation({
        ...response.data,
        min: calculateIntDigit(response.data[data?.freight?.label === '$/mt' ? 'perTonnage' : 'total'], 0.8),
        max: calculateIntDigit(response.data[data?.freight?.label === '$/mt' ? 'perTonnage' : 'total'], 1.2),
      });
      setValue('totalAmount', data.total);
    }
  };

  useEffect(() => {
    if (data?.freight?.value) {
      handleFormat();
    }
  }, []);

  const freightValuePlaceholder = useMemo(() => FREIGHT_PLACEHOLDERS[watch('freight')?.label], [watch('freight')]);

  useEffect(() => {
    dispatch(fetchOfferOptioins(tankerId));
  }, [dispatch, tankerId]);

  useEffect(() => {}, []);

  const handleChange = async (key, value) => {
    const error = getValueWithPath(errors, key);
    if (JSON.stringify(getValues(key)) === JSON.stringify(value)) return;
    if (error) {
      clearErrors(key);
    }

    setValue(key, value);

    if (key === 'freight') {
      const productsData = getValues('products');
      const totalCargoQuantity = calculateTotal(productsData, 'quantity');

      const { status, data: freightEstimationData } = await calculateFreightEstimation({
        data: { loadPortId, dischargePortId, totalCargoQuantity },
      });

      if (status === 200) {
        setFreightEstimation({
          ...freightEstimationData,
          min: calculateIntDigit(freightEstimationData[value?.label === '$/mt' ? 'perTonnage' : 'total'], 0.8),
          max: calculateIntDigit(freightEstimationData[value?.label === '$/mt' ? 'perTonnage' : 'total'], 1.2),
        });

        setValue('totalAmount', data.total);
      }
    }
  };

  const printProduct = (_, index) => {
    return (
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
          disabled={isOwner}
        />
        <Input
          {...register(`products[${index}].quantity`)}
          label="min quantity"
          placeholder="tons"
          customStyles="max-w-[138px]"
          error={errors.products ? errors.products[index]?.quantity?.message : null}
          disabled={isOwner}
        />
      </div>
    );
  };

  return (
    <>
      <Title level="3">Commercial offer terms</Title>
      <div className="flex items-center mt-3">
        <FormDropdown label="cargo type" disabled customStyles={{ className: 'w-1/2 pr-4' }} name="cargoType" />
      </div>
      {products?.filter((product) => product).map(printProduct)}
      <div className="flex w-1/2 gap-x-5 items-baseline mt-3 pr-5">
        <FormDropdown
          label="Freight"
          name="freight"
          customStyles={{ className: 'w-1/2' }}
          options={freightFormats}
          disabled={initialLoading}
          loading={initialLoading}
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
          helperText={freightEstimation.total && `${freightEstimation.min} - ${freightEstimation.max}`}
          error={errors.value?.message}
          disabled={isSubmitting}
          min={String(freightEstimation.min)}
          max={String(freightEstimation.max)}
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
        disabled={isSubmitting}
      />

      <div className="flex">
        <Input
          {...register('layTime')}
          label="lay time"
          name="layTime"
          type="number"
          helperText="The maximum laytime is 100 hours"
          placeholder="Hours"
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
          options={demurragePaymentTerms}
          disabled={initialLoading}
          loading={initialLoading}
          onChange={(option) => handleChange('undisputedDemurrage', option)}
          onExpand={scrollToBottom}
          asyncCall
        />

        <FormDropdown
          label="payment terms"
          name="paymentTerms"
          customStyles={{ className: 'mt-3' }}
          options={paymentTerms}
          disabled={initialLoading}
          loading={initialLoading}
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
