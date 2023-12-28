'use client';

import { useSelector } from 'react-redux';

import { DetailsContentPropTypes } from '@/lib/types';

import { FieldsetContent, FieldsetWrapper, TextRow, Title } from '@/elements';
import DetailsChartererContent from '@/modules/PreFixture/DetailsChartererContent';
import DetailsOwnerContent from '@/modules/PreFixture/DetailsOwnerContent';
import { getGeneralDataSelector, getUserDataSelector } from '@/store/selectors';
import { Flag, PartyItem } from '@/units';

const DetailsContent = ({ data = {} }) => {
  const { role } = useSelector(getUserDataSelector);
  const { countries } = useSelector(getGeneralDataSelector);

  const {
    partyInformation = {},
    cargoDetails = {},
    commercialOfferTerms = {},
    voyageDetails = {},
    additionalCharterPartyTerms = [],
  } = data;

  const { cargoType, products = [] } = cargoDetails;
  const { freight, demurrageRate, laytime, demurragePaymentTerms, paymentTerms } = commercialOfferTerms;

  const {
    laycanStart,
    laycanEnd,
    loadPort,
    loadPortCountryId,
    loadTerminal,
    dischargePort,
    dischargePortCountryId,
    dischargeTerminal,
  } = voyageDetails;

  const roleBasedSection = {
    owner: <DetailsChartererContent title="Tanker Information" data={partyInformation} />,
    charterer: <DetailsOwnerContent title="Charterer Information" data={partyInformation} countries={countries} />,
  };

  return (
    <div className="flex flex-col gap-y-2.5 mb-5">
      <div className="flex flex-col gap-y-2.5 3md:gap-y-0 3md:flex-row 3md:gap-x-2.5">
        {roleBasedSection[role]}
        <FieldsetWrapper>
          <Title level={3}>Cargo Details</Title>

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

      <div className="flex flex-col gap-y-2.5 3md:gap-y-0 3md:flex-row 3md:gap-x-2.5">
        <FieldsetWrapper>
          <Title level={3}>Commercial Offer Terms</Title>

          <FieldsetContent className="mt-2.5">
            <TextRow title="Freight">{freight}</TextRow>
            <TextRow title="Demurrage rate">{demurrageRate}</TextRow>
            <TextRow title="Laytime + NOR">{laytime}</TextRow>
            <TextRow
              title="Undisputed demurrage payment terms"
              className="[&>span:nth-child(2)]:!whitespace-pre-wrap [&>span:nth-child(2)]:!inline"
            >
              {demurragePaymentTerms}
            </TextRow>
            <TextRow
              title="Payment term"
              className="[&>span:nth-child(2)]:!whitespace-pre-wrap [&>span:nth-child(2)]:!inline"
            >
              {paymentTerms}
            </TextRow>
          </FieldsetContent>
        </FieldsetWrapper>

        <FieldsetWrapper>
          <Title level={3}>Voyage Details</Title>

          <FieldsetContent label="Dates" className="mt-2.5">
            <TextRow title="Laycan start">{laycanStart}</TextRow>
            <TextRow title="Laycan end">{laycanEnd}</TextRow>
          </FieldsetContent>

          <FieldsetContent label="Ports" className="mt-4">
            <div>
              <TextRow title="Load port">
                <Flag data={countries} id={loadPortCountryId} className="mr-1" />
                {loadPort}
              </TextRow>
              <TextRow title="Load terminal">{loadTerminal}</TextRow>
            </div>

            <div className="mt-2.5">
              <TextRow title="Discharge port">
                <Flag data={countries} id={dischargePortCountryId} className="mr-1" />
                {dischargePort}
              </TextRow>
              <TextRow title="Discharge terminal">{dischargeTerminal}</TextRow>
            </div>
          </FieldsetContent>
        </FieldsetWrapper>
      </div>
      {!!additionalCharterPartyTerms.length && (
        <FieldsetWrapper>
          <Title level={3}>Additional Charter Party Terms</Title>

          <FieldsetContent className="mt-3.5 flex gap-2.5">
            {additionalCharterPartyTerms.map(({ title, body }) => (
              <PartyItem buttonText={title} modalTitle="All Additional Information" body={body} />
            ))}
          </FieldsetContent>
        </FieldsetWrapper>
      )}
    </div>
  );
};

DetailsContent.propTypes = DetailsContentPropTypes;

export default DetailsContent;
