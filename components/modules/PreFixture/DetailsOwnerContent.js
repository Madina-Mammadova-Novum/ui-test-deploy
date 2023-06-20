import { DetailsOwnerContentPreFixtureContent } from '@/lib/types';

import { FieldsetContent, FieldsetWrapper, TextRow, Title } from '@/elements';

const DetailsOwnerContent = ({ data, title }) => {
  const { years, ships, kt } = data;
  return (
    <FieldsetWrapper>
      <Title level="3">{title}</Title>
      <FieldsetContent className="pt-2.5">
        <TextRow title="Years of Operation">{years} years</TextRow>
        <TextRow title="Number of Tankers">{ships} tankers</TextRow>
        <TextRow title="Estimated average tanker DWT">{kt} kt</TextRow>
      </FieldsetContent>
    </FieldsetWrapper>
  );
};

DetailsOwnerContent.propTypes = DetailsOwnerContentPreFixtureContent;

export default DetailsOwnerContent;
