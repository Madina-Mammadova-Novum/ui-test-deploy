'use client';

import React, { useState } from 'react';

import { ExpandableRow } from '@/modules';
import NegotiatingExpandedContent from '@/modules/Negotiating/NegotiatingExpandedContent';
import NegotiatingExpandedFooter from '@/modules/Negotiating/NegotiatingExpandedFooter';
import { ComplexPagination, ExpandableRowHeader, ToggleRows } from '@/units';
import { negotiatingHeaderData } from '@/utils/mock';

const Negotiating = () => {
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
        {negotiatingHeaderData.map((rowHeader) => (
          <ExpandableRow
            header={<ExpandableRowHeader headerData={rowHeader} />}
            footer={<NegotiatingExpandedFooter isCharterer />}
            expand={toggle}
          >
            <NegotiatingExpandedContent />
          </ExpandableRow>
        ))}
      </div>

      <ComplexPagination pagination={pagination} setPagination={setPagination} />
    </div>
  );
};

export default Negotiating;
