'use client';

import Flag from '../Flag';

import { VoyageDetailsTabContentPropTypes } from '@/lib/types';

import { TextRow, Title } from '@/elements';

const VoyageDetailsTabContent = ({ data = {}, inlineVariant = false }) => {
  const printPairDates = (detail) => <TextRow title={detail.key}>{detail.label}</TextRow>;

  return (
    <div>
      <div className="flex justify-between">
        <Title level="3">Voyage details</Title>
      </div>

      <div className={`text-xsm mt-2.5 ${inlineVariant && 'flex justify-between'}`}>
        <div>
          <Title level={5} className="uppercase text-[12px] text-gray font-semibold">
            dates
          </Title>
          {data?.dates?.map((pair) => (
            <div className="mt-2.5">{pair.map(printPairDates)}</div>
          ))}
        </div>

        <hr className="my-4" />

        <div>
          <Title level="5" className="uppercase text-[12px] text-gray font-semibold">
            ports
          </Title>

          {data?.ports?.map((pair) => (
            <div className="mt-2.5" key={pair?.id}>
              {pair?.map((detail) => (
                <TextRow title={detail.key} key={detail.key}>
                  <Flag countryCode={detail.countryCode} className="mr-1.5" />
                  {detail.label}
                </TextRow>
              ))}
            </div>
          ))}
        </div>
      </div>
      {!!inlineVariant && <hr className="my-4" />}
    </div>
  );
};

VoyageDetailsTabContent.propTypes = VoyageDetailsTabContentPropTypes;

export default VoyageDetailsTabContent;
