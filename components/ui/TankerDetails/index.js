import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import InputsList from '../InputsList';

import { Button, Input } from '@/elements';
import { setImos } from '@/store/entities/signup/slice';
import { useSignupSelector } from '@/store/selectors';
import { useHookForm } from '@/utils/hooks';

const TankerDetails = () => {
  const dispatch = useDispatch();
  const { imos } = useSignupSelector();

  const { register, getValues, formState } = useHookForm();
  const { errors } = formState;

  const tankers = getValues('tankers');

  const handleTankersList = useCallback(() => {
    dispatch(setImos([tankers.count]));
  }, [dispatch, tankers.count]);

  return (
    <div className="grid gap-5">
      <div className="w-full md:w-1/2 relative">
        <Input
          type="number"
          label="Number of tankers"
          name="tankers.count"
          placeholder="tankers"
          customStyles="z-10"
          error={errors?.tankers?.count?.message}
          register={register}
        />

        <Button
          type="button"
          customStyles="absolute top-[18px] right-1 my-1 z-40"
          buttonProps={{ text: 'Apply', variant: 'primary', size: 'medium' }}
          onClick={handleTankersList}
        />
      </div>
      <InputsList data={imos} />
    </div>
  );
};

TankerDetails.propTypes = {};

export default TankerDetails;
