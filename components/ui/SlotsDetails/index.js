import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import InputsList from '../InputsList';

import { Button, Input } from '@/elements';
import { checkNested, resetSlots } from '@/store/entities/signup/slice';
import { useSignupSelector } from '@/store/selectors';
import { hasNestedArrays } from '@/utils/helpers';
import { useHookForm } from '@/utils/hooks';

const SlotsDetails = ({ label, placeholder, onClick }) => {
  const dispatch = useDispatch();
  const { list, role } = useSignupSelector();

  const { register, setValue, formState } = useHookForm();

  const nestedList = hasNestedArrays(list);
  const { errors } = formState;

  const handleResetSlots = useCallback(() => {
    setValue('slots.count', '');
    dispatch(resetSlots());
  }, [dispatch, setValue]);

  useEffect(() => {
    dispatch(checkNested(nestedList));
  }, [dispatch, nestedList]);

  useEffect(() => {
    if (role) handleResetSlots();
  }, [handleResetSlots, role]);

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
      {list && <InputsList data={list} isNested={nestedList} />}
    </div>
  );
};

SlotsDetails.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SlotsDetails;
