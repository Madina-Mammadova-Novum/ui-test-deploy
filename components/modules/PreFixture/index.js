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
  prefixtureDocumentsTabRowsDataAdapter,
} from '@/adapters';
import { ExpandableCardHeader, Label, Loader, Title } from '@/elements';
import { PAGE_STATE } from '@/lib/constants';
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
    loading,
    data: { offers, totalPages },
  } = useSelector(preFixtureSelector);

  const { page, pageSize } = PAGE_STATE;

  const { currentPage, handlePageChange, handleSelectedPageChange, selectedPage, onChangeOffers, perPage } = useFilters(
    { initialPage: page, itemsPerPage: pageSize, data: offers }
  );

  useEffect(() => {
    if (role) {
      dispatch(fetchPrefixtureOffers({ role, page: currentPage, perPage }));
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
        <PreFixtureExpandedContent
          detailsData={prefixtureDetailsAdapter({ data: rowData, role: session?.role })}
          documentsData={prefixtureDocumentsTabRowsDataAdapter({ data: rowData?.documents })}
          offerId={rowData?.id}
        />
      </ExpandableRow>
    );
  };

  const printContent = useMemo(() => {
    if (loading) return <Loader className="h-8 w-8 absolute top-1/2 z-0" />;
    if (offers) return offers.map(printExpandableRow);

    return <Title level="3">No pre-fixture positions</Title>;
  }, [loading, offers, printExpandableRow]);

  return (
    <section className="flex min-h-[90vh] flex-col gap-y-5">
      <div className="flex justify-between items-center pt-5">
        <div className="flex flex-col">
          <Label className="text-xs-sm">Offer stage #2</Label>
          <Title level="1">Pre-fixture</Title>
        </div>
        <ToggleRows onToggleClick={setToggle} />
      </div>
      <div className="flex flex-col gap-y-2.5 grow">{printContent}</div>
      <ComplexPagination
        currentPage={currentPage}
        numberOfPages={totalPages}
        onPageChange={handlePageChange}
        onSelectedPageChange={handleSelectedPageChange}
        pages={selectedPage}
        onChangeOffers={onChangeOffers}
        perPage={perPage}
      />
    </section>
  );
};

export default PreFixture;
