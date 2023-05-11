'use client';

import { useState } from 'react';

import FixtureExpandedFooter from './FixtureExpandedFooter';

import { Label, Loader, Title } from '@/elements';
import { NAVIGATION_PARAMS } from '@/lib/constants';
import { ExpandableRow } from '@/modules';
import { getUserFixtures } from '@/services';
import { ComplexPagination, ExpandableRowHeader, ToggleRows } from '@/units';
import { useFetch, useFilters } from '@/utils/hooks';

const Fixture = () => {
  const [toggle, setToggle] = useState(false);
  const [data, isLoading] = useFetch(getUserFixtures);

  const initialPagesStore = {
    currentPage: NAVIGATION_PARAMS.CURRENT_PAGE,
    perPage: NAVIGATION_PARAMS.DATA_PER_PAGE[0].value,
  };

  const {
    numberOfPages,
    items,
    currentPage,
    handlePageChange,
    handleSelectedPageChange,
    selectedPage,
    onChangeOffers,
    perPage,
  } = useFilters(initialPagesStore.perPage, initialPagesStore.currentPage, data);

  const printExpandableRow = (headerData) => (
    <ExpandableRow
      header={<ExpandableRowHeader headerData={headerData} />}
      footer={<FixtureExpandedFooter />}
      expand={toggle}
    >
      Content
    </ExpandableRow>
  );

  if (isLoading) {
    return <Loader className="h-8 w-8 absolute top-1/2" />;
  }

  return (
    <section>
      <div className="flex justify-between items-center py-5">
        <div className="flex flex-col">
          <Label className="text-xs-sm">Offer stage #4</Label>
          <Title level={1}>Fixture</Title>
        </div>
        <ToggleRows value={toggle} onToggleClick={() => setToggle((prevState) => !prevState)} />
      </div>

      <div className="flex flex-col gap-y-2.5">{items && items.map(printExpandableRow)}</div>

      <ComplexPagination
        currentPage={currentPage}
        numberOfPages={numberOfPages}
        onPageChange={handlePageChange}
        onSelectedPageChange={handleSelectedPageChange}
        pages={selectedPage}
        onChangeOffers={onChangeOffers}
        perPage={perPage}
      />
    </section>
  );
};
export default Fixture;
