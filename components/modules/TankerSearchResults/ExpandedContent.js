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
    <div className="mt-3 px-5">
      <Title level="3">Tanker Information</Title>

      <div className="mt-2.5 gap-x-20 text-xsm lg:flex">
        {vesselOwnerData.length && (
          <div>
            <Title level="5" className="mb-1.5 text-xs-sm font-semibold uppercase text-gray">
              About the Vessel Owner
            </Title>
            {vesselOwnerData.map(({ title, description }) => (
              <TextRow key={title} title={title}>
                {hashedInfo(description)}
              </TextRow>
            ))}
          </div>
        )}

        <div className="mt-2.5 lg:mt-0">
          <Title level="5" className="mb-1.5 text-xs-sm font-semibold uppercase text-gray">
            About the Tanker
          </Title>
          <div className="flex flex-col gap-x-10 gap-y-2 sm:flex-row">
            {tankerData.length && (
              <div>
                {tankerData.map(({ title, description }) => (
                  <TextRow key={title} title={title}>
                    {hashedInfo(description)}
                  </TextRow>
                ))}
              </div>
            )}

            {countryData.length && (
              <div>
                {countryData.map(({ title, description, countryCode }) => (
                  <TextRow key={title} title={title}>
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
