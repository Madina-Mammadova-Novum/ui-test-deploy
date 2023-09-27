'use client';

import { useMemo, useState } from 'react';

import { useSession } from 'next-auth/react';

import OnSubsExpandedContent from './OnSubsExpandedContent';
import OnSubsExpandedFooter from './OnSubsExpandedFooter';

import { ownerOnSubsHeaderDataAdapter } from '@/adapters';
import { ExpandableCardHeader, Label, Loader, Title } from '@/elements';
import { PAGE_STATE } from '@/lib/constants';
import { ExpandableRow } from '@/modules';
import { getUserOnSubs } from '@/services';
import { ComplexPagination, ToggleRows } from '@/units';
import { getRoleIdentity } from '@/utils/helpers';
import { useFetch, useFilters } from '@/utils/hooks';

const OnSubs = () => {
  const { data: session } = useSession();

  const [data, isLoading] = useFetch(getUserOnSubs);
  const [toggle, setToggle] = useState({ value: false });

  const { isOwner } = getRoleIdentity({ role: session?.role });

  const { page, pageSize } = PAGE_STATE;

  const { numberOfPages, items, currentPage, handlePageChange, handleSelectedPageChange, onChangeOffers, perPage } =
    useFilters({ initialPage: page, itemsPerPage: pageSize, data });

  const printExpandableRow = (rowData, underRecap) => {
    const rowHeader = ownerOnSubsHeaderDataAdapter({ data: rowData });

    return (
      <ExpandableRow
        header={
          <ExpandableCardHeader
            headerData={rowHeader}
            gridStyles={isOwner ? '1fr 2fr 1fr 1fr 2fr 1fr 1fr 1fr' : '1fr 2fr 1fr 1fr 2fr 1fr 1fr 1fr 1fr'}
          />
        }
        expand={toggle}
        footer={<OnSubsExpandedFooter underRecap={underRecap} />}
      >
        <OnSubsExpandedContent />
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
      <div className="flex justify-between items-center py-5">
        <div className="flex flex-col">
          <Label className="text-xs-sm">Offer stage #3</Label>
          <Title level="1">On subs</Title>
        </div>
        <ToggleRows onToggleClick={setToggle} />
      </div>
      <div className="grow flex flex-col gap-y-2.5">{printContent}</div>
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

export default OnSubs;
