import { useCallback, useEffect, useRef, useState } from 'react';

import { getAdditionalDischargeOptions } from '@/services/port';

export const useBasinSelection = (setValue, clearErrors, initialData, isCounteroffer = false) => {
  const [basins, setBasins] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(true);
  const [expandedBasins, setExpandedBasins] = useState({});
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [initialBasins, setInitialBasins] = useState([]);

  // Use refs for stable references to props
  const setValueRef = useRef(setValue);
  const clearErrorsRef = useRef(clearErrors);
  const initialDataRef = useRef(initialData);
  const isCounterofferRef = useRef(isCounteroffer);

  // Update refs when props change
  useEffect(() => {
    setValueRef.current = setValue;
    clearErrorsRef.current = clearErrors;
    initialDataRef.current = initialData;
    isCounterofferRef.current = isCounteroffer;
  }, [setValue, clearErrors, initialData, isCounteroffer]);

  const updateBasins = useCallback(
    (newBasins) => {
      setBasins(newBasins);

      // Update initialBasins with new selections
      const updatedInitialBasins = initialBasins.map((basin) => {
        const matchingBasin = newBasins.find((b) => b.id === basin.id);
        if (!matchingBasin) return basin;

        return {
          ...basin,
          selected: matchingBasin.selected,
          subBasins: basin.subBasins.map((sb) => {
            const matchingSubBasin = matchingBasin.subBasins.find((msb) => msb.id === sb.id);
            if (!matchingSubBasin) return sb;

            return {
              ...sb,
              selected: matchingSubBasin.selected,
              countries: sb.countries.map((country) => {
                const matchingCountry = matchingSubBasin.countries.find((mc) => mc.id === country.id);
                if (!matchingCountry) return country;

                return {
                  ...country,
                  selected: matchingCountry.selected,
                  ports: (country.ports || []).map((port) => {
                    const matchingPort = (matchingCountry.ports || []).find((mp) => mp.id === port.id);
                    if (!matchingPort) return port;

                    return {
                      ...port,
                      selected: matchingPort.selected,
                    };
                  }),
                };
              }),
            };
          }),
        };
      });

      setInitialBasins(updatedInitialBasins);

      // Calculate selections using updated initialBasins
      const allBasinsSelected = updatedInitialBasins.every((basin) =>
        basin.subBasins.every((sb) => sb.countries.every((c) => (c.ports || []).every((p) => p.selected)))
      );

      setIsAllSelected(allBasinsSelected);

      const selectedBasins = updatedInitialBasins
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
          selected: allBasinsSelected ? [] : selectedBasins,
        },
        {
          shouldValidate: false,
        }
      );

      if (allBasinsSelected || selectedBasins.length > 0) {
        clearErrorsRef.current('additionalDischargeOptions');
      }
    },
    [initialBasins]
  );

  const handleSelectAll = useCallback(
    (checked) => {
      if (isCounterofferRef.current) return;

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
        const initialOptions = initialDataRef.current?.additionalDischargeOptions?.selected || [];

        const shouldSelectAll = initialDataRef.current?.additionalDischargeOptions?.isAllSelected || false;

        initialOptions?.forEach((opt) => {
          selectedBasinsMap.set(opt.id, opt);
          opt.subBasins.forEach((subBasin) => {
            selectedSubBasinsMap.set(subBasin.id, subBasin);
          });
        });

        // Filter and process the basins
        let updatedBasins = response.data
          .filter((basin) => basin?.subBasins?.length > 0)
          .map((basin) => {
            const updatedSubBasins = basin.subBasins
              .filter((subBasin) => subBasin?.countries?.length > 0)
              .map((subBasin) => {
                const matchingSubBasin = selectedSubBasinsMap.get(subBasin.id);
                const updatedCountries = subBasin.countries
                  .filter((country) => country?.ports?.length > 0)
                  .map((country) => {
                    const matchingCountry = matchingSubBasin?.countries?.find((c) => c.id === country.id);
                    const isSelected = shouldSelectAll || !!matchingCountry;
                    return {
                      ...country,
                      selected: isSelected,
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
              })
              .filter((subBasin) => subBasin.countries.length > 0);

            const hasSelectedSubBasins = updatedSubBasins.some((sb) =>
              sb.countries.some((c) => c.selected || (c.ports || []).some((p) => p.selected))
            );
            return {
              ...basin,
              selected: hasSelectedSubBasins && updatedSubBasins.every((sb) => sb.selected),
              subBasins: updatedSubBasins,
            };
          })
          .filter((basin) => basin.subBasins.length > 0);

        // If it's a counteroffer, filter basins to only show those from initialData
        if (isCounterofferRef.current && initialOptions?.length > 0) {
          updatedBasins = updatedBasins
            .map((basin) => {
              const matchingBasin = selectedBasinsMap.get(basin.id);
              if (!matchingBasin) return null;

              return {
                ...basin,
                subBasins: basin.subBasins
                  .map((subBasin) => {
                    const matchingSubBasin = matchingBasin.subBasins.find((sb) => sb.id === subBasin.id);
                    if (!matchingSubBasin) return null;

                    return {
                      ...subBasin,
                      countries: subBasin.countries
                        .map((country) => {
                          const matchingCountry = matchingSubBasin.countries.find((c) => c.id === country.id);
                          if (!matchingCountry) return null;

                          return {
                            ...country,
                            ports: (country.ports || [])
                              .map((port) => {
                                const isPortSelected = matchingCountry.ports?.some((p) => p.id === port.id);
                                return isPortSelected ? { ...port, selected: true } : null;
                              })
                              .filter(Boolean),
                          };
                        })
                        .filter(Boolean),
                    };
                  })
                  .filter(Boolean),
              };
            })
            .filter((basin) => basin && basin.subBasins.length > 0);
        }

        setBasins(updatedBasins);
        setInitialBasins(updatedBasins);
        setIsAllSelected(shouldSelectAll);

        setValueRef.current('additionalDischargeOptions', {
          isAllSelected: shouldSelectAll,
          selected: shouldSelectAll ? [] : initialOptions,
        });
      }
    } catch (error) {
      console.error('Error fetching initial basins:', error);
    } finally {
      setSearchLoading(false);
    }
  }, []); // No dependencies needed as we use refs

  const recalculateParentStates = useCallback((filteredBasins) => {
    return filteredBasins.map((basin) => {
      const updatedSubBasins = basin.subBasins.map((subBasin) => {
        // For each country in the sub-basin, check if all its visible ports are selected
        const updatedCountries = subBasin.countries.map((country) => ({
          ...country,
          selected: country.ports?.length > 0 && country.ports?.every((port) => port.selected),
        }));

        // Check if all visible countries in this sub-basin are selected
        return {
          ...subBasin,
          countries: updatedCountries,
          selected: subBasin.countries.length > 0 && updatedCountries.every((country) => country.selected),
        };
      });

      // Check if all visible sub-basins are selected
      return {
        ...basin,
        subBasins: updatedSubBasins,
        selected: basin.subBasins.length > 0 && updatedSubBasins.every((subBasin) => subBasin.selected),
      };
    });
  }, []);

  const searchBasins = useCallback(
    (query) => {
      if (!query) {
        const updatedBasins = recalculateParentStates(initialBasins);
        setBasins(updatedBasins);
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

                  // Keep selection state even if not matched
                  if (matchedPorts.length > 0 || country.name.toLowerCase().includes(searchTerm)) {
                    return {
                      ...country,
                      ports: matchedPorts.length > 0 ? matchedPorts : country.ports,
                      selected: country.selected, // Preserve selection
                    };
                  }
                  return null;
                })
                .filter(Boolean)
                .filter((country) => country.ports?.length > 0);

              // Keep selection state even if not matched
              if (matchedCountries.length > 0 || subBasin.name.toLowerCase().includes(searchTerm)) {
                return {
                  ...subBasin,
                  countries: matchedCountries,
                  selected: subBasin.selected, // Preserve selection
                };
              }
              return null;
            })
            .filter(Boolean)
            .filter((subBasin) => subBasin.countries?.length > 0);

          // Keep selection state even if not matched
          if (matchedSubBasins.length > 0 || basin.name.toLowerCase().includes(searchTerm)) {
            return {
              ...basin,
              subBasins: matchedSubBasins,
              selected: basin.selected, // Preserve selection
            };
          }
          return null;
        })
        .filter(Boolean)
        .filter((basin) => basin.subBasins?.length > 0);

      // Recalculate parent states based on visible children while preserving selections
      const updatedBasins = recalculateParentStates(filteredBasins);
      setBasins(updatedBasins);
    },
    [initialBasins, recalculateParentStates]
  );

  const handleBasinChange = useCallback(
    (item, checked, itemType) => {
      // Function to update initialBasins state
      const updateInitialBasinsState = (updateFn) => {
        setInitialBasins((prevInitialBasins) => {
          const updatedInitialBasins = updateFn(prevInitialBasins);
          return updatedInitialBasins;
        });
      };

      // During search, we need to update both visible basins and initial basins
      const updatedBasins = basins.map((basin) => {
        if (itemType === 'basin' && basin.id === item.id) {
          // Update the clicked basin and all its children
          const updatedBasin = {
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

          // Update the same basin in initialBasins
          updateInitialBasinsState((prevBasins) =>
            prevBasins.map((b) =>
              b.id === basin.id
                ? {
                    ...b,
                    selected: checked,
                    subBasins: b.subBasins.map((sb) => ({
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
                  }
                : b
            )
          );

          return updatedBasin;
        }
        if (itemType === 'subBasin' && basin.subBasins.some((sb) => sb.id === item.id)) {
          const updatedSubBasins = basin.subBasins.map((sb) => {
            if (sb.id === item.id) {
              const updatedSubBasin = {
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

              // Update the same subBasin in initialBasins
              updateInitialBasinsState((prevBasins) =>
                prevBasins.map((b) => ({
                  ...b,
                  subBasins: b.subBasins.map((subB) =>
                    subB.id === item.id
                      ? {
                          ...subB,
                          selected: checked,
                          countries: subB.countries.map((c) => ({
                            ...c,
                            selected: checked,
                            ports: (c.ports || []).map((port) => ({
                              ...port,
                              selected: checked,
                            })),
                          })),
                        }
                      : subB
                  ),
                }))
              );

              return updatedSubBasin;
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
            if (sb.id === item.subBasinId) {
              const updatedCountries = sb.countries.map((c) => {
                if (c.id === item.id) {
                  const updatedCountry = {
                    ...c,
                    selected: checked,
                    ports: (c.ports || []).map((port) => ({
                      ...port,
                      selected: checked,
                    })),
                  };

                  // Update the same country in initialBasins
                  updateInitialBasinsState((prevBasins) =>
                    prevBasins.map((b) => ({
                      ...b,
                      subBasins: b.subBasins.map((subB) => ({
                        ...subB,
                        countries:
                          subB.id === item.subBasinId
                            ? subB.countries.map((country) =>
                                country.id === item.id
                                  ? {
                                      ...country,
                                      selected: checked,
                                      ports: (country.ports || []).map((port) => ({
                                        ...port,
                                        selected: checked,
                                      })),
                                    }
                                  : country
                              )
                            : subB.countries,
                      })),
                    }))
                  );

                  return updatedCountry;
                }
                return c;
              });

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
                const updatedPorts = (c.ports || []).map((port) =>
                  port.id === item.id ? { ...port, selected: checked } : port
                );

                // Update the same port in initialBasins
                updateInitialBasinsState((prevBasins) =>
                  prevBasins.map((b) => ({
                    ...b,
                    subBasins: b.subBasins.map((subB) => ({
                      ...subB,
                      countries: subB.countries.map((country) => ({
                        ...country,
                        ports:
                          country.id === item.countryId
                            ? (country.ports || []).map((p) => (p.id === item.id ? { ...p, selected: checked } : p))
                            : country.ports,
                      })),
                    })),
                  }))
                );

                // Check if all ports are selected to update country state
                const allPortsSelected = updatedPorts.every((p) => p.selected);

                return {
                  ...c,
                  selected: allPortsSelected,
                  ports: updatedPorts,
                };
              }
              return c;
            });

            // Update sub-basin selected state based on countries
            const allCountriesSelected = updatedCountries.every(
              (c) => c.selected || (c.ports || []).every((p) => p.selected)
            );

            return {
              ...sb,
              selected: allCountriesSelected,
              countries: updatedCountries,
            };
          });

          // Update basin selected state based on sub-basins
          return {
            ...basin,
            selected: updatedSubBasins.every((sb) => sb.selected),
            subBasins: updatedSubBasins,
          };
        }
        return basin;
      });

      // After updating selections, recalculate parent states
      const finalBasins = recalculateParentStates(updatedBasins);
      updateBasins(finalBasins);
    },
    [basins, updateBasins, recalculateParentStates]
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
      selected: [],
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
