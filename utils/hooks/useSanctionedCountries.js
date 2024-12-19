import { useCallback, useEffect, useRef, useState } from 'react';

import { getCountries } from '@/services/country';
import { countriesOptions } from '@/utils/helpers';

export const useSanctionedCountries = (setValue, initialData) => {
  const [countries, setCountries] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(false);

  // Use refs for stable references to props
  const setValueRef = useRef(setValue);
  const initialDataRef = useRef(initialData);

  // Update refs when props change
  useEffect(() => {
    setValueRef.current = setValue;
    initialDataRef.current = initialData;
  }, [setValue, initialData]);

  const handleCountryChange = useCallback((selectedOptions) => {
    const options = selectedOptions || [];
    setValueRef.current('excludedCountries', options);
    setValueRef.current(
      'sanctionedCountryIds',
      options.map((option) => option.value)
    );
  }, []); // No dependencies needed as we use refs

  const handleSanctionCheckboxChange = useCallback((e) => {
    setValueRef.current('excludeInternationallySanctioned', e.target.checked);
  }, []); // No dependencies needed as we use refs

  const fetchCountries = useCallback(async () => {
    if (countriesLoading) return; // Prevent concurrent fetches

    setCountriesLoading(true);
    try {
      const { data } = await getCountries();
      if (data) {
        const formattedCountries = countriesOptions(data);
        setCountries(formattedCountries);

        const { sanctionedCountryIds } = initialDataRef.current || {};
        if (sanctionedCountryIds?.length > 0) {
          const initialSelectedCountries = sanctionedCountryIds
            .map((id) => formattedCountries.find((country) => country.value === id))
            .filter(Boolean);

          setValueRef.current('excludedCountries', initialSelectedCountries);
          setValueRef.current('sanctionedCountryIds', sanctionedCountryIds);
        }
      }
    } catch (error) {
      console.error('Error fetching countries:', error);
    } finally {
      setCountriesLoading(false);
    }
  }, []); // No dependencies needed as we use refs

  const resetSanctionedCountries = useCallback(() => {
    setValueRef.current('sanctionedCountryIds', []);
    setValueRef.current('excludedCountries', []);
    setValueRef.current('excludeInternationallySanctioned', false);
  }, []); // No dependencies needed as we use refs

  return {
    countries,
    countriesLoading,
    handleCountryChange,
    handleSanctionCheckboxChange,
    fetchCountries,
    resetSanctionedCountries,
  };
};
