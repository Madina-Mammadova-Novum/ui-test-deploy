import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { CheckBox } from '@/elements';
import { setAddress } from '@/store/entities/signup/slice';
import { useSignupSelector } from '@/store/selectors';
import { AddressDetails } from '@/ui';
import { useHookForm } from '@/utils/hooks';

const CompanyAddresess = () => {
  const dispatch = useDispatch();
  const { resetField } = useHookForm();
  const { sameAddress } = useSignupSelector();

  const handleResetCorresponce = useCallback(() => {
    resetField('address.correspondence.line.one');
    resetField('address.correspondence.line.two');
    resetField('address.correspondence.city');
    resetField('address.correspondence.state');
    resetField('address.correspondence.zip');
    resetField('address.correspondence.country');
  }, [resetField]);

  useEffect(() => {
    handleResetCorresponce();
  }, [handleResetCorresponce, resetField, sameAddress]);

  const handleAddress = useCallback(() => {
    dispatch(setAddress(!sameAddress));
  }, [dispatch, sameAddress]);

  return (
    <div className="flex flex-col gap-5">
      <AddressDetails title="Сompany registration address" variant="registration">
        <div className="col-span-2 row-auto">
          <CheckBox
            label="The company Registration Address is the same as the Correspondence Address."
            onChange={handleAddress}
            checked={sameAddress}
            labelStyles="text-black text-xsm"
          />
        </div>
      </AddressDetails>
      {!sameAddress && <AddressDetails title="Сompany registration address" variant="correspondence" />}
    </div>
  );
};

export default CompanyAddresess;
