'use client';

/**
 * @component AdditionalDischargeDetails
 * @description Displays additional discharge options with basin, sub-basin, country, and port selections
 * @props {Object} data - Additional discharge options data including basins and sanctioned countries
 * @maritime Shows maritime regions, ports, and sanctioned areas
 */

import { useState } from 'react';

import PropTypes from 'prop-types';

import AngleDownSVG from '@/assets/images/angleDown.svg';
import { FieldsetContent, Title } from '@/elements';
import { Flag } from '@/units';

const AdditionalDischargeDetails = ({
  data = {
    additionalDischargeOptions: {
      isAllSelected: false,
      selected: [],
    },
    sanctionedCountries: [],
    excludeInternationallySanctioned: false,
  },
  classNames = '',
}) => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const renderPorts = (ports) => {
    if (!ports?.length) return null;

    return (
      <div className="ml-2 flex flex-wrap gap-2">
        {ports.map((port) => (
          <div key={port.id} className="flex items-center rounded-md bg-gray-50 px-2 py-1 text-xsm">
            <span className="mr-1">📍</span>
            <span>{port.name}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderCountry = (country) => {
    if (!country?.ports?.length) return null;

    return (
      <div key={country.id}>
        <div className="flex items-center">
          <Flag countryCode={country.codeISO2} className="mr-1.5" />
          <span>{country.name}</span>
        </div>
        {renderPorts(country.ports)}
      </div>
    );
  };

  const renderSubBasin = (subBasin) => {
    if (!subBasin?.countries?.length) return null;

    const subBasinId = `subBasin-${subBasin.id}`;
    const isExpanded = expandedSections[subBasinId];

    return (
      <div key={subBasin.id} className="rounded-md bg-gray-50 p-2">
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-700">{subBasin.name}</span>
          <button type="button" onClick={() => toggleSection(subBasinId)} className="flex items-center p-1">
            <AngleDownSVG
              className={`h-5 w-5 transform fill-gray-500 transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
        {isExpanded && (
          <div className="ml-2 mt-2 space-y-2">
            {subBasin.countries.filter((country) => country.ports?.length > 0).map(renderCountry)}
          </div>
        )}
      </div>
    );
  };

  const renderBasin = (basin) => {
    if (!basin?.subBasins?.length) return null;

    const basinId = `basin-${basin.id}`;
    const isExpanded = expandedSections[basinId];

    return (
      <div key={basin.id} className="rounded-lg border border-gray-200 p-2">
        <div className="flex items-center justify-between">
          <Title level="5" className="text-xsm font-semibold uppercase text-blue-600">
            {basin.name}
          </Title>
          <button type="button" onClick={() => toggleSection(basinId)} className="flex items-center p-1">
            <AngleDownSVG
              className={`h-5 w-5 transform fill-blue transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        {isExpanded && (
          <div className="space-y-2">
            {basin.subBasins
              .filter((subBasin) => subBasin.countries?.some((country) => country.ports?.length > 0))
              .map(renderSubBasin)}
          </div>
        )}
      </div>
    );
  };

  const renderExcludedCountries = () => {
    if (!data.sanctionedCountries?.length && !data.excludeInternationallySanctioned) return null;

    const sectionId = 'excluded-countries';
    const isExpanded = expandedSections[sectionId];

    return (
      <div className="mt-2.5 rounded-lg border border-red-200 bg-red-50 p-2">
        <div className="flex items-center justify-between">
          <Title level="5" className="text-xsm font-semibold uppercase text-red-600">
            Excluded Destinations
          </Title>
          <button type="button" onClick={() => toggleSection(sectionId)} className="flex items-center p-1">
            <AngleDownSVG
              className={`h-5 w-5 transform fill-red-600 transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        {isExpanded && (
          <div className="mt-3 text-xsm">
            {data.sanctionedCountries?.length > 0 && (
              <div className="mb-3">
                <div className="mb-2 font-medium text-gray-700">Specific Destinations</div>
                <div className="flex flex-wrap gap-2">
                  {data.sanctionedCountries.map((country) => (
                    <div key={country.countryId} className="flex items-center rounded bg-white px-2 py-1">
                      <Flag countryCode={country.countryCode} className="mr-1.5" />
                      {country.countryName}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.excludeInternationallySanctioned && (
              <div className="flex items-center rounded bg-white px-2 py-1 text-xsm">
                <p className="font-medium">
                  Internationally sanctioned countries are <span className="text-red-600">excluded</span>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <FieldsetContent label="Additional Discharge Options" className={classNames}>
      {data.additionalDischargeOptions?.selected?.length > 0 ? (
        <>
          <div className="space-y-2 text-xsm">{data.additionalDischargeOptions.selected.map(renderBasin)}</div>
          {renderExcludedCountries()}
        </>
      ) : (
        <div className="rounded-lg border border-gray-200 p-4 text-center text-gray-500">
          {data.additionalDischargeOptions?.isAllSelected
            ? 'All discharge options are selected'
            : 'No discharge options selected'}
        </div>
      )}
    </FieldsetContent>
  );
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

AdditionalDischargeDetails.propTypes = {
  data: PropTypes.shape({
    additionalDischargeOptions: PropTypes.shape({
      isAllSelected: PropTypes.bool,
      selected: PropTypes.arrayOf(BasinShape),
    }),
    sanctionedCountries: PropTypes.arrayOf(
      PropTypes.shape({
        countryId: PropTypes.string.isRequired,
        countryName: PropTypes.string.isRequired,
        countryCode: PropTypes.string.isRequired,
      })
    ),
    excludeInternationallySanctioned: PropTypes.bool,
  }),
  classNames: PropTypes.string,
};

export default AdditionalDischargeDetails;
