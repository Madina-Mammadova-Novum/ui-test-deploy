import React from 'react';

import usFlag from '@/assets/images/flag.png';
import { TextRow, Title } from '@/elements';

const ExpandedContent = () => {
  return (
    <div className="mt-3 mb-5">
      <Title component="h3">Tanker Information</Title>

      <div className="md:flex text-xsm mt-2.5 gap-x-20">
        <div>
          <Title component="h5" className="text-[12px] text-gray font-semibold mb-1.5 uppercase">
            About the Vessel Owner
          </Title>
          <TextRow title="Years in Operation" subtitle="3-5 years" />
          <TextRow title="Number of Tankers" subtitle="6-10 tankers" />
          <TextRow title="Estimated average tanker DWT" subtitle="21-40 kt" />
        </div>

        <div className="mt-2.5 md:mt-0">
          <Title component="h5" className="text-[12px] text-gray font-semibold mb-1.5 uppercase">
            About the Tanker
          </Title>
          <div className="flex gap-x-10">
            <div>
              <TextRow title="Ship age" subtitle="≤ 5" />
              <TextRow title="Cubic capacity 98%" subtitle="25,*** m³" />
              <TextRow title="Number of Segregations" subtitle="5" />
              <TextRow title="LOA" subtitle="100 m" />
              <TextRow title="Beam" subtitle="23 m" />
              <TextRow title="Type of Hull" subtitle="Double Hull" />
            </div>

            <div>
              <TextRow title="Country of Registered Owner" subtitle="Turkey" icon={usFlag} />
              <TextRow title="Country of Disponent Owner" subtitle="The Netherlands" icon={usFlag} />
              <TextRow title="Country of Technical Operator" subtitle="The Netherlands" icon={usFlag} />
              <TextRow title="Country of Commercial Operator" subtitle="Turkey" icon={usFlag} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedContent;
