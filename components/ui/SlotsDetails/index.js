import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import InputsList from '../InputsList';

import { Button, Input } from '@/elements';
import { resetSlots } from '@/store/entities/signup/slice';
import { useSignupSelector } from '@/store/selectors';
import { useHookForm } from '@/utils/hooks';

const SlotsDetails = ({ label, placeholder, onClick }) => {
  const dispatch = useDispatch();
  const { list } = useSignupSelector();

  const { register, setValue, formState } = useHookForm();
  const { errors } = formState;

  const handleResetSlots = useCallback(() => {
    setValue('slots.count', '');
    dispatch(resetSlots());
  }, [dispatch, setValue]);

  useEffect(() => {
    return () => handleResetSlots();
  }, [handleResetSlots]);

  return (
    <div className="grid gap-5">
      <div className="w-full relative">
        <Input
          type="number"
          name="slots.count"
          label={label}
          placeholder={placeholder}
          customStyles="z-10 w-full"
          error={errors?.slots?.count?.message}
          register={register}
        />

        <Button
          type="button"
          customStyles="absolute top-[18px] right-1 my-1 z-40"
          buttonProps={{ text: 'Apply', variant: 'primary', size: 'medium' }}
          onClick={onClick}
        />
      </div>
      {list && <InputsList data={list} />}
    </div>
  );
};

SlotsDetails.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SlotsDetails;
