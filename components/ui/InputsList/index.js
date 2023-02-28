import { memo } from 'react';

import PropTypes from 'prop-types';

import { Input } from '@/elements';
import { useHookForm } from '@/utils/hooks';

const InputsList = memo(({ data }) => {
  const { register, formState } = useHookForm();
  const { errors } = formState;

  const printInput = (value, index) => (
    <Input
      type="number"
      key={value?.id}
      label={value?.label}
      name={`tankers.list[${index}].imo`}
      error={errors.tankers?.list?.[index]?.imo?.message}
      register={register}
    />
  );

  return <ul className="grid grid-cols-2 md:grid-cols-4 gap-5">{data.map(printInput)}</ul>;
});

InputsList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default InputsList;
