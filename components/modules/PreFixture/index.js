'use client';

import { useState } from 'react';

import PropTypes from 'prop-types';

import PreFixtureExpandedContent from './PreFixtureExpandedContent';
import PreFixtureExpandedFooter from './PreFixtureExpandedFooter';

import { Label, Loader, Title } from '@/elements';
import { ExpandableRow } from '@/modules';
import { ComplexPagination, ExpandableRowHeader, ToggleRows } from '@/units';
import { preFixtureHeaderData } from '@/utils/mock';

const PreFixture = ({ title, label }) => {
  const [toggle, setToggle] = useState(false);
  const [pagination, setPagination] = useState({
    offersPerPage: 5,
    currentPage: 1,
  });

  return preFixtureHeaderData.length ? (
    <div>
      <div className="flex justify-between items-center py-5">
        <div className="flex flex-col">
          <Label className="text-xs-sm">{label}</Label>
          <Title level={1}>{title}</Title>
        </div>
        <ToggleRows value={toggle} onToggleClick={() => setToggle((prevState) => !prevState)} />
      </div>

      <div className="flex flex-col gap-y-2.5">
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
  ) : (
    <Loader className="h-8 w-8 absolute top-1/2" />
  );
};

PreFixture.propTypes = {
  title: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default PreFixture;
