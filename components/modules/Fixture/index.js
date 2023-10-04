'use client';

import { useMemo, useState } from 'react';

import FixtureExpandedContent from './FixtureExpandedContent';

import { fixtureHeaderDataAdapter, fixtureRowsDataAdapter } from '@/adapters/fixture';
import { ExpandableCardHeader, Label, Loader, Title } from '@/elements';
import { PAGE_STATE } from '@/lib/constants';
import { ExpandableRow } from '@/modules';
import { getUserFixtures } from '@/services';
import { ComplexPagination, ToggleRows } from '@/units';
import { useFetch, useFilters } from '@/utils/hooks';

const Fixture = () => {
  const [toggle, setToggle] = useState({ value: false });
  const [data, isLoading] = useFetch(getUserFixtures);

  const { page, pageSize } = PAGE_STATE;

  const { numberOfPages, items, currentPage, handlePageChange, handleSelectedPageChange, onChangeOffers, perPage } =
    useFilters({ initialPage: page, itemsPerPage: pageSize, data });

  const printExpandableRow = (headerData) => (
    <ExpandableRow
      header={
        <ExpandableCardHeader
          headerData={fixtureHeaderDataAdapter({ data: headerData })}
          gridStyles="1fr 2fr 1fr 1fr 2fr 1fr 1fr 1fr"
        />
      }
      expand={toggle}
    >
      <FixtureExpandedContent rowsData={fixtureRowsDataAdapter({ data: headerData.documentsInfo })} />
    </ExpandableRow>
  );

  const printContent = useMemo(() => {
    if (isLoading) return <Loader className="h-8 w-8 absolute top-1/2 z-0" />;
    if (items) return items.map(printExpandableRow);

    return <Title level="3">No opened positions</Title>;
  }, [isLoading, items, printExpandableRow]);

  return (
    <section className="flex min-h-[90vh] flex-col gap-y-5">
      <div className="flex justify-between items-center pt-5">
        <div className="flex flex-col">
          <Label className="text-xs-sm">Offer stage #4</Label>
          <Title level="1">Fixture</Title>
        </div>
        <ToggleRows onToggleClick={setToggle} />
      </div>
      <div className="flex flex-col gap-y-2.5 grow">{printContent}</div>
      <ComplexPagination
        label="fleets"
        perPage={perPage}
        currentPage={currentPage}
        numberOfPages={numberOfPages}
        onPageChange={handlePageChange}
        onSelectedPageChange={handleSelectedPageChange}
        onChangeOffers={onChangeOffers}
      />
    </section>
  );
};
export default Fixture;
