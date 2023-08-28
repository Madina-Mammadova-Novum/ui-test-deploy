'use client';

import { useMemo } from 'react';

import { useSession } from 'next-auth/react';

import { DetailsContentPropTypes } from '@/lib/types';

import usFlag from '@/assets/images/flag.png';
import { FieldsetContent, FieldsetWrapper, IconComponent, TextRow, Title } from '@/elements';
import { ROLES } from '@/lib';
import DetailsChartererContent from '@/modules/PreFixture/DetailsChartererContent';
import DetailsOwnerContent from '@/modules/PreFixture/DetailsOwnerContent';
import { PartyItem } from '@/units';

const DetailsContent = ({ data = {} }) => {
  const { data: session } = useSession();
  const {
    partyInformation = {},
    cargoDetails = {},
    commercialOfferTerms = {},
    voyageDetails = {},
    additionalCharterPartyTerms = [],
  } = data;
  const { cargoType, products = [] } = cargoDetails;
  const { freight, demurrageRate, laytime, demurragePaymmentTerms, paymentTerms } = commercialOfferTerms;
  const { laycanStart, laycanEnd, loadPort, loadTerminal, dischargePort, dischargeTerminal } = voyageDetails;

  const state = {
    ownerData: {
      years: '0-2',
      ships: '6-10',
      kt: '21-40',
    },
    chartererData: {
      years: '3-5',
      ships: '4-9',
      kt: '121 - 200',
      icon: usFlag,
      state: 'United States',
    },
  };

  const partyTermsMock = [
    {
      title: 'Charter party form',
      content: 'Charter party form',
    },
  ];

  const printRoleBasedSection = useMemo(() => {
    if (session?.role === ROLES.CHARTERER) {
      return <DetailsChartererContent title="Tanker Information" data={partyInformation} />;
    }
    if (session?.role === ROLES.OWNER) {
      return <DetailsOwnerContent title="Charterer Information" data={partyInformation} />;
    }
    return null;
  }, [session?.role, state?.chartererData, state.ownerData]);

  return (
    <div className="flex flex-col gap-y-2.5 mb-5">
      <div className="flex flex-col gap-y-2.5 3md:gap-y-0 3md:flex-row 3md:gap-x-2.5">
        {printRoleBasedSection}
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
            <TextRow title="Undisputed demurrage payment terms">{demurragePaymmentTerms}</TextRow>
            <TextRow title="Payment term">{paymentTerms}</TextRow>
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
                <IconComponent icon={usFlag} />
                {loadPort}
              </TextRow>
              <TextRow title="Load terminal">{loadTerminal}</TextRow>
            </div>

            <div className="mt-2.5">
              <TextRow title="Discharge port">
                <IconComponent icon={usFlag} />
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
            {partyTermsMock.map(({ title, content }) => (
              <PartyItem buttonText={title} modalTitle="All Additional Information" content={content} />
            ))}
          </FieldsetContent>
        </FieldsetWrapper>
      )}
    </div>
  );
};

DetailsContent.propTypes = DetailsContentPropTypes;

export default DetailsContent;
