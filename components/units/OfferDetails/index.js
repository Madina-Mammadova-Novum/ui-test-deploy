import PropTypes from 'prop-types';

import { OfferDetailsPropTypes } from '@/lib/types';

import { Title } from '@/elements';
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
            {
              id: 'gr',
              name: 'Greece',
              codeISO2: 'GR',
              selected: true,
              ports: [
                { id: 'pir', name: 'Piraeus', code: 'GRPIR', selected: true },
                { id: 'thes', name: 'Thessaloniki', code: 'GRTHS', selected: true },
              ],
            },
            {
              id: 'tr',
              name: 'Turkey',
              codeISO2: 'TR',
              selected: true,
              ports: [
                { id: 'ist', name: 'Istanbul', code: 'TRIST', selected: true },
                { id: 'izm', name: 'Izmir', code: 'TRIZM', selected: true },
              ],
            },
          ],
        },
        {
          id: 'west_med',
          name: 'West Mediterranean',
          selected: true,
          countries: [
            {
              id: 'es',
              name: 'Spain',
              codeISO2: 'ES',
              selected: true,
              ports: [
                { id: 'bcn', name: 'Barcelona', code: 'ESBCN', selected: true },
                { id: 'vlc', name: 'Valencia', code: 'ESVLC', selected: true },
              ],
            },
            {
              id: 'fr',
              name: 'France',
              codeISO2: 'FR',
              selected: true,
              ports: [
                { id: 'mrs', name: 'Marseille', code: 'FRMRS', selected: true },
                { id: 'tln', name: 'Toulon', code: 'FRTLN', selected: true },
              ],
            },
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
            {
              id: 'bg',
              name: 'Bulgaria',
              codeISO2: 'BG',
              selected: true,
              ports: [
                { id: 'var', name: 'Varna', code: 'BGVAR', selected: true },
                { id: 'bgs', name: 'Burgas', code: 'BGBGS', selected: true },
              ],
            },
            {
              id: 'ro',
              name: 'Romania',
              codeISO2: 'RO',
              selected: true,
              ports: [
                { id: 'cnd', name: 'Constanta', code: 'ROCND', selected: true },
                { id: 'mng', name: 'Mangalia', code: 'ROMNG', selected: true },
              ],
            },
          ],
        },
        {
          id: 'east_black',
          name: 'East Black Sea',
          selected: true,
          countries: [
            {
              id: 'ge',
              name: 'Georgia',
              codeISO2: 'GE',
              selected: true,
              ports: [
                { id: 'bat', name: 'Batumi', code: 'GEBAT', selected: true },
                { id: 'pot', name: 'Poti', code: 'GEPOT', selected: true },
              ],
            },
            {
              id: 'tr_black',
              name: 'Turkey',
              codeISO2: 'TR',
              selected: true,
              ports: [
                { id: 'sam', name: 'Samsun', code: 'TRSAM', selected: true },
                { id: 'tra', name: 'Trabzon', code: 'TRTRA', selected: true },
              ],
            },
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
  const renderPorts = (ports) => {
    if (!ports?.length) return null;

    return (
      <div className="ml-8 flex flex-wrap gap-2">
        {ports.map((port) => (
          <div key={port.id} className="text-xs flex items-center rounded-md bg-gray-50 px-2 py-1">
            <span className="mr-1">📍</span> {/* Port icon */}
            <span>{port.name}</span>
            <span className="ml-1 text-gray-500">({port.code})</span>
          </div>
        ))}
      </div>
    );
  };

  const renderCountry = (country) => {
    return (
      <div key={country.id} className="mb-2">
        <div className="flex items-center">
          <Flag countryCode={country.codeISO2} className="mr-1.5" />
          <span className="font-medium">{country.name}</span>
        </div>
        {renderPorts(country.ports)}
      </div>
    );
  };

  const renderBasin = (basin) => {
    return (
      <div key={basin.id} className="mb-6 rounded-lg border border-gray-200 p-4">
        <Title level="5" className="mb-4 text-[14px] font-semibold uppercase text-blue-600">
          {basin.name}
        </Title>

        <div className="space-y-4">
          {basin.subBasins?.map((subBasin) => (
            <div key={subBasin.id} className="rounded-md bg-gray-50 p-3">
              <div className="mb-3 font-medium text-gray-700">{subBasin.name}</div>
              <div className="space-y-3">{subBasin.countries?.map(renderCountry)}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <Title level="3" className="mb-4">
        Additional Discharge Options
      </Title>

      <div className="space-y-4">{data.basins.map(renderBasin)}</div>

      {(data.excludedCountries?.length > 0 || data.excludeInternationallySanctioned) && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4">
          <Title level="5" className="text-[14px] font-semibold uppercase text-red-600">
            Excluded Areas
          </Title>

          <div className="mt-3">
            {data.excludedCountries?.length > 0 && (
              <div className="mb-3">
                <div className="mb-2 font-medium text-gray-700">Specific Destinations</div>
                <div className="flex flex-wrap gap-2">
                  {data.excludedCountries.map((country) => (
                    <div key={country.id} className="flex items-center rounded bg-white px-2 py-1">
                      <Flag countryCode={country.codeISO2} className="mr-1.5" />
                      {country.name}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center rounded bg-white px-3 py-2 text-sm">
              <span className="font-medium">
                Internationally sanctioned countries are{' '}
                <span className={data.excludeInternationallySanctioned ? 'text-red-600' : 'text-green-600'}>
                  {data.excludeInternationallySanctioned ? 'excluded' : 'not excluded'}
                </span>
              </span>
            </div>
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
