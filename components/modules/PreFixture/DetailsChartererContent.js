import { DetailsChartererContentPropTypes } from '@/lib/types';

import { FieldsetContent, FieldsetWrapper, TextRow, Title } from '@/elements';

const DetailsChartererContent = ({ data, title }) => {
  const { operationYears, numberOfTankers, estimatedTankerDWT } = data;
  return (
    <FieldsetWrapper>
      <Title level="3">{title}</Title>
      <FieldsetContent className="pt-2.5">
        <TextRow title="Years of Operation">{operationYears}</TextRow>
        <TextRow title="Number of Tankers">{numberOfTankers}</TextRow>
        <TextRow title="Estimated average tanker DWT">{estimatedTankerDWT}</TextRow>
      </FieldsetContent>
    </FieldsetWrapper>
  );
};

DetailsChartererContent.propTypes = DetailsChartererContentPropTypes;

export default DetailsChartererContent;
