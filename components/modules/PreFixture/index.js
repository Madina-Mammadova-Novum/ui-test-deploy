'use client';

import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
import { fetchPrefixtureOffers } from '@/store/entities/pre-fixture/actions';
import { preFixtureSelector } from '@/store/selectors';
import { ComplexPagination, ToggleRows } from '@/units';
import { getRoleIdentity } from '@/utils/helpers';
import { useFilters } from '@/utils/hooks';

const PreFixture = () => {
  const { data: session } = useSession();
  const role = useMemo(() => session?.role, [session?.role]);
  const { isOwner } = getRoleIdentity({ role });
  const [toggle, setToggle] = useState({ value: false });
  const dispatch = useDispatch();
  const {
    data: { offers, totalPages },
    loading,
  } = useSelector(preFixtureSelector);

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
      dispatch(fetchPrefixtureOffers({ role: session?.role, page: currentPage, perPage }));
    }
  }, [role, currentPage, perPage]);

  const printExpandableRow = (rowData) => {
    const rowHeader = isOwner
      ? ownerPrefixtureHeaderDataAdapter({ data: rowData })
      : chartererPrefixtureHeaderDataAdapter({ data: rowData });
    return (
      <ExpandableRow
        key={rowData.id}
        header={<ExpandableCardHeader headerData={rowHeader} gridStyles="1fr 1fr 2fr 1fr 1fr 1fr 1fr 1fr" />}
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
          <Label className="text-xs-sm">Offer stage #2</Label>
          <Title level={1}>Pre-fixture</Title>
        </div>
        <ToggleRows onToggleClick={setToggle} />
      </div>

      <div className="flex flex-col gap-y-2.5">{offers?.length && offers.map(printExpandableRow)}</div>
      {printComplexPagination}
    </section>
  );
};

export default PreFixture;
