'use client';

import { useEffect, useState } from 'react';

import { CheckBoxInput } from '@/elements';
import { getCountries } from '@/services';
import { AddressDetails } from '@/units';
import { useHookForm } from '@/utils/hooks';

const CompanyAddresses = () => {
  const { setValue, watch } = useHookForm();
  const [countries, setCountries] = useState([]);

  const correspondenceAddress = watch('sameAddresses', true);

  useEffect(() => {
    (async () => {
      const data = await getCountries();
      const countriesOptions = data.map(({ countryId, countryName }) => {
        // todo: why you did it 'data?'. if we don't have some countries we need notify about that
        return { value: countryId, label: countryName };
      });
      setCountries(countriesOptions);
    })();
  }, []);

  const handleSameAddress = (event) => {
    const { checked } = event.target;
    setValue('sameAddresses', checked);
  };

  return (
    <div className="flex flex-col gap-5">
      <AddressDetails title="Company registration address" type="registration" countries={countries} />
      <div className="col-span-2 row-auto">
        <CheckBoxInput
          name="sameAddresses"
          onChange={handleSameAddress}
          checked={correspondenceAddress}
          labelStyles="text-black text-xsm"
        >
          The company Registration Address is the same as the Correspondence Address.
        </CheckBoxInput>
      </div>
      {!correspondenceAddress && (
        <AddressDetails title="Сompany correspondence address" type="correspondence" countries={countries} />
      )}
    </div>
  );
};

export default CompanyAddresses;
