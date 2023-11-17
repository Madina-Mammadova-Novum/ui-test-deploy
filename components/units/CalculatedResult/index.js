import { CalculatedResultPropTypes } from '@/lib/types';

import { TextWithLabel, Title } from '@/elements';
import { useHookForm } from '@/utils/hooks';
import { toolsCalculatorOptions } from '@/utils/mock';

const CalculatedResult = () => {
  const { getValues } = useHookForm();

  const isFreight = getValues()?.calculator?.value === toolsCalculatorOptions[0]?.value;

  return (
    <div className=" bg-white rounded-md p-5 w-[250px] absolute bottom-2 left-2 z-[500] font-inter-sans">
      <Title level="4">Calculation results</Title>
      <div className="flex gap-x-2.5 mt-2.5">
        {isFreight ? (
          <>
            <TextWithLabel
              text=""
              label="Total freight"
              customStyles="!flex-col !items-start [&>label]:!text-[10px] [&>p]:!ml-0"
            />
            <TextWithLabel
              text=""
              label="Cost per ton"
              customStyles="!flex-col !items-start [&>label]:!text-[10px] [&>p]:!ml-0"
            />
          </>
        ) : (
          <>
            <TextWithLabel
              text=""
              label="Distance"
              customStyles="!flex-col !items-start [&>label]:!text-[10px] [&>p]:!ml-0"
            />
            <TextWithLabel
              text=""
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
