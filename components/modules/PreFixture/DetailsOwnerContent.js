import ReactCountryFlag from 'react-country-flag';

import { DetailsOwnerContentPropTypes } from '@/lib/types';

import { FieldsetContent, FieldsetWrapper, TextRow, Title } from '@/elements';

const DetailsOwnerContent = ({ data, title }) => {
  const { operationYears, chartersPerYear, avgTonnage, registrationCountry: { countryName, countryCode } = {} } = data;
  return (
    <FieldsetWrapper>
      <Title level="3">{title}</Title>
      <FieldsetContent className="pt-2.5">
        <TextRow title="Years of Operation">{operationYears}</TextRow>
        <TextRow title="Estimated Number of Charters per Year">{chartersPerYear}</TextRow>
        <TextRow title="Average Tonnage per Charter">{avgTonnage}</TextRow>
        <TextRow title="Country of registration">
          <ReactCountryFlag style={{ zoom: 1.3, marginRight: '5px' }} countryCode={countryCode} /> {countryName}
        </TextRow>
      </FieldsetContent>
    </FieldsetWrapper>
  );
};

DetailsOwnerContent.propTypes = DetailsOwnerContentPropTypes;

export default DetailsOwnerContent;
