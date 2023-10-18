'use client';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { chartererNegotiatingHeaderDataAdapter, ownerNegotiatingHeaderDataAdapter } from '@/adapters/negotiating';
import { ExpandableCardHeader, Loader, Title } from '@/elements';
import { NEGOTIATING_TABS, PAGE_STATE } from '@/lib/constants';
import { ExpandableRow } from '@/modules';
import NegotiatingExpandedContent from '@/modules/Negotiating/NegotiatingExpandedContent';
import NegotiatingExpandedFooter from '@/modules/Negotiating/NegotiatingExpandedFooter';
import { fetchUserNegotiating } from '@/store/entities/negotiating/actions';
import { getNegotiatingDataSelector } from '@/store/selectors';
import { getRoleIdentity } from '@/utils/helpers';
import { useFilters } from '@/utils/hooks';

const Negotiating = () => {
  const dispatch = useDispatch();
  const { offers, loading, role, toggle } = useSelector(getNegotiatingDataSelector);

  const { isOwner } = getRoleIdentity({ role });

  const { page, pageSize } = PAGE_STATE;

  const { currentPage, perPage } = useFilters({
    initialPage: page,
    itemsPerPage: pageSize,
    data: offers,
  });

  useEffect(() => {
    dispatch(fetchUserNegotiating({ page: currentPage, perPage }));
  }, [currentPage, perPage]);

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
        <NegotiatingExpandedContent data={rowData} tabs={NEGOTIATING_TABS[role]} />
      </ExpandableRow>
    );
  };

  const printContent = useMemo(() => {
    if (loading) return <Loader className="h-8 w-8 absolute top-1/2 z-0" />;
    if (offers) return offers.map(printExpandableRow);

    return <Title level="3">No opened positions</Title>;
  }, [loading, offers, toggle, printExpandableRow]);

  return printContent;
};
export default Negotiating;
