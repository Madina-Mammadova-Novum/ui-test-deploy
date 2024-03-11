import { PostFixtureDetailsContentPropTypes } from '@/lib/types';

import { Divider, FieldsetContent, FieldsetWrapper, TextRow, Title } from '@/elements';
import { Flag, PartyItem } from '@/units';

const PostFixtureDetailsContent = ({ detailsData }) => {
  const {
    chartererInformation,
    tankerInformation,
    cargoDetails,
    voyageDetails,
    commercialOfferTerms,
    additionalCharterPartyTerms,
  } = detailsData;

  const { generalInformation, lastCargoes, additionalInformation } = tankerInformation || {};
  const { cargoInformation, products } = cargoDetails || {};
  const { voyageDates, voyagePorts } = voyageDetails || {};

  const {
    generalOfferTerms,
    bankInfo: { bankName, bankDetails },
  } = commercialOfferTerms || {};

  return (
    <div className="flex flex-col gap-y-2.5 mb-5">
      <div className="flex flex-col gap-y-2.5 3md:gap-y-0 3md:flex-row 3md:gap-x-2.5">
        <FieldsetWrapper>
          <Title level={3}>Charterer Information</Title>
          <FieldsetContent className="mt-2.5">
            {chartererInformation?.map(({ title, text }) => (
              <TextRow key={title} title={title} inlineVariant>
                {text}
              </TextRow>
            ))}
          </FieldsetContent>
        </FieldsetWrapper>

        <FieldsetWrapper>
          <Title level={3}>Tanker Information</Title>

          <FieldsetContent className="mt-2.5">
            {generalInformation?.map(({ title, text, countryCode }) => (
              <TextRow key={title} title={title} inlineVariant>
                <Flag countryCode={countryCode} className="mr-1" /> {text}
              </TextRow>
            ))}
          </FieldsetContent>

          <Divider className="mt-4" />

          <FieldsetContent label="last 3 cargoes" className="mt-4">
            <div className="flex">
              {lastCargoes?.map(({ title, text }) => (
                <TextRow
                  key={title}
                  title={title}
                  className="flex flex-col !items-start !justify-start w-full !gap-y-2"
                >
                  {text}
                </TextRow>
              ))}
            </div>
          </FieldsetContent>

          <Divider className="mt-4" />

          <FieldsetContent className="mt-4">
            {additionalInformation?.map(({ title, text }) => (
              <TextRow key={title} title={title} inlineVariant>
                {text}
              </TextRow>
            ))}
          </FieldsetContent>
        </FieldsetWrapper>
      </div>

      <div className="flex flex-col gap-y-2.5 3md:gap-y-0 3md:flex-row 3md:gap-x-2.5">
        <FieldsetWrapper>
          <Title level="3">Cargo Details</Title>

          <FieldsetContent className="mt-2.5">
            {cargoInformation?.map(({ title, text }) => (
              <TextRow key={title} title={title} inlineVariant>
                {text}
              </TextRow>
            ))}
          </FieldsetContent>

          <FieldsetContent label="Products" className="mt-4">
            {products?.map(({ productName, density, minQuantity }, index) => (
              <div key={productName} className={index && 'mt-4'}>
                <TextRow title={`Product #${index + 1}`}>{productName}</TextRow>
                <TextRow title="Density">{density} mt/m³</TextRow>
                <TextRow title="Min quantity">{minQuantity} tons</TextRow>
              </div>
            ))}
          </FieldsetContent>
        </FieldsetWrapper>

        <FieldsetWrapper>
          <Title level="3">Voyage Details</Title>

          <FieldsetContent label="Dates" className="mt-2.5">
            {voyageDates?.map(({ title, text }) => (
              <TextRow key={title} title={title} inlineVariant>
                {text}
              </TextRow>
            ))}
          </FieldsetContent>

          <FieldsetContent label="Ports" className="mt-4">
            {voyagePorts?.map((portGroup, index) => (
              <div className={index && 'mt-2.5'}>
                {portGroup?.map(({ title, text, countryCode }) => (
                  <TextRow title={title} inlineVariant>
                    <Flag countryCode={countryCode} className="mr-1" /> {text}
                  </TextRow>
                ))}
              </div>
            ))}
          </FieldsetContent>
        </FieldsetWrapper>
      </div>
      <div className="flex flex-col gap-y-2.5 3md:gap-y-0 3md:flex-row 3md:gap-x-2.5">
        <FieldsetWrapper>
          <Title level={3}>Commercial Offer Terms</Title>

          <FieldsetContent className="mt-2.5">
            {generalOfferTerms?.map(({ title, text }) => (
              <TextRow key={title} title={title} inlineVariant>
                {text}
              </TextRow>
            ))}
          </FieldsetContent>

          <FieldsetContent label="Bank details" className="mt-2.5">
            <Title level={4}>{bankName}</Title>

            <div className="mt-1.5">
              {bankDetails?.map(({ title, text }) => (
                <TextRow key={title} title={title} inlineVariant>
                  {text}
                </TextRow>
              ))}
            </div>
          </FieldsetContent>
        </FieldsetWrapper>

        <FieldsetWrapper>
          <Title level={3}>Additional Charter Party Terms</Title>

          <FieldsetContent className="mt-3.5 flex gap-2.5">
            {additionalCharterPartyTerms?.map(({ title, body }) => (
              <PartyItem buttonText={title} modalTitle="Tanker Voyage Charter Party" body={body} />
            ))}
          </FieldsetContent>
        </FieldsetWrapper>
      </div>
    </div>
  );
};

PostFixtureDetailsContent.propTypes = PostFixtureDetailsContentPropTypes;

export default PostFixtureDetailsContent;
