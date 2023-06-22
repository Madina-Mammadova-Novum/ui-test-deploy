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

const DetailsContent = ({ underNegotiation }) => {
  const { data: session } = useSession();

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
      return <DetailsChartererContent title="Tanker Information" data={state.chartererData} />;
    }
    if (session?.role === ROLES.OWNER) {
      return <DetailsOwnerContent title="Charterer Information" data={state.ownerData} />;
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
            <TextRow title="Cargo Type">Crude Oil</TextRow>
          </FieldsetContent>

          <FieldsetContent label="Products" className="mt-4">
            <div>
              <TextRow title="Product #1">Light Crude Oil</TextRow>
              <TextRow title="Density">0.764 mt/m³</TextRow>
              <TextRow title="Min quantity">24,118 tons</TextRow>
            </div>
            <div className="mt-4">
              <TextRow title="Product #2">Medium Crude Oil</TextRow>
              <TextRow title="Density">0.803 mt/m³</TextRow>
              <TextRow title="Min quantity">19,118 tons</TextRow>
            </div>
          </FieldsetContent>
        </FieldsetWrapper>
      </div>

      <div className="flex flex-col gap-y-2.5 3md:gap-y-0 3md:flex-row 3md:gap-x-2.5">
        <FieldsetWrapper>
          <Title level={3}>Commercial Offer Terms</Title>

          <FieldsetContent className="mt-2.5">
            <TextRow title="Freight">WS 110</TextRow>
            <TextRow title="Demurrage rate">$17,000 per day</TextRow>
            <TextRow title="Laytime + NOR">72 hrs + (6 + 6 hrs)</TextRow>
            <TextRow title="Undisputed demurrage payment terms">
              3 days undisputed demmurage to be paid along with freight
            </TextRow>
            <TextRow title="Payment term">Total freight amount to be paid before breaking bulk (BBB)</TextRow>
          </FieldsetContent>
        </FieldsetWrapper>

        <FieldsetWrapper>
          <Title level={3}>Voyage Details</Title>

          <FieldsetContent label="Dates" className="mt-2.5">
            <TextRow title="Laycan start">Dec 18, 2021</TextRow>
            <TextRow title="Laycan end">Dec 30, 2021</TextRow>
          </FieldsetContent>

          <FieldsetContent label="Ports" className="mt-4">
            <div>
              <TextRow title="Load port">
                <IconComponent icon={usFlag} />
                Barcelona, ESBCN
              </TextRow>
              <TextRow title="Load terminal">Oil terminal #1</TextRow>
            </div>

            <div className="mt-2.5">
              <TextRow title="Discharge port">
                <IconComponent icon={usFlag} />
                Benghazi, LYBEN
              </TextRow>
              <TextRow title="Discharge terminal">Oil terminal #4</TextRow>
            </div>
          </FieldsetContent>
        </FieldsetWrapper>
      </div>
      {!underNegotiation && (
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
