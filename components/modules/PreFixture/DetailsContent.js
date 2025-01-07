'use client';

import { useSelector } from 'react-redux';

import { DetailsContentPropTypes } from '@/lib/types';

import { FieldsetContent, FieldsetWrapper, TextRow, Title } from '@/elements';
import DetailsChartererContent from '@/modules/PreFixture/DetailsChartererContent';
import DetailsOwnerContent from '@/modules/PreFixture/DetailsOwnerContent';
import { getGeneralDataSelector, getUserDataSelector } from '@/store/selectors';
import { AdditionalDischargeDetails, Flag, PartyItem } from '@/units';

const DetailsContent = ({ detailsData = {} }) => {
  const { role } = useSelector(getUserDataSelector);
  const { countries } = useSelector(getGeneralDataSelector);

  console.log({ detailsData });
  const {
    partyInformation = {},
    cargoDetails = {},
    commercialOfferTerms = {},
    voyageDetails = {},
    additionalCharterPartyTerms = [],
    additionalDischargeOptions,
    sanctionedCountries,
    excludeInternationallySanctioned,
  } = detailsData;

  const { cargoType, products = [] } = cargoDetails;
  const { freight, demurrageRate, laytime, demurragePaymentTerms, paymentTerms } = commercialOfferTerms;

  const {
    laycanStart,
    laycanEnd,
    loadPort,
    loadPortCountryCode,
    loadTerminal,
    dischargePort,
    dischargePortCountryCode,
    dischargeTerminal,
  } = voyageDetails;

  const roleBasedSection = {
    owner: <DetailsOwnerContent title="Charterer Information" data={partyInformation} countries={countries} />,
    charterer: <DetailsChartererContent title="Tanker Information" data={partyInformation} />,
  };

  const additionalDischargeData = {
    additionalDischargeOptions,
    sanctionedCountries,
    excludeInternationallySanctioned,
  };

  return (
    <div className="mb-5 flex flex-col gap-y-2.5">
      <div className="flex flex-col gap-y-2.5 3md:flex-row 3md:gap-x-2.5 3md:gap-y-0">
        {roleBasedSection[role]}
        <FieldsetWrapper>
          <Title level="3">Cargo Details</Title>

          <FieldsetContent className="mt-2.5">
            <TextRow title="Cargo Type">{cargoType}</TextRow>
          </FieldsetContent>

          <FieldsetContent label="Products" className="mt-4">
            {products.map(({ productName, density, minQuantity }, index) => (
              <div key={productName} className={index && 'mt-4'}>
                <TextRow title={`Product #${index + 1}`}>{productName}</TextRow>
                <TextRow title="Density">{density} mt/m³</TextRow>
                <TextRow title="Min quantity">{minQuantity} tons</TextRow>
              </div>
            ))}
          </FieldsetContent>
        </FieldsetWrapper>
      </div>

      <div className="flex flex-col gap-y-2.5 3md:flex-row 3md:gap-x-2.5 3md:gap-y-0">
        <FieldsetWrapper>
          <Title level="3">Commercial Offer Terms</Title>

          <FieldsetContent className="mt-2.5">
            <TextRow title="Freight">{freight}</TextRow>
            <TextRow title="Demurrage rate">{demurrageRate}</TextRow>
            <TextRow title="Laytime + NOR">{laytime}</TextRow>
            <TextRow title="Undisputed demurrage payment terms" className="inline-text-row">
              {demurragePaymentTerms}
            </TextRow>
            <TextRow title="Payment term" className="inline-text-row">
              {paymentTerms}
            </TextRow>
          </FieldsetContent>
        </FieldsetWrapper>

        <FieldsetWrapper>
          <Title level="3">Voyage Details</Title>

          <FieldsetContent label="Dates" className="mt-2.5">
            <TextRow title="Laycan start">{laycanStart}</TextRow>
            <TextRow title="Laycan end">{laycanEnd}</TextRow>
          </FieldsetContent>

          <FieldsetContent label="Ports" className="mt-4">
            <div>
              <TextRow title="Load port">
                <Flag countryCode={loadPortCountryCode} className="mr-1" />
                {loadPort}
              </TextRow>
              <TextRow title="Load terminal">{loadTerminal}</TextRow>
            </div>

            <div className="mt-2.5">
              <TextRow title="Discharge port">
                <Flag countryCode={dischargePortCountryCode} className="mr-1" />
                {dischargePort}
              </TextRow>
              <TextRow title="Discharge terminal">{dischargeTerminal}</TextRow>
            </div>
          </FieldsetContent>

          <FieldsetContent label="Additional Discharge Options" className="mt-4">
            <AdditionalDischargeDetails data={additionalDischargeData} />
          </FieldsetContent>
        </FieldsetWrapper>
      </div>
      {!!additionalCharterPartyTerms.length && (
        <FieldsetWrapper>
          <Title level="3">Additional Charter Party Terms</Title>

          <FieldsetContent className="mt-3.5 flex gap-2.5">
            {additionalCharterPartyTerms.map(({ title, body }, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <PartyItem key={index} buttonText={title} modalTitle="All Additional Information" body={body} />
            ))}
          </FieldsetContent>
        </FieldsetWrapper>
      )}
    </div>
  );
};

DetailsContent.propTypes = DetailsContentPropTypes;

export default DetailsContent;
