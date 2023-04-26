import PartyTermsItem from './PartyTermsItem';

import { DetailsContentPropTypes } from '@/lib/types';

import usFlag from '@/assets/images/flag.png';
import { FieldsetContent, FieldsetWrapper, IconComponent, TextRow, Title } from '@/elements';

const partyTermsMock = [
  {
    title: 'Charter party form',
    content: 'Charter party form',
  },
];

const DetailsContent = ({ underNegotiation }) => {
  return (
    <div className="flex flex-col gap-y-2.5 mb-5">
      <div className="flex flex-col gap-y-2.5 3md:gap-y-0 3md:flex-row 3md:gap-x-2.5">
        <FieldsetWrapper>
          <Title level={3}>Charterer Information</Title>
          <FieldsetContent className="mt-2.5">
            <TextRow title="Years of Operation">3-5 years</TextRow>
            <TextRow title="Estimated Number of Charters per Year">4-9 charters</TextRow>
            <TextRow title="Average Tonnage per Charter">121 - 200 kt</TextRow>
            <TextRow title="Country of registration">
              <IconComponent icon={usFlag} /> United States
            </TextRow>
          </FieldsetContent>
        </FieldsetWrapper>

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
              <PartyTermsItem title={title} content={content} />
            ))}
          </FieldsetContent>
        </FieldsetWrapper>
      )}
    </div>
  );
};

DetailsContent.propTypes = DetailsContentPropTypes;

export default DetailsContent;
