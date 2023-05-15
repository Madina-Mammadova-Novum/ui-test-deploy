'use client';

import { useState } from 'react';

import { chartererNegotiatingHeaderDataAdapter, ownerNegotiatingHeaderDataAdapter } from '@/adapters/negotiating';
import { ExpandableCardHeader, Label, Loader, Title } from '@/elements';
import { NAVIGATION_PARAMS } from '@/lib/constants';
import { ExpandableRow } from '@/modules';
import NegotiatingExpandedContent from '@/modules/Negotiating/NegotiatingExpandedContent';
import NegotiatingExpandedFooter from '@/modules/Negotiating/NegotiatingExpandedFooter';
import { getUserNegotiating } from '@/services';
import { ComplexPagination, ToggleRows } from '@/units';
import { useAuth, useFetch, useFilters } from '@/utils/hooks';

const Negotiating = () => {
  const [toggle, setToggle] = useState(false);
  const [data, isLoading] = useFetch(getUserNegotiating);
  const { user } = useAuth();
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
    const rowHeader = user.isCharterer
      ? chartererNegotiatingHeaderDataAdapter({ data: rowData })
      : ownerNegotiatingHeaderDataAdapter({ data: rowData });

    return (
      <ExpandableRow
        header={<ExpandableCardHeader headerData={rowHeader} />}
        footer={<NegotiatingExpandedFooter isCharterer />}
        expand={toggle}
      >
        <NegotiatingExpandedContent data={rowData} />
      </ExpandableRow>
    );
  };

  if (isLoading) {
    return <Loader className="h-8 w-8 absolute top-1/2" />;
  }

  return (
    <section>
      <div className="flex justify-between items-center py-5">
        <div className="flex flex-col">
          <Label className="text-xs-sm">Offer stage #1</Label>
          <Title level={1}>Negotiating</Title>
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
export default Negotiating;
