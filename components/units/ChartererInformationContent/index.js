import ReactCountryFlag from 'react-country-flag';

import { ChartererInformationContentPropTypes } from '@/lib/types';

import { TextRow, Title } from '@/elements';

const ChartererInformationContent = ({ title = '' }) => {
  return (
    <>
      {title && (
        <Title level={3} className="mb-5">
          {title}
        </Title>
      )}
      <TextRow title="Years of Operation">3-5 years</TextRow>
      <TextRow title="Estimated Number of Charters per Year">4-9 charters</TextRow>
      <TextRow title="Average Tonnage per Charter">121 - 200 kt</TextRow>
      <TextRow title="Country of registration">
        <ReactCountryFlag countryCode="us" svg className="!w-5 !h-3 mr-1.5" /> United States
      </TextRow>
    </>
  );
};
ChartererInformationContent.propTypes = ChartererInformationContentPropTypes;

export default ChartererInformationContent;
