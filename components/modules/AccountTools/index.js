'use client';

import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { AccountToolsPropTypes } from '@/lib/types';

import { countryOptionsAdapter } from '@/adapters/countryOption';
import PlusCircleSVG from '@/assets/images/plusCircle.svg';
import TrashIcon from '@/assets/images/trashAlt.svg';
import { FormManager } from '@/common';
import { Button, FormDropdown, Input, TextWithLabel, Title } from '@/elements';
import { toolsSchema } from '@/lib/schemas';
import { getPorts } from '@/services/port';
import { Map } from '@/units';
import { getValueWithPath, resetObjectFields } from '@/utils/helpers';
import { toolsCalculatorOptions } from '@/utils/mock';

const AccountTools = ({ title, className = '' }) => {
  const [portState, setPortState] = useState([]);
  const [portOptions, setPortOptions] = useState([]);
  const [selectedCalculator, setSelectedCalculator] = useState(toolsCalculatorOptions[0]);
  const [initialLoading, setInitialLoading] = useState(false);

  const portsLimitExceeded = portState?.length >= 3;
  const isFreightCalculator = selectedCalculator.value === 'freight';

  const schema = yup.object({
    ...toolsSchema(isFreightCalculator),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      calculator: toolsCalculatorOptions[0],
    },
  });

  const {
    formState: { errors },
    setValue,
    getValues,
    clearErrors,
    unregister,
    register,
  } = methods;

  useEffect(() => {
    (async () => {
      setInitialLoading(true);
      const { status, data, error } = await getPorts();
      setInitialLoading(false);

      if (status === 200) setPortOptions(countryOptionsAdapter({ data }));
      if (error) console.log(error);
    })();
  }, []);

  const handleChange = (key, value) => {
    const error = getValueWithPath(errors, key);

    if (JSON.stringify(getValues(key)) === JSON.stringify(value)) return;

    if (error) {
      clearErrors(key);
    }

    setValue(key, value);

    if (key === 'calculator') {
      setSelectedCalculator(value);
      unregister('cargoQuantity');
      unregister('speed');
    }
  };

  const handleAddPort = () => {
    const availablePortIds = [1, 2, 3];
    setPortState((prevState) => [...prevState, availablePortIds.filter((el) => !prevState.includes(el))[0]]);
  };

  const handleRemovePort = (id) => {
    setPortState((prevState) => prevState.filter((product) => product !== id));
    unregister(`additionalPorts[${id}]`);
    clearErrors(`additionalPorts[${id}]`);
  };

  const handleResetFields = () => {
    methods.reset((formValues) => {
      resetObjectFields(formValues);
      return formValues;
    });
    setPortState([]);
    unregister('additionalPorts');
    setValue('cargoQuantity', null);
    setValue('calculator', toolsCalculatorOptions[0]);
    setSelectedCalculator(toolsCalculatorOptions[0]);
  };

  const onSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <section>
      <div>
        {title && (
          <Title level={1} className="py-5">
            {title}
          </Title>
        )}
        <div
          className={`${className} flex justify-between rounded-base bg-white divide-gray-darker gap-5 p-5 flex-row`}
        >
          <div className="w-full max-w-[296px] h-max relative">
            <FormProvider {...methods}>
              <FormManager
                submitAction={(formData) => onSubmit(formData)}
                submitButton={{
                  text: 'Calculate',
                  variant: 'secondary',
                  size: 'large',
                  className: '!w-max mr-auto !text-white',
                }}
              >
                <div className=" gap-y-4 flex flex-col">
                  <FormDropdown
                    name="calculator"
                    onChange={(option) => handleChange('calculator', option)}
                    options={toolsCalculatorOptions}
                    label="Choose a calculator"
                  />
                  <FormDropdown
                    name="fromPort"
                    onChange={(option) => handleChange('fromPort', option)}
                    options={portOptions}
                    asyncCall={initialLoading}
                    disabled={!portOptions.length}
                    label="From which port"
                    placeholder="Select port"
                  />
                  <FormDropdown
                    name="toPort"
                    onChange={(option) => handleChange('toPort', option)}
                    options={portOptions}
                    asyncCall={initialLoading}
                    disabled={!portOptions.length}
                    label="To which port"
                    placeholder="Select port"
                  />
                  {portState.map((portId) => (
                    <div key={portId}>
                      <FormDropdown
                        name={`additionalPorts[${portId}].port`}
                        onChange={(option) => handleChange(`additionalPorts[${portId}].port`, option)}
                        options={portOptions}
                        label="Additional port"
                        placeholder="Select port"
                      />
                      <Button
                        buttonProps={{
                          text: 'Delete',
                          variant: 'tertiary',
                          size: 'small',
                          icon: { before: <TrashIcon viewBox="0 0 24 24" className="fill-black w-5 h-5" /> },
                        }}
                        customStyles="ml-auto !p-0 !pt-1 [&>span]:!px-0.5"
                        onClick={() => handleRemovePort(portId)}
                      />
                    </div>
                  ))}
                  <Button
                    buttonProps={{
                      text: 'Add more ports',
                      variant: 'primary',
                      size: 'small',
                      icon: { before: <PlusCircleSVG className="fill-blue group-hover:fill-blue-darker" /> },
                      helperText: '(max 3 ports)',
                    }}
                    customStylesFromWrap="self-baseline !items-start [&>span]:!ml-6"
                    customStyles="!p-0"
                    disabled={portsLimitExceeded}
                    onClick={handleAddPort}
                  />
                  {isFreightCalculator ? (
                    <Input
                      {...register('cargoQuantity')}
                      error={errors.cargoQuantity?.message}
                      label="Cargo quantity"
                      placeholder="Enter the cargo quantity"
                      type="number"
                    />
                  ) : (
                    <Input
                      {...register('speed')}
                      error={errors.speed?.message}
                      label="Speed (Optional)"
                      placeholder="Enter the speed"
                      type="number"
                    />
                  )}
                </div>
              </FormManager>
            </FormProvider>
            <Button
              buttonProps={{
                text: 'Reset all',
                variant: 'primary',
                size: 'small',
              }}
              customStylesFromWrap="absolute left-28 bottom-0"
              customStyles="!bg-[transparent]"
              onClick={handleResetFields}
            />
          </div>
          <div className="h-auto w-full relative">
            <Map />

            <div className="absolute z-50 bg-white rounded-md p-5 w-[250px] bottom-2 left-2">
              <Title level={4}>Calculation results</Title>
              <div className="flex gap-x-2.5 mt-2.5">
                {isFreightCalculator ? (
                  <>
                    <TextWithLabel
                      label="Total freight"
                      text=""
                      customStyles="!flex-col !items-start [&>label]:!text-[10px] [&>p]:!ml-0"
                    />
                    <TextWithLabel
                      label="Cost per ton"
                      text=""
                      customStyles="!flex-col !items-start [&>label]:!text-[10px] [&>p]:!ml-0"
                    />
                  </>
                ) : (
                  <>
                    <TextWithLabel
                      label="Distance"
                      text=""
                      customStyles="!flex-col !items-start [&>label]:!text-[10px] [&>p]:!ml-0"
                    />
                    <TextWithLabel
                      label="Duration"
                      text=""
                      customStyles="!flex-col !items-start [&>label]:!text-[10px] [&>p]:!ml-0"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

AccountTools.propTypes = AccountToolsPropTypes;

export default AccountTools;
