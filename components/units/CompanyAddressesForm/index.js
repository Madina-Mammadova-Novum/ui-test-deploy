'use client';

import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { CheckBoxInput } from '@/elements';
import { getCountries } from '@/services';
import { AddressDetails } from '@/units';

const CompanyAddresses = () => {
  const { setValue } = useFormContext();
  const [countries, setCountries] = useState([]);
  const [showCorrespondenceAddress, setShowCorrespondenceAddress] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getCountries();
      const countriesOptions = data?.map(({ countryId, countryName }) => {
        return { value: countryId, label: countryName };
      });
      setCountries(countriesOptions);
    })();
  }, []);

  const handleSameAddress = (event) => {
    const { checked } = event.target;
    setShowCorrespondenceAddress(!checked);
  };

  setValue('sameAddresses', !showCorrespondenceAddress);

  return (
    <div className="flex flex-col gap-5">
      <AddressDetails title="Company registration address" type="registration" countries={countries} />
      <div className="col-span-2 row-auto">
        <CheckBoxInput
          name="sameAddresses"
          onChange={handleSameAddress}
          checked={!showCorrespondenceAddress}
          labelStyles="text-black text-xsm"
        >
          The company Registration Address is the same as the Correspondence Address.
        </CheckBoxInput>
      </div>
      {showCorrespondenceAddress && (
        <AddressDetails title="Сompany registration address" type="correspondence" countries={countries} />
      )}
    </div>
  );
};

export default CompanyAddresses;
