import { useCallback, useEffect, useRef, useState } from 'react';

import { getAdditionalDischargeOptions } from '@/services/port';

export const useBasinSelection = (setValue, clearErrors, initialData) => {
  const [basins, setBasins] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [expandedBasins, setExpandedBasins] = useState({});

  // Use refs for stable references to props
  const setValueRef = useRef(setValue);
  const clearErrorsRef = useRef(clearErrors);
  const initialDataRef = useRef(initialData);

  // Update refs when props change
  useEffect(() => {
    setValueRef.current = setValue;
    clearErrorsRef.current = clearErrors;
    initialDataRef.current = initialData;
  }, [setValue, clearErrors, initialData]);

  const updateBasins = useCallback((newBasins) => {
    setBasins(newBasins);

    const additionalDischargeOptions = newBasins
      .filter((basin) => basin.subBasins.some((sb) => sb.countries.some((c) => c.selected)))
      .map((basin) => ({
        basinId: basin.id,
        subBasins: basin.subBasins
          .filter((sb) => sb.countries.some((c) => c.selected))
          .map((subBasin) => ({
            id: subBasin.id,
            countryIds: subBasin.countries.filter((country) => country.selected).map((country) => country.id),
          }))
          .filter((sb) => sb.countryIds.length > 0),
      }))
      .filter((basin) => basin.subBasins.length > 0);

    setValueRef.current('additionalDischargeOptions', additionalDischargeOptions, {
      shouldValidate: false,
    });

    if (additionalDischargeOptions.length > 0) {
      clearErrorsRef.current('additionalDischargeOptions');
    }
  }, []); // No dependencies needed as we use refs

  const fetchInitialBasins = useCallback(async () => {
    if (searchLoading) return; // Prevent concurrent fetches

    setSearchLoading(true);
    try {
      const response = await getAdditionalDischargeOptions({ query: '' });
      if (response?.data) {
        const selectedBasinsMap = new Map();
        const selectedSubBasinsMap = new Map();

        initialDataRef.current?.additionalDischargeOptions?.forEach((opt) => {
          selectedBasinsMap.set(opt.basinId, opt);
          opt.subBasins.forEach((subBasin) => {
            selectedSubBasinsMap.set(subBasin.id, subBasin);
          });
        });

        const updatedBasins = response.data.map((basin) => {
          const updatedSubBasins = basin.subBasins.map((subBasin) => {
            const matchingSubBasin = selectedSubBasinsMap.get(subBasin.id);
            const updatedCountries = subBasin.countries.map((country) => ({
              ...country,
              selected: matchingSubBasin?.countryIds.includes(country.id) || false,
            }));

            const hasSelectedCountries = updatedCountries.some((c) => c.selected);
            return {
              ...subBasin,
              selected: hasSelectedCountries && updatedCountries.every((c) => c.selected),
              countries: updatedCountries,
            };
          });

          const hasSelectedSubBasins = updatedSubBasins.some((sb) => sb.countries.some((c) => c.selected));
          return {
            ...basin,
            selected: hasSelectedSubBasins && updatedSubBasins.every((sb) => sb.selected),
            subBasins: updatedSubBasins,
          };
        });

        setBasins(updatedBasins);
        setValueRef.current('additionalDischargeOptions', initialDataRef.current?.additionalDischargeOptions || []);
      }
    } catch (error) {
      console.error('Error fetching initial basins:', error);
    } finally {
      setSearchLoading(false);
    }
  }, []); // No dependencies needed as we use refs

  const searchBasins = useCallback(
    async (query) => {
      if (!query) {
        await fetchInitialBasins();
        return;
      }
      setSearchLoading(true);
      try {
        const response = await getAdditionalDischargeOptions({ query });
        if (response?.data) {
          setBasins(response.data);
        }
      } catch (error) {
        console.error('Error searching basins:', error);
      } finally {
        setSearchLoading(false);
      }
    },
    [fetchInitialBasins]
  );

  const handleBasinChange = useCallback(
    (item, checked, itemType) => {
      const updatedBasins = basins.map((basin) => {
        if (itemType === 'basin' && basin.id === item.id) {
          return {
            ...basin,
            selected: checked,
            subBasins: basin.subBasins.map((sb) => ({
              ...sb,
              selected: checked,
              countries: sb.countries.map((c) => ({
                ...c,
                selected: checked,
              })),
            })),
          };
        }
        if (itemType === 'subBasin' && basin.subBasins.some((sb) => sb.id === item.id)) {
          const updatedSubBasins = basin.subBasins.map((sb) => {
            if (sb.id === item.id) {
              return {
                ...sb,
                selected: checked,
                countries: sb.countries.map((c) => ({
                  ...c,
                  selected: checked,
                })),
              };
            }
            return sb;
          });

          return {
            ...basin,
            subBasins: updatedSubBasins,
            selected: updatedSubBasins.every((sb) => sb.selected),
          };
        }
        if (itemType === 'country') {
          const updatedSubBasins = basin.subBasins.map((sb) => {
            const countryInSubBasin = sb.countries.find((c) => c.id === item.id);
            if (countryInSubBasin && item.subBasinId === sb.id) {
              const updatedCountries = sb.countries.map((c) => ({
                ...c,
                selected: c.id === item.id ? checked : c.selected,
              }));

              return {
                ...sb,
                selected: updatedCountries.every((c) => c.selected),
                countries: updatedCountries,
              };
            }
            return sb;
          });

          return {
            ...basin,
            subBasins: updatedSubBasins,
            selected: updatedSubBasins.every((sb) => sb.selected),
          };
        }
        return basin;
      });

      updateBasins(updatedBasins);
    },
    [basins, updateBasins]
  );

  const resetBasins = useCallback(() => {
    setSearchQuery('');
    const updatedBasins = basins.map((basin) => ({
      ...basin,
      selected: false,
      subBasins: basin.subBasins.map((subBasin) => ({
        ...subBasin,
        selected: false,
        countries: subBasin.countries.map((country) => ({
          ...country,
          selected: false,
        })),
      })),
    }));
    updateBasins(updatedBasins);
    setValueRef.current('additionalDischargeOptions', []);
  }, [basins, updateBasins]);

  return {
    basins,
    searchQuery,
    searchLoading,
    expandedBasins,
    setExpandedBasins,
    setSearchQuery,
    handleBasinChange,
    searchBasins,
    fetchInitialBasins,
    resetBasins,
  };
};
