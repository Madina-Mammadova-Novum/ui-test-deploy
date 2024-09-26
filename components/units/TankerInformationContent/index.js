import ReactCountryFlag from 'react-country-flag';

import { TextRow } from '@/elements';
import { tankerInformationTooltipData } from '@/utils/mock';

const TankerInformationContent = () => {
  return (
    !!tankerInformationTooltipData.length && (
      <div className="text-xs flex gap-x-5">
        <div className="w-full">
          {tankerInformationTooltipData.slice(0, 9).map(({ title, description, countryCode }) => (
            <TextRow title={title} className="!text-[12px]">
              <ReactCountryFlag countryCode={countryCode} style={{ marginRight: '3px' }} svg />
              {description}
            </TextRow>
          ))}
        </div>

        <div className="w-full">
          {tankerInformationTooltipData.slice(9).map(({ title, description, countryCode }) => (
            <TextRow title={title} className={`!text-[12px] ${countryCode && 'flex flex-col'}`}>
              <ReactCountryFlag countryCode={countryCode} style={{ marginRight: '3px' }} svg />
              {description}
            </TextRow>
          ))}
        </div>
      </div>
    )
  );
};

export default TankerInformationContent;
