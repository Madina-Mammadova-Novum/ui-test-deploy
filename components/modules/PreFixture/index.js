'use client';

import React, { useState } from 'react';

import PreFixtureExpandedContent from './PreFixtureExpandedContent';
import PreFixtureExpandedFooter from './PreFixtureExpandedFooter';

import { ExpandableRow } from '@/modules';
import { ExpandableRowHeader, ToggleRows } from '@/units';
import { preFixtureHeaderData } from '@/utils/mock';


const PreFixture = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-end">
        <ToggleRows value={toggle} onToggleClick={() => setToggle((prevState) => !prevState)} />
      </div>

      <div>
        {preFixtureHeaderData.map((headerData) => (
          <ExpandableRow
            header={<ExpandableRowHeader headerData={headerData} />}
            footer={<PreFixtureExpandedFooter />}
            expand={toggle}
          >
            <PreFixtureExpandedContent />
          </ExpandableRow>
        ))}
      </div>
    </div>
  );
};

export default PreFixture;
