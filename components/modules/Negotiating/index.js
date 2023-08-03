'use client';

import { useMemo, useState } from 'react';

import { useSession } from 'next-auth/react';

import { chartererNegotiatingHeaderDataAdapter, ownerNegotiatingHeaderDataAdapter } from '@/adapters/negotiating';
import { ExpandableCardHeader, Label, Loader, Title } from '@/elements';
import { NAVIGATION_PARAMS, ROLES } from '@/lib/constants';
import { ExpandableRow } from '@/modules';
import NegotiatingExpandedContent from '@/modules/Negotiating/NegotiatingExpandedContent';
import NegotiatingExpandedFooter from '@/modules/Negotiating/NegotiatingExpandedFooter';
import { getUserNegotiating } from '@/services';
import { ComplexPagination, ToggleRows } from '@/units';
import { useFetch, useFilters } from '@/utils/hooks';

const ownerTabs = [
  {
    value: 'incoming',
    label: 'Incoming',
  },
  {
    value: 'counteroffers',
    label: 'Sent counteroffers',
  },
  {
    value: 'failed',
    label: 'Failed',
  },
];

const chartererTabs = [
  {
    value: 'incoming',
    label: 'Sent offers',
  },
  {
    value: 'counteroffers',
    label: 'Counteroffers',
  },
  {
    value: 'failed',
    label: 'Failed',
  },
];

const Negotiating = () => {
  const { data: session } = useSession();
  const isOwner = session?.role === ROLES.OWNER;
  const tabs = isOwner ? ownerTabs : chartererTabs;
  const [toggle, setToggle] = useState({ value: false });

  const [data, isLoading] = useFetch(getUserNegotiating(session?.role));

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
    [data, currentPage, numberOfPages, perPage]
  );

  const printExpandableRow = (rowData) => {
    const rowHeader = isOwner
      ? ownerNegotiatingHeaderDataAdapter({ data: rowData })
      : chartererNegotiatingHeaderDataAdapter({ data: rowData });
    return (
      <ExpandableRow
        key={rowData.id}
        className="pt-[60px]"
        header={<ExpandableCardHeader headerData={rowHeader} />}
        footer={<NegotiatingExpandedFooter isCharterer={!isOwner} />}
        expand={toggle}
      >
        <NegotiatingExpandedContent data={rowData} tabs={tabs} />
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
        <ToggleRows onToggleClick={setToggle} />
      </div>

      <div className="flex flex-col gap-y-2.5">{items && items.map(printExpandableRow)}</div>
      {printComplexPagination}
    </section>
  );
};
export default Negotiating;
