'use client';

import React, { useState } from 'react';

import FixtureExpandedFooter from './FixtureExpandedFooter';

import { ExpandableRow } from '@/modules';
import { ComplexPagination, ExpandableRowHeader, ToggleRows } from '@/units';
import { preFixtureHeaderData } from '@/utils/mock';

const Fixture = () => {
  const [toggle, setToggle] = useState(false);
  const [pagination, setPagination] = useState({
    offersPerPage: 5,
    currentPage: 1,
  });

  return (
    <div>
      <div className="flex items-center justify-end">
        <ToggleRows value={toggle} onToggleClick={() => setToggle((prevState) => !prevState)} />
      </div>

      <div className="flex flex-col gap-y-2.5 mt-5">
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

      <ComplexPagination pagination={pagination} setPagination={setPagination} />
    </div>
  );
};

export default Fixture;
