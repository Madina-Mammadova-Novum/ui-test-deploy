'use client';

import React from 'react';

import PropTypes from 'prop-types';

import { VoyageDetailsTabContentPropTypes } from '@/lib/types';

import { TextRow, Title } from '@/elements';
import { AdditionalDischargeForm, Flag } from '@/units';

const VoyageDetailsTabContent = ({ data = {}, inlineVariant = false }) => {
  const hasAdditionalDischargeOptions = data?.additionalDischargeOptions?.length > 0;

  const printPairDates = (detail) => (
    <TextRow key={detail.key} title={detail.key}>
      {detail.label}
    </TextRow>
  );

  return (
    <div>
      <div className="flex justify-between">
        <Title level="3">Voyage details</Title>
      </div>

      <div className={`mt-2.5 gap-x-2.5 text-xsm ${inlineVariant && 'flex justify-between'}`}>
        <div>
          <Title level="5" className="text-[12px] font-semibold uppercase text-gray">
            dates
          </Title>
          {data?.dates?.map((pair, index) => (
            <div key={`${pair[index].key}-dates-group`} className="mt-2.5">
              {pair.map(printPairDates)}
            </div>
          ))}
        </div>

        <hr className="my-4" />

        <div>
          <Title level="5" className="text-[12px] font-semibold uppercase text-gray">
            ports
          </Title>

          {data?.ports?.map((pair, index) => (
            <div className="mt-2.5" key={`${pair[index].key}-ports-group`}>
              {pair?.map((detail) => {
                return (
                  <TextRow title={detail.key} key={detail.key}>
                    <Flag countryCode={detail.countryCode} className="mr-1.5" />
                    {detail.label}
                  </TextRow>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {!!inlineVariant && <hr className="my-4" />}

      {hasAdditionalDischargeOptions && (
        <>
          <hr className="my-4" />
          <AdditionalDischargeForm data={data} />
        </>
      )}
    </div>
  );
};

VoyageDetailsTabContent.propTypes = {
  ...VoyageDetailsTabContentPropTypes,
  inlineVariant: PropTypes.bool,
};

export default VoyageDetailsTabContent;
