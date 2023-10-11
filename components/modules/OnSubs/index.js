'use client';

import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useSession } from 'next-auth/react';

import OnSubsExpandedContent from './OnSubsExpandedContent';
import OnSubsExpandedFooter from './OnSubsExpandedFooter';

import {
  chartererOnSubsHeaderDataAdapter,
  onSubsDetailsAdapter,
  onSubsDocumentsTabRowsDataAdapter,
  ownerOnSubsHeaderDataAdapter,
} from '@/adapters';
import { ExpandableCardHeader, Label, Loader, Title } from '@/elements';
import { PAGE_STATE } from '@/lib/constants';
import { ExpandableRow } from '@/modules';
import { fetchOnSubsOffers } from '@/store/entities/on-subs/actions';
import { onSubsSelector } from '@/store/selectors';
import { ComplexPagination, ToggleRows } from '@/units';
import { getRoleIdentity } from '@/utils/helpers';
import { useFilters } from '@/utils/hooks';

const OnSubs = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [toggle, setToggle] = useState({ value: false });

  const { isOwner } = getRoleIdentity({ role: session?.role });
  const {
    data: { offers, totalPages },
    loading,
  } = useSelector(onSubsSelector);

  const { page, pageSize } = PAGE_STATE;

  const { currentPage, handlePageChange, handleSelectedPageChange, onChangeOffers, perPage } = useFilters({
    initialPage: page,
    itemsPerPage: pageSize,
    data: offers,
  });

  useEffect(() => {
    dispatch(fetchOnSubsOffers({ page: currentPage, perPage }));
  }, [currentPage, perPage]);

  const printExpandableRow = (rowData) => {
    const rowHeader = isOwner
      ? ownerOnSubsHeaderDataAdapter({ data: rowData })
      : chartererOnSubsHeaderDataAdapter({ data: rowData });

    const scriveURL = isOwner ? rowData?.ownerDocumentSignUrl : rowData?.chartererDocumentSignUrl;

    return (
      <ExpandableRow
        header={
          <ExpandableCardHeader
            headerData={rowHeader}
            gridStyles={isOwner ? '1fr 2fr 1fr 1fr 2fr 1fr 1fr 1fr' : '1fr 1.5fr 1.5fr 1fr 1.5fr 1fr 1fr 1fr 1fr'}
          />
        }
        expand={toggle}
        footer={
          <OnSubsExpandedFooter
            underRecap={!rowData?.isCountdownActive}
            offerId={rowData?.id}
            scriveURL={scriveURL || ''}
          />
        }
      >
        <OnSubsExpandedContent
          offerId={rowData?.id}
          detailsData={onSubsDetailsAdapter({ data: rowData })}
          documentsData={onSubsDocumentsTabRowsDataAdapter({ data: rowData?.documents })}
        />
      </ExpandableRow>
    );
  };

  const printContent = useMemo(() => {
    if (loading) return <Loader className="h-8 w-8 absolute top-1/2 z-0" />;
    if (offers) return offers.map(printExpandableRow);

    return <Title level="3">No offers at current stage</Title>;
  }, [loading, offers, printExpandableRow]);

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

export default OnSubs;
