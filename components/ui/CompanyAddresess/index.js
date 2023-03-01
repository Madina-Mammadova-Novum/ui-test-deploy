import { useCallback, useEffect } from 'react';

import { CheckBox } from '@/elements';
import { AddressDetails } from '@/ui';
import { useHookForm } from '@/utils/hooks';

const CompanyAddresess = () => {
  const { watch, setValue, resetField } = useHookForm();

  const rules = watch('params.rules');
  const sameAddress = watch('params.address');

  useEffect(() => {
    if (sameAddress) {
      resetField('address.secondary.line.one');
      resetField('address.secondary.line.two');
      resetField('address.secondary.city');
      resetField('address.secondary.state');
      resetField('address.secondary.zip');
    }
  }, [resetField, sameAddress]);

  const handleAddress = useCallback(() => {
    setValue('params.address', !sameAddress);
  }, [sameAddress, setValue]);

  const handleRules = useCallback(() => {
    setValue('params.rules', !rules);
  }, [rules, setValue]);

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
      <div className="col-span-2 row-auto">
        <CheckBox
          label="I agree with all"
          checked={rules}
          onChange={handleRules}
          labelStyles="text-black inline-flex gap-1 text-xsm"
        >
          <p>Privacy Policy and Terms of Use</p>
        </CheckBox>
      </div>
    </div>
  );
};

export default CompanyAddresess;
