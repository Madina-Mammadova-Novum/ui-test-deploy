'use client';

import { useState } from 'react';

import PropTypes from 'prop-types';

import { Label, Title } from '@/elements';
import { ExpandableRow } from '@/modules';
import NegotiatingExpandedContent from '@/modules/Negotiating/NegotiatingExpandedContent';
import NegotiatingExpandedFooter from '@/modules/Negotiating/NegotiatingExpandedFooter';
import { ComplexPagination, ExpandableRowHeader, ToggleRows } from '@/units';
import { negotiatingHeaderData } from '@/utils/mock';

const Negotiating = ({ title, label }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center py-5">
        <div className="flex flex-col">
          <Label className="text-xs-sm">{label}</Label>
          <Title level={1}>{title}</Title>
        </div>
        <ToggleRows value={toggle} onToggleClick={() => setToggle((prevState) => !prevState)} />
      </div>

      <div className="flex flex-col gap-y-2.5">
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

      <ComplexPagination />
    </div>
  );
};

Negotiating.propTypes = {
  title: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Negotiating;
