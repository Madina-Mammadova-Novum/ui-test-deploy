'use client';

import { useEffect, useState } from 'react';

import { CheckBoxInput } from '@/elements';
import { ADDRESS } from '@/lib/constants';
import { getCountries } from '@/services';
import { AddressDetails } from '@/units';
import { countriesOptions } from '@/utils/helpers';
import { useHookForm } from '@/utils/hooks';

const CompanyAddresses = () => {
  const { setValue, getValues } = useHookForm();
  const [countries, setCountries] = useState([]);

  const { sameAddresses } = getValues();

  console.log(getValues());

  const handleSameAddress = (event) => {
    const { checked } = event.target;
    setValue('sameAddresses', checked);
  };

  const fetchCountries = async () => {
    const data = await getCountries();
    const options = countriesOptions(data);
    setCountries(options);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

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

export default CompanyAddresses;
