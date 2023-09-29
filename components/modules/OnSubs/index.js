'use client';

import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useSession } from 'next-auth/react';

import OnSubsExpandedContent from './OnSubsExpandedContent';
import OnSubsExpandedFooter from './OnSubsExpandedFooter';

import { chartererOnSubsHeaderDataAdapter, onSubsDetailsAdapter, ownerOnSubsHeaderDataAdapter } from '@/adapters';
import { ExpandableCardHeader, Label, Loader, Title } from '@/elements';
import { NAVIGATION_PARAMS } from '@/lib/constants';
import { ExpandableRow } from '@/modules';
import { fetchOnSubsOffers } from '@/store/entities/on-subs/actions';
import { onSubsSelector } from '@/store/selectors';
import { ComplexPagination, ToggleRows } from '@/units';
import { getRoleIdentity } from '@/utils/helpers';
import { useFilters } from '@/utils/hooks';

const OnSubs = () => {
  const { data: session } = useSession();
  const role = useMemo(() => session?.role, [session?.role]);
  const { isOwner } = getRoleIdentity({ role: session?.role });
  const [toggle, setToggle] = useState({ value: false });
  const dispatch = useDispatch();
  const {
    data: { offers, totalPages },
    loading,
  } = useSelector(onSubsSelector);
  const initialPagesStore = {
    currentPage: NAVIGATION_PARAMS.CURRENT_PAGE,
    perPage: NAVIGATION_PARAMS.DATA_PER_PAGE[0].value,
  };

  const { currentPage, handlePageChange, handleSelectedPageChange, selectedPage, onChangeOffers, perPage } = useFilters(
    initialPagesStore.perPage,
    initialPagesStore.currentPage,
    offers
  );

  useEffect(() => {
    if (role) {
      dispatch(fetchOnSubsOffers({ role: session?.role, page: currentPage, perPage }));
    }
  }, [role, currentPage, perPage]);

  const printExpandableRow = (rowData) => {
    const rowHeader = isOwner
      ? ownerOnSubsHeaderDataAdapter({ data: rowData })
      : chartererOnSubsHeaderDataAdapter({ data: rowData });

    return (
      <ExpandableRow
        header={
          <ExpandableCardHeader
            headerData={rowHeader}
            gridStyles={isOwner ? '1fr 2fr 1fr 1fr 2fr 1fr 1fr 1fr' : '1fr 1.5fr 1fr 1fr 2fr 1fr 1fr 1fr 1fr'}
          />
        }
        expand={toggle}
        footer={<OnSubsExpandedFooter underRecap />}
      >
        <OnSubsExpandedContent detailsData={onSubsDetailsAdapter({ data: rowData, role: session?.role })} />
      </ExpandableRow>
    );
  };

  const printComplexPagination = useMemo(
    () => (
      <ComplexPagination
        currentPage={currentPage}
        numberOfPages={totalPages}
        onPageChange={handlePageChange}
        onSelectedPageChange={handleSelectedPageChange}
        pages={selectedPage}
        onChangeOffers={onChangeOffers}
        perPage={perPage}
      />
    ),
    [currentPage, selectedPage, perPage]
  );

  if (loading) {
    return <Loader className="h-8 w-8 absolute top-1/2" />;
  }

  return (
    <section>
      <div className="flex justify-between items-center py-5">
        <div className="flex flex-col">
          <Label className="text-xs-sm">Offer stage #3</Label>
          <Title level={1}>On subs</Title>
        </div>
        <ToggleRows onToggleClick={setToggle} />
      </div>

      <div className="flex flex-col gap-y-2.5">{offers?.length && offers.map(printExpandableRow)}</div>
      {printComplexPagination}
    </section>
  );
};

export default OnSubs;
