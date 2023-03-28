import React from 'react';

import usFlag from '@/assets/images/flag.png';
import { IconComponent, TextRow, Title } from '@/elements';

const ExpandedContent = () => {
  return (
    <div className="mt-3 mb-5">
      <Title component="h3">Tanker Information</Title>

      <div className="md:flex text-xsm mt-2.5 gap-x-20">
        <div>
          <Title component="h5" className="text-[12px] text-gray font-semibold mb-1.5 uppercase">
            About the Vessel Owner
          </Title>
          <TextRow title="Years in Operation">3-5 years</TextRow>
          <TextRow title="Number of Tankers">6-10 tankers</TextRow>
          <TextRow title="Estimated average tanker DWT">21-40 kt</TextRow>
        </div>

        <div className="mt-2.5 md:mt-0">
          <Title component="h5" className="text-[12px] text-gray font-semibold mb-1.5 uppercase">
            About the Tanker
          </Title>
          <div className="flex gap-x-10">
            <div>
              <TextRow title="Ship age">≤ 5</TextRow>
              <TextRow title="Cubic capacity 98%">25,*** m³</TextRow>
              <TextRow title="Number of Segregations">5</TextRow>
              <TextRow title="LOA">100 m</TextRow>
              <TextRow title="Beam">23 m</TextRow>
              <TextRow title="Type of Hull">Double Hull</TextRow>
            </div>

            <div>
              <TextRow title="Country of Registered Owner">
                <IconComponent icon={usFlag} />
                Turkey
              </TextRow>
              <TextRow title="Country of Disponent Owner">
                <IconComponent icon={usFlag} />
                The Netherlands
              </TextRow>
              <TextRow title="Country of Technical Operator">
                <IconComponent icon={usFlag} />
                The Netherlands
              </TextRow>
              <TextRow title="Country of Commercial Operator">
                <IconComponent icon={usFlag} />
                Turkey
              </TextRow>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedContent;
