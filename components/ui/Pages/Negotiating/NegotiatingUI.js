'use client';

import React, { useState } from 'react';

import FleetRowHeader from '../../FleetRowHeader';
import NegotiatingExpandedData from './NegotiatingExpandedData';

import DoubleArrowSVG from '@/assets/images/doubleArrow.svg';
import { Button, ExpandableRow, Pagination, SimpleSelect } from '@/elements';
import { noSSR } from '@/utils/helpers';
import { negotiatingExpandableRowHeader } from '@/utils/mock';


const NegotiatingUi = () => {
  const [expandAll, setExpandAll] = useState(false);
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
          <div className="flex">
            <button
              type="button"
              className="flex gap-x-2.5 text-blue text-xsm pr-5 border-r border-gray-darker"
              onClick={() => setExpandAll({ value: true })}
            >
              <DoubleArrowSVG />
              <Button buttonProps={{ text: 'Expand all groups', variant: 'primary', size: 'small' }} />
            </button>
            <button
              type="button"
              className="flex gap-x-2.5 text-xsm pl-4"
              onClick={() => setExpandAll({ value: false })}
            >
              <DoubleArrowSVG />
              <Button buttonProps={{ text: 'Collapse all groups', variant: 'primary', size: 'small' }} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5">
        {negotiatingExpandableRowHeader.map((rowHeader) => (
          <ExpandableRow expandAll={expandAll} headerComponent={<FleetRowHeader headerData={rowHeader} />}>
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
