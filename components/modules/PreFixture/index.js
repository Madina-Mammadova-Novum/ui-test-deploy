'use client';

import { useEffect, useState } from 'react';

import PreFixtureExpandedContent from './PreFixtureExpandedContent';
import PreFixtureExpandedFooter from './PreFixtureExpandedFooter';

import { Label, Loader, Title } from '@/elements';
import { ExpandableRow } from '@/modules';
import { getUserPreFixtures } from '@/services';
import { ComplexPagination, ExpandableRowHeader, ToggleRows } from '@/units';

const PreFixture = () => {
  const [preFixtureData, setPreFixtureData] = useState(null);
  const [toggle, setToggle] = useState(false);

  const fetchData = async () => {
    const data = await getUserPreFixtures();
    setPreFixtureData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return preFixtureData ? (
    <section>
      <div className="flex justify-between items-center py-5">
        <div className="flex flex-col">
          <Label className="text-xs-sm">Offer stage #2</Label>
          <Title level={1}>Pre-fixture</Title>
        </div>
        <ToggleRows value={toggle} onToggleClick={() => setToggle((prevState) => !prevState)} />
      </div>

      <div className="flex flex-col gap-y-2.5">
        {preFixtureHeaderData.map((headerData, underNegotiation) => (
          <ExpandableRow
            header={<ExpandableRowHeader headerData={headerData} />}
            footer={<PreFixtureExpandedFooter underNegotiation={underNegotiation} />}
            expand={toggle}
          >
            <PreFixtureExpandedContent underNegotiation={underNegotiation} />
          </ExpandableRow>
        ))}
      </div>

      <ComplexPagination />
    </section>
  ) : (
    <Loader className="h-8 w-8 absolute top-1/2" />
  );
};

export default PreFixture;
