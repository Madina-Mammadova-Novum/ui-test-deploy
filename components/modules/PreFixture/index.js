'use client';

import { useMemo, useState } from 'react';

import { useSession } from 'next-auth/react';

import PreFixtureExpandedContent from './PreFixtureExpandedContent';
import PreFixtureExpandedFooter from './PreFixtureExpandedFooter';

import {
  chartererPrefixtureHeaderDataAdapter,
  ownerPrefixtureHeaderDataAdapter,
  prefixtureDetailsAdapter,
} from '@/adapters';
import { ExpandableCardHeader, Label, Loader, Title } from '@/elements';
import { NAVIGATION_PARAMS } from '@/lib/constants';
import { ExpandableRow } from '@/modules';
import { getUserPreFixtures } from '@/services';
import { ComplexPagination, ToggleRows } from '@/units';
import { getRoleIdentity } from '@/utils/helpers';
import { useFetch, useFilters } from '@/utils/hooks';

const PreFixture = () => {
  const { data: session } = useSession();
  const { isOwner } = getRoleIdentity({ role: session?.role });
  const [toggle, setToggle] = useState({ value: false });
  const [data, isLoading] = useFetch(getUserPreFixtures(session?.role));

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

  const printExpandableRow = (rowData) => {
    const rowHeader = isOwner
      ? ownerPrefixtureHeaderDataAdapter({ data: rowData })
      : chartererPrefixtureHeaderDataAdapter({ data: rowData });
    return (
      <ExpandableRow
        key={rowData.id}
        header={<ExpandableCardHeader headerData={rowHeader} gridStyles="1fr 1fr 1fr 2fr 1fr 1fr 1fr 1fr" />}
        footer={
          <PreFixtureExpandedFooter
            underNegotiation={!rowData?.additionalCharterPartyTerms?.length}
            offerId={rowData.id}
          />
        }
        expand={toggle}
      >
        <PreFixtureExpandedContent detailsData={prefixtureDetailsAdapter({ data: rowData, role: session?.role })} />
      </ExpandableRow>
    );
  };
  const printComplexPagination = useMemo(
    () => (
      <ComplexPagination
        currentPage={currentPage}
        numberOfPages={numberOfPages}
        onPageChange={handlePageChange}
        onSelectedPageChange={handleSelectedPageChange}
        pages={selectedPage}
        onChangeOffers={onChangeOffers}
        perPage={perPage}
      />
    ),
    [currentPage, numberOfPages, selectedPage, perPage]
  );

  if (isLoading) {
    return <Loader className="h-8 w-8 absolute top-1/2" />;
  }

  return (
    <section>
      <div className="flex justify-between items-center py-5">
        <div className="flex flex-col">
          <Label className="text-xs-sm">Offer stage #2</Label>
          <Title level={1}>Pre-fixture</Title>
        </div>
        <ToggleRows onToggleClick={setToggle} />
      </div>

      <div className="flex flex-col gap-y-2.5">{items?.length && items.map(printExpandableRow)}</div>
      {printComplexPagination}
    </section>
  );
};

export default PreFixture;
