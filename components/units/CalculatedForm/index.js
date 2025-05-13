'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import * as yup from 'yup';

import { successToolsDataAdapter } from '@/adapters';
import { dropDownOptionsAdapter } from '@/adapters/countryOption';
import { FormManager } from '@/common';
import { captchaSchema, toolsSchema } from '@/lib/schemas';
import { getEstimation } from '@/services';
import { getGeneralDataSelector } from '@/store/selectors';
import { CalculatedDetails, Captcha } from '@/units';
import { getValueWithPath } from '@/utils/helpers';
import { errorToast, useHookFormParams } from '@/utils/hooks';
import { toolsCalculatorOptions } from '@/utils/mock';

const CalculatedForm = ({ customHeight = '', children, isLoggedIn = false }) => {
  const { ports } = useSelector(getGeneralDataSelector);
  const [captcha, setCaptcha] = useState(null);
  const captchaRef = useRef(null);

  const [state, setState] = useState({
    generalPorts: dropDownOptionsAdapter({ data: ports?.searchPorts }),
    additionalPorts: [],
    calculator: toolsCalculatorOptions[0],
    fromPort: null,
    toPort: null,
    speed: 11,
  });

  const [errorMessage, setErrorMessage] = useState('');

  const { calculator, additionalPorts } = state;

  const isFreight = calculator?.value === toolsCalculatorOptions[0]?.value;

  const schema = yup.object().shape({
    ...toolsSchema({ isFreight }),
    ...(isLoggedIn ? {} : captchaSchema()),
  });

  const methods = useHookFormParams({ schema, state });

  useEffect(() => {
    if (state.fromPort === state.toPort) {
      setErrorMessage('From port and to port cannot be the same.');
    } else {
      setErrorMessage('');
    }
  }, [state.fromPort, state.toPort]);

  useEffect(() => {
    if (isLoggedIn) return;
    methods.setValue('captcha', captcha);
    methods.trigger('captcha');
  }, [captcha, methods, isLoggedIn]);

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
    // Reset the form values
    methods.setValue('cargoQuantity', null);
    methods.setValue('speed', null);
    methods.setValue('fromPort', null);
    methods.setValue('toPort', null);
    methods.setValue('calculator', calculator);
    methods.setValue('response', null);

    if (isLoggedIn) return;

    methods.setValue('captcha', null);

    // Reset the captcha using the ref
    if (captchaRef.current) {
      captchaRef.current.reset();
    }

    setCaptcha(null);
  };

  const handleChangeValue = (key, value) => {
    const error = getValueWithPath(methods?.errors, key);

    const valuesByKey = methods.getValues(key);

    if (JSON.stringify(valuesByKey) === JSON.stringify(value)) return;
    if (error) methods.clearErrors(key);

    methods.setValue(key, value);
    handleChangeState(key, value);

    if (key === 'calculator') {
      if (value?.value === 'distanceandduration') {
        methods.setValue('cargoQuantity', null);
        methods.clearErrors('cargoQuantity');
      } else if (value?.value === 'freightestimation') {
        methods.setValue('speed', null);
        methods.clearErrors('speed');
      }

      methods.setValue('response', null);
    }
  };

  // TODO: Add back the additional ports
  // const handleAddPort = () => {
  //   const availablePortIds = [1, 2, 3];
  //   const newPort = [...additionalPorts, availablePortIds.filter((el) => !additionalPorts.includes(el))[0]];

  //   handleChangeState('additionalPorts', newPort);
  // };

  // const handleRemovePort = (id) => {
  //   const removedPort = additionalPorts.filter((portId) => portId !== id);
  //   handleChangeState('additionalPorts', removedPort);

  //   methods.unregister(`additionalPorts[${id}]`);
  //   methods.clearErrors(`additionalPorts[${id}]`);
  // };

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
    <div className="relative mt-5 flex h-max w-full flex-row gap-5 divide-gray-darker rounded-base bg-white p-5 pb-20 shadow-2xl md:pb-5">
      <FormProvider {...methods}>
        <FormManager
          className="w-full gap-5"
          showReset
          submitAction={handleSubmit}
          resetAction={handleReset}
          submitButton={{
            text: 'Calculate',
            variant: 'primary',
            size: 'large',
            className: '!w-auto !text-white',
            buttonContainerClassName: 'absolute bottom-3 sm:bottom-5 right-5 sm:right-0 sm:left-5',
            disabled: !!errorMessage,
          }}
        >
          <div className="flex w-full flex-col gap-5 md:flex-row">
            <div className="flex w-full flex-col gap-4 md:max-w-[336px]">
              <CalculatedDetails isFreight={isFreight} onChange={handleChangeValue} />
              {!isLoggedIn && (
                <Captcha
                  onChange={setCaptcha}
                  ref={captchaRef}
                  errorClassName="text-xs-sm text-red md:mb-12"
                  className="m-0"
                />
              )}
            </div>
            <div className={`${customHeight || setHeight} relative w-full transition-all duration-150 ease-out`}>
              {children}
            </div>
          </div>
        </FormManager>
      </FormProvider>
    </div>
  );
};

CalculatedForm.propTypes = {
  customHeight: PropTypes.string,
  children: PropTypes.node,
  isLoggedIn: PropTypes.bool,
};

export default CalculatedForm;
