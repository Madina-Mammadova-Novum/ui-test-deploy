import ReactCountryFlag from 'react-country-flag';

import { Divider, FieldsetContent, FieldsetWrapper, TextRow, Title } from '@/elements';
// import { PartyItem } from '@/units';

// const partyTermsMock = [
//   {
//     title: 'Charter party form',
//     content: 'Charter party form',
//   },
// ];

const FixtureDetailsContent = () => {
  return (
    <div className="flex flex-col gap-y-2.5 mb-5">
      <div className="flex flex-col gap-y-2.5 3md:gap-y-0 3md:flex-row 3md:gap-x-2.5">
        <FieldsetWrapper>
          <Title level={3}>Charterer Information</Title>
          <FieldsetContent className="mt-2.5">
            <TextRow title="Charterer">OTAKOYI LLC</TextRow>
            <TextRow title="Registration Adress">80A 28 May St, Baku 1010, Azerbaijan</TextRow>
            <TextRow title="Correspondence Adress">80A 28 May St, Baku 1010, Azerbaijan</TextRow>
          </FieldsetContent>
        </FieldsetWrapper>

        <FieldsetWrapper>
          <Title level={3}>Tanker Information</Title>

          <FieldsetContent className="mt-2.5">
            <TextRow title="Registered owner">123</TextRow>
            <TextRow title="Technical operator">123</TextRow>
            <TextRow title="Commercial operator">123</TextRow>
            <TextRow title="Disponent owner">123</TextRow>
            <TextRow title="Tanker name">
              <ReactCountryFlag countryCode="us" /> Harvey Deep Sea
            </TextRow>
            <TextRow title="Itinerary">Tanker free of cargo in BSEA</TextRow>
          </FieldsetContent>

          <Divider className="mt-4" />

          <FieldsetContent label="last 3 cargoes" className="mt-4">
            <div className="flex">
              <TextRow title="Last cargo" className="flex flex-col w-full">
                Light Crude Oil
              </TextRow>
              <TextRow title="2nd last" className="flex flex-col w-full">
                Toluene
              </TextRow>
              <TextRow title="3rd last" className="flex flex-col w-full">
                Kerosene
              </TextRow>
            </div>
          </FieldsetContent>

          <Divider className="mt-4" />

          <FieldsetContent className="mt-4">
            <TextRow title="Last sire">Dec 18, 2021/Rijeka</TextRow>
            <TextRow title="Approvals">Philips 66 - BHP - Koch - Shell - Saras - Primorsk - MTM</TextRow>
          </FieldsetContent>
        </FieldsetWrapper>
      </div>

      <div className="flex flex-col gap-y-2.5 3md:gap-y-0 3md:flex-row 3md:gap-x-2.5">
        <FieldsetWrapper>
          <Title level={3}>Cargo Details</Title>

          <FieldsetContent className="mt-2.5">
            <TextRow title="Cargo Type">Crude Oil</TextRow>
            <TextRow title="Heat">Not aplicable</TextRow>
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

        <FieldsetWrapper>
          <Title level={3}>Voyage Details</Title>

          <FieldsetContent label="Dates" className="mt-2.5">
            <TextRow title="Laycan start">Dec 18, 2021</TextRow>
            <TextRow title="Laycan end">Dec 30, 2021</TextRow>
          </FieldsetContent>

          <FieldsetContent label="Ports" className="mt-4">
            <div>
              <TextRow title="Load port">
                <ReactCountryFlag countryCode="us" /> Barcelona, ESBCN
              </TextRow>
              <TextRow title="Load terminal">Oil terminal #1</TextRow>
            </div>

            <div className="mt-2.5">
              <TextRow title="Discharge port#1">
                <ReactCountryFlag countryCode="us" /> Benghazi, LYBEN
              </TextRow>
              <TextRow title="Discharge terminal">Oil terminal #1</TextRow>
            </div>

            <div className="mt-2.5">
              <TextRow title="Discharge port#2">
                <ReactCountryFlag countryCode="us" /> Batumi, GEBUS
              </TextRow>
              <TextRow title="Discharge terminal">Oil terminal #2</TextRow>
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

          <FieldsetContent label="Bank details" className="mt-2.5">
            <Title level={4}>Batronix Bank Account</Title>

            <div className="mt-1.5">
              <TextRow title="Account Number">0710 8079 00</TextRow>
              <TextRow title="Bank Code">21040010</TextRow>
              <TextRow title="BIC (SWIFT-CODE)">COBADEFFXXX</TextRow>
              <TextRow title="IBAN">DE19 2104 0010 0710 8079 00</TextRow>
              <TextRow title="Bank Address">Commerzbank Kiel, Holstenstrase 64, Germany</TextRow>
            </div>
          </FieldsetContent>
        </FieldsetWrapper>

        <FieldsetWrapper>
          <Title level={3}>Additional Charter Party Terms</Title>

          <FieldsetContent className="mt-3.5 flex gap-2.5">
            {/* {partyTermsMock.map(({ title, content }) => (
              <PartyItem buttonText={title} modalTitle="Tanker Voyage Charter Party" content={content} />
            ))} */}
          </FieldsetContent>
        </FieldsetWrapper>
      </div>
    </div>
  );
};

FixtureDetailsContent.propTypes = {};

export default FixtureDetailsContent;
