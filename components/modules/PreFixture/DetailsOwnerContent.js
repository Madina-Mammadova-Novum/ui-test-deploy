import { DetailsOwnerContentPropTypes } from '@/lib/types';

import { FieldsetContent, FieldsetWrapper, TextRow, Title } from '@/elements';
import { Flag } from '@/units';

const DetailsOwnerContent = ({ data, title }) => {
  return (
    <FieldsetWrapper>
      <Title level="3">{title}</Title>
      <FieldsetContent className="pt-2.5">
        <TextRow title="Years of Operation">{data?.operationYears || null}</TextRow>
        <TextRow title="Estimated Number of Charters per Year">{data?.chartersPerYear || null}</TextRow>
        <TextRow title="Average Tonnage per Charter">{data?.avgTonnage || null}</TextRow>
        <TextRow title="Country of registration" className="!inline-flex items-center">
          {data?.registrationCountry?.countryCode && (
            <Flag countryCode={data?.registrationCountry?.countryCode} className="mr-1" />
          )}{' '}
          {data?.registrationCountry?.countryName || null}
        </TextRow>
      </FieldsetContent>
    </FieldsetWrapper>
  );
};

DetailsOwnerContent.propTypes = DetailsOwnerContentPropTypes;

export default DetailsOwnerContent;
