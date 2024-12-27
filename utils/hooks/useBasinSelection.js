import { useCallback, useEffect, useRef, useState } from 'react';

import { getAdditionalDischargeOptions } from '@/services/port';

export const useBasinSelection = (setValue, clearErrors, initialData) => {
  const [basins, setBasins] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [expandedBasins, setExpandedBasins] = useState({});
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [initialBasins, setInitialBasins] = useState([]);

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

    // Check if all basins are selected
    const allBasinsSelected = newBasins.every((basin) =>
      basin.subBasins.every((sb) => sb.countries.every((c) => (c.ports || []).every((p) => p.selected)))
    );

    setIsAllSelected(allBasinsSelected);

    const selectedBasins = newBasins
      .filter((basin) =>
        basin.subBasins.some((sb) => sb.countries.some((c) => c.selected || (c.ports || []).some((p) => p.selected)))
      )
      .map((basin) => ({
        id: basin.id,
        name: basin.name,
        subBasins: basin.subBasins
          .filter((sb) => sb.countries.some((c) => c.selected || (c.ports || []).some((p) => p.selected)))
          .map((subBasin) => ({
            id: subBasin.id,
            name: subBasin.name,
            countries: subBasin.countries
              .filter((country) => country.selected || (country.ports || []).some((p) => p.selected))
              .map((country) => ({
                id: country.id,
                name: country.name,
                codeISO2: country.codeISO2,
                ports: (country.ports || [])
                  .filter((port) => port.selected)
                  .map((port) => ({
                    id: port.id,
                    name: port.name,
                  })),
              })),
          })),
      }));

    setValueRef.current(
      'additionalDischargeOptions',
      {
        isAllSelected: allBasinsSelected,
        basins: allBasinsSelected ? [] : selectedBasins,
      },
      {
        shouldValidate: false,
      }
    );

    if (allBasinsSelected || selectedBasins.length > 0) {
      clearErrorsRef.current('additionalDischargeOptions');
    }
  }, []); // No dependencies needed as we use refs

  const handleSelectAll = useCallback(
    (checked) => {
      const updatedBasins = basins.map((basin) => ({
        ...basin,
        selected: checked,
        subBasins: basin.subBasins.map((sb) => ({
          ...sb,
          selected: checked,
          countries: sb.countries.map((c) => ({
            ...c,
            selected: checked,
            ports: (c.ports || []).map((port) => ({
              ...port,
              selected: checked,
            })),
          })),
        })),
      }));

      updateBasins(updatedBasins);
    },
    [basins, updateBasins]
  );

  const fetchInitialBasins = useCallback(async () => {
    setSearchLoading(true);
    try {
      const response = await getAdditionalDischargeOptions({ query: '' });
      if (response?.data) {
        const selectedBasinsMap = new Map();
        const selectedSubBasinsMap = new Map();

        // Handle both old array format and new object format
        const initialOptions =
          initialDataRef.current?.additionalDischargeOptions?.basins ||
          initialDataRef.current?.additionalDischargeOptions ||
          [];

        const shouldSelectAll = initialDataRef.current?.additionalDischargeOptions?.isAllSelected || false;

        initialOptions.forEach((opt) => {
          selectedBasinsMap.set(opt.id, opt);
          opt.subBasins.forEach((subBasin) => {
            selectedSubBasinsMap.set(subBasin.id, subBasin);
          });
        });

        const updatedBasins = response.data.map((basin) => {
          const updatedSubBasins = basin.subBasins.map((subBasin) => {
            const matchingSubBasin = selectedSubBasinsMap.get(subBasin.id);
            const updatedCountries = subBasin.countries.map((country) => {
              const matchingCountry = matchingSubBasin?.countries?.find((c) => c.id === country.id);
              return {
                ...country,
                selected: shouldSelectAll || !!matchingCountry,
                ports: (country.ports || []).map((port) => ({
                  ...port,
                  selected: shouldSelectAll || matchingCountry?.ports?.some((p) => p.id === port.id) || false,
                })),
              };
            });

            const hasSelectedCountries = updatedCountries.some(
              (c) => c.selected || (c.ports || []).some((p) => p.selected)
            );
            return {
              ...subBasin,
              selected: hasSelectedCountries && updatedCountries.every((c) => c.selected),
              countries: updatedCountries,
            };
          });

          const hasSelectedSubBasins = updatedSubBasins.some((sb) =>
            sb.countries.some((c) => c.selected || (c.ports || []).some((p) => p.selected))
          );
          return {
            ...basin,
            selected: hasSelectedSubBasins && updatedSubBasins.every((sb) => sb.selected),
            subBasins: updatedSubBasins,
          };
        });

        setBasins(updatedBasins);
        setInitialBasins(updatedBasins);
        setIsAllSelected(shouldSelectAll);

        setValueRef.current('additionalDischargeOptions', {
          isAllSelected: shouldSelectAll,
          basins: shouldSelectAll ? [] : initialOptions,
        });
      }
    } catch (error) {
      console.error('Error fetching initial basins:', error);
    } finally {
      setSearchLoading(false);
    }
  }, []); // No dependencies needed as we use refs

  const searchBasins = useCallback(
    (query) => {
      if (!query) {
        setBasins(initialBasins);
        return;
      }

      const searchTerm = query.toLowerCase();
      const filteredBasins = initialBasins
        .map((basin) => {
          if (!basin?.name) return null;

          const matchedSubBasins = (basin.subBasins || [])
            .map((subBasin) => {
              if (!subBasin?.name) return null;

              const matchedCountries = (subBasin.countries || [])
                .map((country) => {
                  if (!country?.name) return null;

                  const matchedPorts = (country.ports || []).filter((port) =>
                    port?.name?.toLowerCase().includes(searchTerm)
                  );

                  if (matchedPorts.length > 0 || country.name.toLowerCase().includes(searchTerm)) {
                    return {
                      ...country,
                      ports: matchedPorts.length > 0 ? matchedPorts : country.ports,
                    };
                  }
                  return null;
                })
                .filter(Boolean);

              if (matchedCountries.length > 0 || subBasin.name.toLowerCase().includes(searchTerm)) {
                return {
                  ...subBasin,
                  countries: matchedCountries,
                };
              }
              return null;
            })
            .filter(Boolean);

          if (matchedSubBasins.length > 0 || basin.name.toLowerCase().includes(searchTerm)) {
            return {
              ...basin,
              subBasins: matchedSubBasins,
            };
          }
          return null;
        })
        .filter(Boolean);

      setBasins(filteredBasins);
    },
    [initialBasins]
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
                ports: (c.ports || []).map((port) => ({
                  ...port,
                  selected: checked,
                })),
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
                  ports: (c.ports || []).map((port) => ({
                    ...port,
                    selected: checked,
                  })),
                })),
              };
            }
            return sb;
          });

          return {
            ...basin,
            selected: updatedSubBasins.every((sb) => sb.selected),
            subBasins: updatedSubBasins,
          };
        }
        if (itemType === 'country') {
          const updatedSubBasins = basin.subBasins.map((sb) => {
            const countryInSubBasin = sb.countries.find((c) => c.id === item.id);
            if (countryInSubBasin && item.subBasinId === sb.id) {
              const updatedCountries = sb.countries.map((c) => ({
                ...c,
                selected: c.id === item.id ? checked : c.selected,
                ports: (c.ports || []).map((port) => ({
                  ...port,
                  selected: c.id === item.id ? checked : port.selected,
                })),
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
            selected: updatedSubBasins.every((sb) => sb.selected),
            subBasins: updatedSubBasins,
          };
        }
        if (itemType === 'port') {
          const updatedSubBasins = basin.subBasins.map((sb) => {
            const updatedCountries = sb.countries.map((c) => {
              if (c.id === item.countryId) {
                const updatedPorts = (c.ports || []).map((port) => ({
                  ...port,
                  selected: port.id === item.id ? checked : port.selected,
                }));
                const allPortsSelected = updatedPorts.every((p) => p.selected);
                return {
                  ...c,
                  selected: allPortsSelected,
                  ports: updatedPorts,
                };
              }
              return c;
            });

            return {
              ...sb,
              countries: updatedCountries,
            };
          });

          return {
            ...basin,
            subBasins: updatedSubBasins,
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
    setIsAllSelected(false);
    setSearchLoading(true);
    const updatedBasins = basins.map((basin) => ({
      ...basin,
      selected: false,
      subBasins: basin.subBasins.map((subBasin) => ({
        ...subBasin,
        selected: false,
        countries: subBasin.countries.map((country) => ({
          ...country,
          selected: false,
          ports: (country.ports || []).map((port) => ({
            ...port,
            selected: false,
          })),
        })),
      })),
    }));
    updateBasins(updatedBasins);
    setValueRef.current('additionalDischargeOptions', {
      isAllSelected: false,
      basins: [],
    });
    setSearchLoading(false);
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
    isAllSelected,
    handleSelectAll,
  };
};
