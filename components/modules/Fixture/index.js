'use client';

import { useEffect, useState } from 'react';

import FixtureExpandedFooter from './FixtureExpandedFooter';

import { Label, Loader, Title } from '@/elements';
import { ExpandableRow } from '@/modules';
import { getUserFixtures } from '@/services';
import { ComplexPagination, ExpandableRowHeader, ToggleRows } from '@/units';

const Fixture = () => {
  const [fixtureData, setFixtureData] = useState(null);
  const [toggle, setToggle] = useState(false);

  const fetchData = async () => {
    const data = await getUserFixtures();
    setFixtureData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return fixtureData ? (
    <section>
      <div className="flex justify-between items-center py-5">
        <div className="flex flex-col">
          <Label className="text-xs-sm">Offer stage #4</Label>
          <Title level={1}>Fixture</Title>
        </div>
        <ToggleRows value={toggle} onToggleClick={() => setToggle((prevState) => !prevState)} />
      </div>

      <div className="flex flex-col gap-y-2.5">
        {fixtureData.map((headerData) => (
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
    </section>
  ) : (
    <Loader className="h-8 w-8 absolute top-1/2" />
  );
};

export default Fixture;
