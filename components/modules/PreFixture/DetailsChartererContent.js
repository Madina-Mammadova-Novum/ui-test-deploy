import { DetailsChartererPreFixtureContent } from '@/lib/types';

import { FieldsetContent, FieldsetWrapper, IconComponent, TextRow, Title } from '@/elements';

const DetailsChartererContent = ({ data, title }) => {
  const { years, ships, kt, state, icon } = data;
  return (
    <FieldsetWrapper>
      <Title level="3">{title}</Title>
      <FieldsetContent className="pt-2.5">
        <TextRow title="Years of Operation">{years} years</TextRow>
        <TextRow title="Estimated Number of Charters per Year">{ships} charters</TextRow>
        <TextRow title="Average Tonnage per Charter">{kt} kt</TextRow>
        <TextRow title="Country of registration">
          <IconComponent icon={icon} /> {state}
        </TextRow>
      </FieldsetContent>
    </FieldsetWrapper>
  );
};

DetailsChartererContent.propTypes = DetailsChartererPreFixtureContent;

export default DetailsChartererContent;
