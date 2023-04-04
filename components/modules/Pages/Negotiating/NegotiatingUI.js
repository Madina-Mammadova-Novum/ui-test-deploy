'use client';

import React, { useState } from 'react';

import NegotiatingExpandedData from './NegotiatingExpandedData';
import ExpandableRowHeader from '../../ExpandableRowHeader';

import { ExpandableRow, Pagination, SimpleSelect } from '@/elements';
import ToggleRows from '@/ui/ToggleRows';
import { noSSR } from '@/utils/helpers';
import { negotiatingExpandableRowHeader } from '@/utils/mock';

const NegotiatingUi = () => {
  const [expandAll, setExpandAll] = useState({ value: false });
  const [pagination, setPagination] = useState({
    offersPerPage: 5,
    currentPage: 1,
  });
  return (
    <div>
      <div>
        <div className="uppercase text-[10px] text-gray font-bold">offer stage #1</div>
        <div className="flex justify-between items-center">
          <h1>Negotiating</h1>
          <ToggleRows
            onExpandClick={() => setExpandAll({ value: true })}
            onCollapseClick={() => setExpandAll({ value: false })}
          />
        </div>
      </div>

      <div className="mt-5">
        {negotiatingExpandableRowHeader.map((rowHeader) => (
          <ExpandableRow expandAll={expandAll} headerComponent={<ExpandableRowHeader headerData={rowHeader} />}>
            <NegotiatingExpandedData />
          </ExpandableRow>
        ))}
      </div>

      <div className="flex justify-between mt-5">
        <SimpleSelect
          onChange={(item) => setPagination((prevState) => ({ ...prevState, offersPerPage: item }))}
          currentItem={pagination.offersPerPage}
          selectableItems={[5, 10, 15]}
          label="offers per page:"
        />
        <Pagination pageCount={9} currentPage={1} />
        <SimpleSelect
          onChange={(item) => setPagination((prevState) => ({ ...prevState, currentPage: item }))}
          currentItem={pagination.currentPage}
          selectableItems={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          label="Go to page:"
        />
      </div>
    </div>
  );
};

export default noSSR(NegotiatingUi);
