'use client';

import { useState } from 'react';

import FixtureExpandedFooter from './FixtureExpandedFooter';

import { Label, Title } from '@/elements';
import { ExpandableRow } from '@/modules';
import { ComplexPagination, ExpandableRowHeader, ToggleRows } from '@/units';
import { preFixtureHeaderData } from '@/utils/mock';

const Fixture = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center py-5">
        <div className="flex flex-col">
          <Label className="text-xs-sm">Offer stage #4</Label>
          <Title level={1}>Fixture</Title>
        </div>
        <ToggleRows value={toggle} onToggleClick={() => setToggle((prevState) => !prevState)} />
      </div>

      <div className="flex flex-col gap-y-2.5">
        {preFixtureHeaderData.map((headerData) => (
          <ExpandableRow
            header={<ExpandableRowHeader headerData={headerData} />}
            footer={<FixtureExpandedFooter />}
            expand={toggle}
          >
            Content
          </ExpandableRow>
        ))}
      </div>

      <ComplexPagination />
    </div>
  );
};

export default Fixture;
