'use client';

import PropTypes from 'prop-types';

import { CheckBoxInput } from '@/elements';
import { ADDRESS } from '@/lib/constants';
import { AddressDetails } from '@/units';
import { useHookForm } from '@/utils/hooks';

const CompanyAddresses = ({ countries }) => {
  const { setValue, getValues } = useHookForm();

  const { sameAddresses } = getValues();

  const handleSameAddress = (event) => {
    const { checked } = event.target;
    setValue('sameAddresses', checked);
  };

  return (
    <div className="flex flex-col gap-5">
      <AddressDetails
        title={`Company ${ADDRESS.REGISTRATION} address`}
        type={ADDRESS.REGISTRATION}
        countries={countries}
      />
      <div className="col-span-2 row-auto">
        <CheckBoxInput
          name="sameAddresses"
          onChange={handleSameAddress}
          checked={sameAddresses}
          labelStyles="text-black text-xsm"
        >
          The company Registration Address is the same as the Correspondence Address.
        </CheckBoxInput>
      </div>
      {!sameAddresses && (
        <AddressDetails
          title={`Company ${ADDRESS.CORRESPONDENCE} address`}
          type={ADDRESS.CORRESPONDENCE}
          countries={countries}
        />
      )}
    </div>
  );
};

CompanyAddresses.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.shape()),
};

export default CompanyAddresses;
