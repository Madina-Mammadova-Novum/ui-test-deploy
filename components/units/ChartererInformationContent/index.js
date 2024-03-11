import ReactCountryFlag from 'react-country-flag';

import { ChartererInformationContentPropTypes } from '@/lib/types';

import { TextRow, Title } from '@/elements';

const ChartererInformationContent = ({ title = '', data }) => {
  return (
    <>
      {title && (
        <Title level={3} className="mb-5">
          {title}
        </Title>
      )}
      <TextRow title="Years of Operation">{data?.yearsOfOperation || '-'} years </TextRow>
      <TextRow title="Estimated Number of Charters per Year">{data?.tankersPerYear || '-'} charters</TextRow>
      <TextRow title="Average Tonnage per Charter">121 - 200 kt</TextRow>
      <TextRow title="Country of registration">
        <ReactCountryFlag countryCode={data?.country?.countryCode} svg className="!w-5 !h-3 mr-1.5" />{' '}
        {data?.country?.countryName}
      </TextRow>
    </>
  );
};
ChartererInformationContent.propTypes = ChartererInformationContentPropTypes;

export default ChartererInformationContent;
