import ReactCountryFlag from 'react-country-flag';

import { ExpandedContentPropTypes } from '@/lib/types';

import { TextRow, Title } from '@/elements';

const ExpandedContent = ({ data }) => {
  const { vesselOwnerData, tankerData, countryData } = data;

  return (
    <div className="mt-3 mb-5">
      <Title level="3">Tanker Information</Title>

      <div className="lg:flex text-xsm mt-2.5 gap-x-20">
        {vesselOwnerData.length && (
          <div>
            <Title level="5" className="text-xs-sm text-gray font-semibold mb-1.5 uppercase">
              About the Vessel Owner
            </Title>
            {vesselOwnerData.map(({ title, description }) => (
              <TextRow title={title}>{description || 'Hidden info'}</TextRow>
            ))}
          </div>
        )}

        <div className="mt-2.5 lg:mt-0">
          <Title level="5" className="text-xs-sm text-gray font-semibold mb-1.5 uppercase">
            About the Tanker
          </Title>
          <div className="flex gap-x-10">
            {tankerData.length && (
              <div>
                {tankerData.map(({ title, description }) => (
                  <TextRow title={title}>{description || 'Hidden info'}</TextRow>
                ))}
              </div>
            )}

            {countryData.length && (
              <div>
                {countryData.map(({ title, description, countryCode }) => (
                  <TextRow title={title}>
                    <ReactCountryFlag style={{ zoom: 1.3 }} countryCode={countryCode} />
                    {description || 'Hidden info'}
                  </TextRow>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ExpandedContent.propTypes = ExpandedContentPropTypes;

export default ExpandedContent;
