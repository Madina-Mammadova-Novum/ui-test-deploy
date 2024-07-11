'use client';

import { ExpandedContentPropTypes } from '@/lib/types';

import { TextRow, Title } from '@/elements';
import { Flag } from '@/units';
import { getCookieFromBrowser } from '@/utils/helpers';

const ExpandedContent = ({ data }) => {
  const { vesselOwnerData, tankerData, countryData } = data;

  const token = getCookieFromBrowser('session-access-token');

  const hashedInfo = (text = null) => (token ? text : 'Hidden info');

  return (
    <div className="mt-3  px-5">
      <Title level="3">Tanker Information</Title>

      <div className="lg:flex text-xsm mt-2.5 gap-x-20">
        {vesselOwnerData.length && (
          <div>
            <Title level="5" className="text-xs-sm text-gray font-semibold mb-1.5 uppercase">
              About the Vessel Owner
            </Title>
            {vesselOwnerData.map(({ title, description }) => (
              <TextRow title={title}>{hashedInfo(description)}</TextRow>
            ))}
          </div>
        )}

        <div className="mt-2.5 lg:mt-0">
          <Title level="5" className="text-xs-sm text-gray font-semibold mb-1.5 uppercase">
            About the Tanker
          </Title>
          <div className="flex gap-x-10 gap-y-2 flex-col sm:flex-row">
            {tankerData.length && (
              <div>
                {tankerData.map(({ title, description }) => (
                  <TextRow title={title}>{hashedInfo(description)}</TextRow>
                ))}
              </div>
            )}

            {countryData.length && (
              <div>
                {countryData.map(({ title, description, countryCode }) => (
                  <TextRow title={title}>
                    <Flag countryCode={countryCode} className="mr-1" />
                    {hashedInfo(description)}
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
