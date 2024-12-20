import PropTypes from 'prop-types';

import { OfferDetailsPropTypes } from '@/lib/types';

import { TextRow, Title } from '@/elements';
import { COTTabContent, Flag, VoyageDetailsTabContent } from '@/units';

// Mock data structure - In real implementation, this would come from the API
const mockAdditionalDischargeData = {
  basins: [
    {
      id: 'med',
      name: 'Mediterranean',
      selected: true,
      subBasins: [
        {
          id: 'east_med',
          name: 'East Mediterranean',
          selected: true,
          countries: [
            { id: 'gr', name: 'Greece', codeISO2: 'GR', selected: true },
            { id: 'tr', name: 'Turkey', codeISO2: 'TR', selected: true },
            { id: 'cy', name: 'Cyprus', codeISO2: 'CY', selected: true },
            { id: 'lb', name: 'Lebanon', codeISO2: 'LB', selected: true },
            { id: 'il', name: 'Israel', codeISO2: 'IL', selected: true },
          ],
        },
        {
          id: 'west_med',
          name: 'West Mediterranean',
          selected: true,
          countries: [
            { id: 'es', name: 'Spain', codeISO2: 'ES', selected: true },
            { id: 'fr', name: 'France', codeISO2: 'FR', selected: true },
            { id: 'it', name: 'Italy', codeISO2: 'IT', selected: true },
            { id: 'mt', name: 'Malta', codeISO2: 'MT', selected: true },
          ],
        },
        {
          id: 'central_med',
          name: 'Central Mediterranean',
          selected: true,
          countries: [
            { id: 'it', name: 'Italy', codeISO2: 'IT', selected: true },
            { id: 'mt', name: 'Malta', codeISO2: 'MT', selected: true },
            { id: 'tn', name: 'Tunisia', codeISO2: 'TN', selected: true },
            { id: 'ly', name: 'Libya', codeISO2: 'LY', selected: true },
          ],
        },
      ],
    },
    {
      id: 'black',
      name: 'Black Sea',
      selected: true,
      subBasins: [
        {
          id: 'west_black',
          name: 'West Black Sea',
          selected: true,
          countries: [
            { id: 'bg', name: 'Bulgaria', codeISO2: 'BG', selected: true },
            { id: 'ro', name: 'Romania', codeISO2: 'RO', selected: true },
            { id: 'tr', name: 'Turkey', codeISO2: 'TR', selected: true },
          ],
        },
        {
          id: 'east_black',
          name: 'East Black Sea',
          selected: true,
          countries: [
            { id: 'ge', name: 'Georgia', codeISO2: 'GE', selected: true },
            { id: 'tr', name: 'Turkey', codeISO2: 'TR', selected: true },
          ],
        },
      ],
    },
    {
      id: 'baltic',
      name: 'Baltic Sea',
      selected: true,
      subBasins: [
        {
          id: 'north_baltic',
          name: 'North Baltic',
          selected: true,
          countries: [
            { id: 'se', name: 'Sweden', codeISO2: 'SE', selected: true },
            { id: 'fi', name: 'Finland', codeISO2: 'FI', selected: true },
            { id: 'ee', name: 'Estonia', codeISO2: 'EE', selected: true },
          ],
        },
        {
          id: 'south_baltic',
          name: 'South Baltic',
          selected: true,
          countries: [
            { id: 'pl', name: 'Poland', codeISO2: 'PL', selected: true },
            { id: 'de', name: 'Germany', codeISO2: 'DE', selected: true },
            { id: 'lt', name: 'Lithuania', codeISO2: 'LT', selected: true },
            { id: 'lv', name: 'Latvia', codeISO2: 'LV', selected: true },
          ],
        },
      ],
    },
  ],
  excludedCountries: [
    { id: 'ru', name: 'Russia', codeISO2: 'RU' },
    { id: 'ir', name: 'Iran', codeISO2: 'IR' },
    { id: 'sy', name: 'Syria', codeISO2: 'SY' },
    { id: 've', name: 'Venezuela', codeISO2: 'VE' },
  ],
  sanctionedCountries: [
    { countryId: 'ru', countryName: 'Russia', countryCode: 'RU' },
    { countryId: 'ir', countryName: 'Iran', countryCode: 'IR' },
    { countryId: 'sy', countryName: 'Syria', countryCode: 'SY' },
    { countryId: 've', countryName: 'Venezuela', countryCode: 'VE' },
  ],
  excludeInternationallySanctioned: true,
};

const CountryShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  codeISO2: PropTypes.string.isRequired,
  selected: PropTypes.bool,
});

const SubBasinShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  countries: PropTypes.arrayOf(CountryShape),
});

const BasinShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  subBasins: PropTypes.arrayOf(SubBasinShape),
  countries: PropTypes.arrayOf(CountryShape),
});

const AdditionalDischargeDetails = ({ data = mockAdditionalDischargeData }) => {
  const renderBasin = (basin) => {
    return (
      <div key={basin.id}>
        <Title level="5" className="text-[12px] font-semibold uppercase text-gray">
          {basin.name}
        </Title>
        <div className="mt-2.5">
          {basin.subBasins?.map((subBasin) => (
            <div key={subBasin.id} className="mb-2.5">
              <TextRow title={subBasin.name}>
                <div className="flex flex-wrap gap-x-4">
                  {subBasin.countries?.map((country) => (
                    <div key={country.id} className="flex items-center">
                      <Flag countryCode={country.codeISO2} className="mr-1.5" />
                      {country.name}
                    </div>
                  ))}
                </div>
              </TextRow>
            </div>
          ))}
          {basin.countries?.map((country) => (
            <TextRow key={country.id} title={country.name}>
              <Flag countryCode={country.codeISO2} className="mr-1.5" />
              {country.name}
            </TextRow>
          ))}
        </div>
        <hr className="my-4" />
      </div>
    );
  };

  return (
    <div className="text-xsm">
      <Title level="3">Additional Discharge Options</Title>

      <div className="mt-2.5">{data.basins.map((basin, index) => renderBasin(basin, index, data.basins.length))}</div>

      {(data.excludedCountries?.length > 0 || data.excludeInternationallySanctioned) && (
        <div className="mt-2.5">
          <Title level="5" className="text-[12px] font-semibold uppercase text-gray">
            Excluded Areas
          </Title>

          <div className="mt-2.5">
            {data.excludedCountries?.length > 0 && (
              <TextRow title="Specific Countries">
                <div className="flex flex-wrap gap-x-4">
                  {data.excludedCountries.map((country) => (
                    <div key={country.id} className="flex items-center">
                      <Flag countryCode={country.codeISO2} className="mr-1.5" />
                      {country.name}
                    </div>
                  ))}
                </div>
              </TextRow>
            )}

            {data.excludeInternationallySanctioned && (
              <TextRow title="Sanctioned">Internationally sanctioned countries are excluded</TextRow>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

AdditionalDischargeDetails.propTypes = {
  data: PropTypes.shape({
    basins: PropTypes.arrayOf(BasinShape).isRequired,
    excludedCountries: PropTypes.arrayOf(CountryShape),
    excludeInternationallySanctioned: PropTypes.bool,
  }),
};

const OfferDetails = ({ voyageDetails, commercialOfferTerms }) => {
  return (
    <div className="flex flex-col gap-y-5 py-4">
      <VoyageDetailsTabContent data={voyageDetails} />
      <AdditionalDischargeDetails />
      <COTTabContent data={commercialOfferTerms} />
    </div>
  );
};

OfferDetails.propTypes = OfferDetailsPropTypes;

export default OfferDetails;
