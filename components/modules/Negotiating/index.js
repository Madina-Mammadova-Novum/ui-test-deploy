'use client';

import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { chartererNegotiatingHeaderDataAdapter, ownerNegotiatingHeaderDataAdapter } from '@/adapters/negotiating';
import { ExpandableCardHeader, Loader, Title } from '@/elements';
import { NEGOTIATING_TABS } from '@/lib/constants';
import { ExpandableRow } from '@/modules';
import NegotiatingExpandedContent from '@/modules/Negotiating/NegotiatingExpandedContent';
import NegotiatingExpandedFooter from '@/modules/Negotiating/NegotiatingExpandedFooter';
import { getNegotiatingDataSelector } from '@/store/selectors';
import { getRoleIdentity } from '@/utils/helpers';

const Negotiating = () => {
  const { offers, loading, toggle, role } = useSelector(getNegotiatingDataSelector);

  const { isOwner } = getRoleIdentity({ role });

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
    if (offers?.length) return offers.map(printExpandableRow);

    return <Title level="3">No offers at current stage</Title>;
  }, [loading, offers, toggle, printExpandableRow]);

  return printContent;
};
export default Negotiating;
