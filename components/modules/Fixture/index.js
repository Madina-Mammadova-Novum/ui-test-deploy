'use client';

import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FixtureExpandedContent from './FixtureExpandedContent';
import FixtureExpandedFooter from './FixtureExpandedFooter';

import {
  fixtureDetailsAdapter,
  fixtureDocumentsTabRowsDataAdapter,
  fixtureHeaderDataAdapter,
} from '@/adapters/fixture';
import { ExpandableCardHeader, Label, Loader, Title } from '@/elements';
import { PAGE_STATE } from '@/lib/constants';
import { ExpandableRow } from '@/modules';
import { fetchFixtureOffers } from '@/store/entities/fixture/actions';
import { fixtureSelector } from '@/store/selectors';
import { ComplexPagination, ToggleRows } from '@/units';
import { useFilters } from '@/utils/hooks';

const Fixture = () => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState({ value: false });

  const {
    data: { offers, totalPages },
    loading,
  } = useSelector(fixtureSelector);

  const { page, pageSize } = PAGE_STATE;

  const { currentPage, handlePageChange, handleSelectedPageChange, onChangeOffers, perPage } = useFilters({
    initialPage: page,
    itemsPerPage: pageSize,
    data: offers,
  });

  useEffect(() => {
    dispatch(fetchFixtureOffers({ page: currentPage, perPage }));
  }, [currentPage, perPage]);

  const printExpandableRow = (rowData) => {
    const rowHeader = fixtureHeaderDataAdapter({ data: rowData });

    return (
      <ExpandableRow
        header={<ExpandableCardHeader headerData={rowHeader} gridStyles="1fr 2fr 1fr 1fr 2fr 1fr 1fr 1fr" />}
        footer={<FixtureExpandedFooter drafted={!rowData?.isCountdownActive} />}
        expand={toggle}
      >
        <FixtureExpandedContent
          offerId={rowData?.id}
          detailsData={fixtureDetailsAdapter({ data: rowData })}
          documentsData={fixtureDocumentsTabRowsDataAdapter({ data: rowData?.documents })}
        />
      </ExpandableRow>
    );
  };

  const printContent = useMemo(() => {
    if (loading) return <Loader className="h-8 w-8 absolute top-1/2 z-0" />;
    if (offers?.length) return offers.map(printExpandableRow);

    return <Title level="3">No offers at current stage</Title>;
  }, [loading, offers, printExpandableRow]);

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
        label="offers"
        perPage={perPage}
        currentPage={currentPage}
        numberOfPages={totalPages}
        onPageChange={handlePageChange}
        onSelectedPageChange={handleSelectedPageChange}
        onChangeOffers={onChangeOffers}
      />
    </section>
  );
};
export default Fixture;
