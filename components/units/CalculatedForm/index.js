'use client';

import { useMemo, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useSelector } from 'react-redux';

import * as yup from 'yup';

import { successToolsDataAdapter } from '@/adapters';
import { countryOptionsAdapter } from '@/adapters/countryOption';
import { FormManager } from '@/common';
import { toolsSchema } from '@/lib/schemas';
import { getEstimation } from '@/services';
import { getGeneralDataSelector } from '@/store/selectors';
import { CalculatedDetails } from '@/units';
import { getValueWithPath, resetObjectFields } from '@/utils/helpers';
import { errorToast, useHookFormParams } from '@/utils/hooks';
import { toolsCalculatorOptions } from '@/utils/mock';

const CalculatedForm = ({ children }) => {
  const { ports } = useSelector(getGeneralDataSelector);

  const [state, setState] = useState({
    generalPorts: countryOptionsAdapter({ data: ports?.searchPorts }),
    additionalPorts: [],
    calculator: toolsCalculatorOptions[0],
    fromPort: null,
    toPort: null,
  });

  const { calculator, additionalPorts, generalPorts } = state;

  const isFreight = calculator?.value === toolsCalculatorOptions[0]?.value;

  const schema = yup.object().shape({ ...toolsSchema({ isFreight }) });

  const methods = useHookFormParams({ schema, state });

  /* Change handler by key-value for userStore */
  const handleChangeState = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmit = async (data) => {
    const { data: response, error } = await getEstimation({ data });

    const result = successToolsDataAdapter({ data: { ...response, key: calculator.value } });

    if (result) methods.setValue('response', result);
    if (error) errorToast(error.title, error.message);
  };

  const handleReset = () => {
    // eslint-disable-next-line no-sequences
    methods.reset((formValues) => (resetObjectFields(formValues), formValues));
    methods.unregister('additionalPorts');
    methods.setValue('cargoQuantity', null);
    methods.setValue('calculator', toolsCalculatorOptions[0]);
    handleChangeState('calculator', toolsCalculatorOptions[0]);
  };

  const handleChangeValue = (key, value) => {
    const error = getValueWithPath(methods?.errors, key);

    const valuesByKey = methods.getValues(key);

    if (JSON.stringify(valuesByKey) === JSON.stringify(value)) return;
    if (error) methods.clearErrors(key);

    methods.setValue(key, value);
    handleChangeState(key, value);

    if (key === 'calculator') {
      methods.unregister('cargoQuantity');
      methods.unregister('speed');
    }
  };

  const handleAddPort = () => {
    const availablePortIds = [1, 2, 3];
    const newPort = [...additionalPorts, availablePortIds.filter((el) => !additionalPorts.includes(el))[0]];

    handleChangeState('additionalPorts', newPort);
  };

  const handleRemovePort = (id) => {
    const removedPort = additionalPorts.filter((portId) => portId !== id);
    handleChangeState('additionalPorts', removedPort);

    methods.unregister(`additionalPorts[${id}]`);
    methods.clearErrors(`additionalPorts[${id}]`);
  };

  const setHeight = useMemo(() => {
    const heightProps = {
      0: 'h-[464px]',
      1: 'h-[464px]',
      2: 'h-[528px]',
      3: 'h-[600px]',
    };

    return heightProps[additionalPorts.length];
  }, [additionalPorts.length]);

  return (
    <div className="flex mt-5 w-full h-max relative gap-5 rounded-base  bg-white divide-gray-darker p-5 flex-row shadow-2xl">
      <FormProvider {...methods}>
        <FormManager
          className="w-full gap-5"
          showReset
          submitAction={handleSubmit}
          resetAction={handleReset}
          submitButton={{
            text: 'Calculate',
            variant: 'secondary',
            size: 'large',
            className: '!w-auto !text-white',
            buttonContainerClassName: 'absolute bottom-5',
          }}
        >
          <div className="flex w-full gap-5">
            <CalculatedDetails
              isFreight={isFreight}
              ports={generalPorts}
              additionalPorts={additionalPorts}
              onAdd={handleAddPort}
              onChange={handleChangeValue}
              onRemove={handleRemovePort}
            />
            <div className={`${setHeight} w-full relative transition-all duration-150 ease-out`}>{children}</div>
          </div>
        </FormManager>
      </FormProvider>
    </div>
  );
};

export default CalculatedForm;
