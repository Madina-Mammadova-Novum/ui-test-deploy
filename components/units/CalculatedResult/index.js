'use client';

import { CalculatedResultPropTypes } from '@/lib/types';

import { TextWithLabel, Title } from '@/elements';
import { formatedNumber } from '@/utils/helpers';
import { toolsCalculatorOptions } from '@/utils/mock';

const CalculatedResult = ({ result, value }) => {
  const isFreight = value === toolsCalculatorOptions[0]?.value;

  const firstValue = formatedNumber(result?.resultOne);
  const secondValue = formatedNumber(result?.resultTwo);

  return (
    <div className=" bg-white rounded-md p-5 w-[250px] absolute bottom-2 left-2 z-[500] font-inter-sans">
      <Title level="4">Calculation results</Title>
      <div className="flex gap-x-2.5 mt-2.5">
        {isFreight ? (
          <>
            <TextWithLabel
              text={firstValue}
              label="Total freight"
              customStyles="!flex-col !items-start [&>label]:!text-[10px] [&>p]:!ml-0"
            />
            <TextWithLabel
              text={secondValue}
              label="Cost per ton"
              customStyles="!flex-col !items-start [&>label]:!text-[10px] [&>p]:!ml-0"
            />
          </>
        ) : (
          <>
            <TextWithLabel
              text={firstValue}
              label="Distance"
              customStyles="!flex-col !items-start [&>label]:!text-[10px] [&>p]:!ml-0"
            />
            <TextWithLabel
              text={secondValue}
              label="Duration"
              customStyles="!flex-col !items-start [&>label]:!text-[10px] [&>p]:!ml-0"
            />
          </>
        )}
      </div>
    </div>
  );
};

CalculatedResult.propTypes = CalculatedResultPropTypes;

export default CalculatedResult;
