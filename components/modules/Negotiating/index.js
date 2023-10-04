'use client';

import { useMemo, useState } from 'react';

import { useSession } from 'next-auth/react';

import { chartererNegotiatingHeaderDataAdapter, ownerNegotiatingHeaderDataAdapter } from '@/adapters/negotiating';
import { ExpandableCardHeader, Label, Loader, Title } from '@/elements';
import { NEGOTIATING_TABS, PAGE_STATE } from '@/lib/constants';
import { ExpandableRow } from '@/modules';
import NegotiatingExpandedContent from '@/modules/Negotiating/NegotiatingExpandedContent';
import NegotiatingExpandedFooter from '@/modules/Negotiating/NegotiatingExpandedFooter';
import { getUserNegotiating } from '@/services';
import { ComplexPagination, ToggleRows } from '@/units';
import { getRoleIdentity } from '@/utils/helpers';
import { useFetch, useFilters } from '@/utils/hooks';

const Negotiating = () => {
  const { data: session } = useSession();

  const [data, isLoading] = useFetch(getUserNegotiating(session?.role));
  const { isOwner } = getRoleIdentity({ role: session?.role });

  const [toggle, setToggle] = useState({ value: false });

  const tabs = isOwner ? NEGOTIATING_TABS.OWNER : NEGOTIATING_TABS.CHARTERER;
  const { page, pageSize } = PAGE_STATE;

  const { numberOfPages, items, currentPage, handlePageChange, handleSelectedPageChange, onChangeOffers, perPage } =
    useFilters({ initialPage: page, itemsPerPage: pageSize, data });

  const printExpandableRow = (rowData) => {
    const rowHeader = isOwner
      ? ownerNegotiatingHeaderDataAdapter({ data: rowData })
      : chartererNegotiatingHeaderDataAdapter({ data: rowData });
    return (
      <ExpandableRow
        key={rowData.id}
        className="pt-[60px]"
        header={
          <ExpandableCardHeader
            headerData={rowHeader}
            gridStyles={isOwner ? '2fr 1fr 1fr 1fr 2fr' : '1fr 1fr 2fr 2fr 1fr 1fr 1fr'}
          />
        }
        footer={<NegotiatingExpandedFooter isCharterer={!isOwner} cargoId={rowData?.id} />}
        expand={toggle}
      >
        <NegotiatingExpandedContent data={rowData} tabs={tabs} />
      </ExpandableRow>
    );
  };

  const printContent = useMemo(() => {
    if (isLoading) return <Loader className="h-8 w-8 absolute top-1/2 z-0" />;
    if (items) return items.map(printExpandableRow);

    return <Title level="3">No opened positions</Title>;
  }, [isLoading, items, printExpandableRow]);

  return (
    <section className="flex min-h-[90vh] flex-col gap-y-5">
      <div className="flex justify-between items-center pt-5">
        <div className="flex flex-col">
          <Label className="text-xs-sm">Offer stage #1</Label>
          <Title level="1">Negotiating</Title>
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
export default Negotiating;
