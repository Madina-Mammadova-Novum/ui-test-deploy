import { DetailsOwnerContentPropTypes } from '@/lib/types';

import { FieldsetContent, FieldsetWrapper, TextRow, Title } from '@/elements';
import { Flag } from '@/units';

const DetailsOwnerContent = ({ data, countries, title }) => {
  const { operationYears, numberOfTankers, estimatedTankerDWT, country } = data;

  return (
    <FieldsetWrapper>
      <Title level="3">{title}</Title>
      <FieldsetContent className="pt-2.5">
        <TextRow title="Years of Operation">{operationYears}</TextRow>
        <TextRow title="Estimated Number of Charters per Year">{estimatedTankerDWT}</TextRow>
        <TextRow title="Average Tonnage per Charter">{numberOfTankers}</TextRow>
        <TextRow title="Country of registration" className="!inline-flex items-center">
          <Flag data={countries} id={country?.id} className="mr-1" /> {country?.name}
        </TextRow>
      </FieldsetContent>
    </FieldsetWrapper>
  );
};

DetailsOwnerContent.propTypes = DetailsOwnerContentPropTypes;

export default DetailsOwnerContent;
