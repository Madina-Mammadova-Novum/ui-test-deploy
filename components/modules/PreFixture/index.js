'use client';

import React, { useState } from 'react';

import PreFixtureExpandedContent from './PreFixtureExpandedContent';
import PreFixtureExpandedFooter from './PreFixtureExpandedFooter';

import { ExpandableRow } from '@/modules';
import { ComplexPagination, ExpandableRowHeader, ToggleRows } from '@/units';
import { preFixtureHeaderData } from '@/utils/mock';

const PreFixture = () => {
  const [toggle, setToggle] = useState(false);
  const [pagination, setPagination] = useState({
    offersPerPage: 5,
    currentPage: 1,
  });

  return preFixtureHeaderData.length ? (
    <div>
      <div className="flex items-center justify-end">
        <ToggleRows value={toggle} onToggleClick={() => setToggle((prevState) => !prevState)} />
      </div>

      <div className="flex flex-col gap-y-2.5 mt-5">
        {preFixtureHeaderData.map((headerData, index) => (
          <ExpandableRow
            header={<ExpandableRowHeader headerData={headerData} />}
            footer={<PreFixtureExpandedFooter underNegotiation={index} />}
            expand={toggle}
          >
            <PreFixtureExpandedContent />
          </ExpandableRow>
        ))}
      </div>

      <ComplexPagination pagination={pagination} setPagination={setPagination} />
    </div>
  ) : null;
};

export default PreFixture;
