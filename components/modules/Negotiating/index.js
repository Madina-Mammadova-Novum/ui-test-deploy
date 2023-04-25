'use client';

import { useEffect, useState } from 'react';

import { Label, Loader, Title } from '@/elements';
import { ExpandableRow } from '@/modules';
import NegotiatingExpandedContent from '@/modules/Negotiating/NegotiatingExpandedContent';
import NegotiatingExpandedFooter from '@/modules/Negotiating/NegotiatingExpandedFooter';
import { getUserNegotiating } from '@/services';
import { ComplexPagination, ExpandableRowHeader, ToggleRows } from '@/units';

const Negotiating = () => {
  const [negotiatingData, setNegotiatingData] = useState(null);
  const [toggle, setToggle] = useState(false);

  const fetchData = async () => {
    const data = await getUserNegotiating();
    setNegotiatingData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return negotiatingData ? (
    <section>
      <div className="flex justify-between items-center py-5">
        <div className="flex flex-col">
          <Label className="text-xs-sm">Offer stage #1</Label>
          <Title level={1}>Negotiating</Title>
        </div>
        <ToggleRows value={toggle} onToggleClick={() => setToggle((prevState) => !prevState)} />
      </div>

      <div className="flex flex-col gap-y-2.5">
        {negotiatingData.map((rowHeader) => (
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
    </section>
  ) : (
    <Loader className="h-8 w-8 absolute top-1/2" />
  );
};

export default Negotiating;
