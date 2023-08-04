import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { FLEETS } from '@/store/entities/fleets/types';

/* Services */
import { vesselDetailsAdapter } from '@/adapters/vessel';
import { getCountries , getUserFleets } from '@/services';
import { getPorts } from '@/services/port';
import { getFleetsVessels, getUnassignedVessels, getVesselDetails, getVesselTypes } from '@/services/vessel';
import { convertDataToOptions, countriesOptions } from '@/utils/helpers';

export const fetchFleetsWithVessels = (() => {
  return createAsyncThunk(FLEETS.GET_USER_FLEETS, async () => {
    const { data } = await getUserFleets();
    const generator = getFleetsVessels(data);
    const { value } = generator.next();

    return {
      data: await value,
    };
  });
})();

export const fetchUnassignedFleetData = createAsyncThunk(FLEETS.GET_UNASSIGNED_FLEET_DATA, async () => {
  const { data } = await getUnassignedVessels();

  return {
    data,
  };
});

export const fetchPrefilledDataToUpdate = createAsyncThunk(FLEETS.GET_PREFILLED_UPDATE_DATA, async (vesselId) => {
  const [tankerTypesResponse, countriesResponse, portsResponse, vesselDetailsResponse] = await Promise.all([
    getVesselTypes(),
    getCountries(),
    getPorts(),
    getVesselDetails(vesselId),
  ]);

  const { data: tankerTypesData = [] } = tankerTypesResponse;
  const { data: countriesData = [] } = countriesResponse;
  const { data: portsData = [] } = portsResponse;
  const { data: vesselDetailsData = {} } = vesselDetailsResponse;

  const adaptedTankerTypes = convertDataToOptions({ data: tankerTypesData }, 'id', 'name');
  const adaptedCountries = countriesOptions(countriesData);
  const adaptedPorts = countriesOptions(portsData);
  const adaptedVesselDetails = vesselDetailsAdapter({ data: vesselDetailsData });
  let validPrefilledOptions = {};

  const validPortOfRegistryOption = adaptedPorts.find(
    ({ value }) => value === adaptedVesselDetails.portOfRegistry.value
  );
  const validTankerTypeOption = adaptedTankerTypes.find(({ value }) => value === adaptedVesselDetails.tankerType.value);
  const validRegisteredOwnerCountryOption = adaptedCountries.find(
    ({ value }) => value === adaptedVesselDetails.registeredOwnerCountry.value
  );
  const validTechnicalOperatorCountryOption = adaptedCountries.find(
    ({ value }) => value === adaptedVesselDetails.technicalOperatorCountry.value
  );
  const validCommercialOperatorCountryOption = adaptedCountries.find(
    ({ value }) => value === adaptedVesselDetails.commercialOperatorCountry.value
  );
  const validDisponentOwnerCountryOption = adaptedCountries.find(
    ({ value }) => value === adaptedVesselDetails.disponentOwnerCountry?.value
  );

  validPrefilledOptions = {
    portOfRegistry: validPortOfRegistryOption,
    tankerType: validTankerTypeOption,
    registeredOwnerCountry: validRegisteredOwnerCountryOption,
    technicalOperatorCountry: validTechnicalOperatorCountryOption,
    commercialOperatorCountry: validCommercialOperatorCountryOption,
    disponentOwnerCountry: validDisponentOwnerCountryOption,
  };

  return {
    data: {
      ...adaptedVesselDetails,
      ...validPrefilledOptions,
    },
    ports: countriesOptions(portsData),
    countries: countriesOptions(countriesData),
    tankerTypes: convertDataToOptions({ data: tankerTypesData }, 'id', 'name'),
  };
});
