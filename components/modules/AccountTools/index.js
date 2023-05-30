'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import PlusCircleSVG from '@/assets/images/plusCircle.svg';
import staticMap from '@/assets/images/staticMap.png';
import TrashIcon from '@/assets/images/trashAlt.svg';
import { Button, FormDropdown, Input, NextImage, Title } from '@/elements';
import { toolsSchema } from '@/lib/schemas';
import { getValueWithPath } from '@/utils/helpers';

const schema = yup.object({
  ...toolsSchema(),
});

const AccountTools = () => {
  const testOption = [
    { label: 'testLabel', value: 'testValue' },
    { label: 'testLabel2', value: 'testValue2' },
  ];

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const {
    formState: { errors },
    setValue,
    clearErrors,
  } = methods;

  const handleChange = (key, value) => {
    const error = getValueWithPath(errors, key);
    if (error) {
      clearErrors(key);
    }
    setValue(key, value);
  };

  return (
    <section>
      <div className=" pt-5">
        <Title className="mb-5" level={1}>
          Tools
        </Title>
        <div className="flex justify-between rounded-base bg-white divide-gray-darker p-5">
          <div className="w-[35%]">
            <div className="flex flex-col">
              <FormProvider {...methods}>
                <div className=" gap-[34px] flex flex-col">
                  <FormDropdown
                    defaultValue="Some category"
                    error={errors.calc?.message}
                    name="calculator"
                    onChange={(option) => handleChange('calculator', option)}
                    options={testOption}
                    label="choose a calculator"
                  />
                  <FormDropdown
                    defaultValue="Some category"
                    error={errors.calc?.message}
                    name="fromPort"
                    onChange={(option) => handleChange('fromPort', option)}
                    options={testOption}
                    label="from which port"
                  />
                  <FormDropdown
                    defaultValue="Some category"
                    error={errors.calc?.message}
                    name="toPort"
                    onChange={(option) => handleChange('toPort', option)}
                    options={testOption}
                    label="to which port"
                  />
                </div>
                <div className="pt-[34px]">
                  <FormDropdown
                    defaultValue="Some category"
                    error={errors.calc?.message}
                    name="additional"
                    onChange={(option) => handleChange('additional', option)}
                    options={testOption}
                    label="additional port"
                  />
                </div>
              </FormProvider>
              <div>
                <Button
                  buttonProps={{
                    text: 'Delete',
                    variant: 'tertiary',
                    size: 'small',
                    icon: { after: <TrashIcon viewBox="0 0 24 24" className="fill-black w-5 h-5" /> },
                  }}
                  customStyles="ml-auto !p-0"
                />
                <div className="flex justify-start items-start mb-[30px]">
                  <Button
                    buttonProps={{
                      text: 'Add more ports',
                      variant: 'primary',
                      size: 'small',
                      icon: { before: <PlusCircleSVG className="fill-blue group-hover:fill-blue-darker" /> },
                      helperText: '(max 3 ports)',
                    }}
                  />
                </div>
                <div className="mb-[20px]">
                  <Input label="cargo quantity" placeholder="Enter the cargo quantity" type="text" />
                </div>
                <div className="flex justify-start">
                  <Button
                    buttonProps={{
                      text: 'Calculate',
                      variant: 'secondary',
                      size: 'large',
                    }}
                  />
                  <Button
                    buttonProps={{
                      text: 'Reset all',
                      variant: 'primary',
                      size: 'small',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <NextImage className="w-[1000px]" src={staticMap} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountTools;
