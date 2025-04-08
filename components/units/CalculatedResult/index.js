'use client';

import PropTypes from 'prop-types';

import { CalculatedResultPropTypes } from '@/lib/types';

import { TextWithLabel, Title } from '@/elements';
import { formattedDay, formattedNumber } from '@/utils/helpers';
import { toolsCalculatorOptions } from '@/utils/mock';

const ResultItem = ({ label, text }) => (
  <TextWithLabel
    text={text}
    label={label}
    customStyles="!flex-col !items-start [&>label]:!text-[10px] [&>p]:!ml-0"
    textGroupStyle="!mx-0 !ml-0"
  />
);

ResultItem.propTypes = {
  label: PropTypes.string.isRequired,
  text: PropTypes.string,
};

const CalculatedResult = ({ result, value }) => {
  const isFreight = value === toolsCalculatorOptions[0]?.value;
  const firstValue = formattedNumber(result?.resultOne);
  const secondValue = formattedNumber(result?.resultTwo);

  // Format display values based on calculation type
  const distanceValue = firstValue ? `${firstValue} nm` : '';
  const durationValue = secondValue ? `${formattedDay(secondValue)} days` : '';
  const freightValue = secondValue ? `$${secondValue}` : '';
  const costPerTonValue = firstValue ? `$${firstValue}` : '';

  return (
    <div className="absolute bottom-2 left-2 z-[500] w-[250px] rounded-md bg-[rgba(255,255,255,0.8)] p-5 font-inter-sans">
      <Title level="4">Calculation results</Title>
      <div className="mt-2.5 flex gap-x-2.5">
        {isFreight ? (
          <>
            <ResultItem label="Total freight" text={freightValue} />
            <ResultItem label="Cost per ton" text={costPerTonValue} />
          </>
        ) : (
          <>
            <ResultItem label="Distance" text={distanceValue} />
            <ResultItem label="Duration" text={durationValue} />
          </>
        )}
      </div>
    </div>
  );
};

CalculatedResult.propTypes = CalculatedResultPropTypes;

export default CalculatedResult;
