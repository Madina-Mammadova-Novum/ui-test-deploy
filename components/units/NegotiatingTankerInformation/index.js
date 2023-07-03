import ReactCountryFlag from 'react-country-flag';

import { Divider, FieldsetContent, TextRow, Title } from '@/elements';
import { tankerInformationTooltipData } from '@/utils/mock';

const NegotiatingTankerInformation = () => {
  return (
    <div className="w-[610px]">
      <Title level={2}>Tanker Information</Title>

      <FieldsetContent label="About the Vessel Owner" className="mt-3">
        <TextRow title="Years of Operation">3-5 years</TextRow>
        <TextRow title="Number of Tankers">6-10 tankers</TextRow>
        <TextRow title="Estimated average tanker DWT">21-40 kt</TextRow>
      </FieldsetContent>

      <Divider className="my-3" />

      {!!tankerInformationTooltipData.length && (
        <FieldsetContent label="About the Tanker">
          <div className="text-xs flex gap-x-5">
            <div className="w-full">
              {tankerInformationTooltipData.slice(0, 9).map(({ title, description, countryCode }) => (
                <TextRow title={title}>
                  <ReactCountryFlag countryCode={countryCode} style={{ marginRight: '3px' }} />
                  {description}
                </TextRow>
              ))}
            </div>

            <div className="w-full">
              {tankerInformationTooltipData.slice(9).map(({ title, description, countryCode }) => (
                <TextRow title={title} className={`${countryCode && 'flex flex-col'}`}>
                  <ReactCountryFlag countryCode={countryCode} style={{ marginRight: '3px' }} />
                  {description}
                </TextRow>
              ))}
            </div>
          </div>
        </FieldsetContent>
      )}
    </div>
  );
};

export default NegotiatingTankerInformation;
