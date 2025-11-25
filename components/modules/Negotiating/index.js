'use client';

import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { chartererNegotiatingHeaderDataAdapter, ownerNegotiatingHeaderDataAdapter } from '@/adapters/negotiating';
import { DynamicLoader, ExpandableCardHeader, Title } from '@/elements';
import { NEGOTIATING_TABS } from '@/lib/constants';
import { ExpandableRow } from '@/modules';
import NegotiatingExpandedContent from '@/modules/Negotiating/NegotiatingExpandedContent';
import NegotiatingExpandedFooter from '@/modules/Negotiating/NegotiatingExpandedFooter';
import { getNegotiatingDataSelector } from '@/store/selectors';
import { getRoleIdentity } from '@/utils/helpers';

const Negotiating = () => {
  const { offers, loading, toggle, role, initialTab, expandedParentId } = useSelector(getNegotiatingDataSelector);

  const { isOwner } = getRoleIdentity({ role });

  const printExpandableRow = (rowData, index) => {
    const rowHeader = isOwner
      ? ownerNegotiatingHeaderDataAdapter({ data: rowData })
      : chartererNegotiatingHeaderDataAdapter({ data: rowData });

    // Determine if this card should be expanded
    const shouldExpand = expandedParentId ? rowData.id === expandedParentId : toggle !== null ? toggle : index === 0;

    return (
      <ExpandableRow
        key={rowData.id}
        className="px-5 pt-14"
        header={
          <ExpandableCardHeader
            headerData={rowHeader}
            gridStyles={isOwner ? '1.5fr 1fr 1fr 1fr 2fr' : '1fr 1fr 1fr 1.5fr 1fr 1fr 1fr'}
          />
        }
        footer={<NegotiatingExpandedFooter isCharterer={!isOwner} cargoId={rowData?.id} />}
        expand={shouldExpand}
      >
        <NegotiatingExpandedContent
          data={rowData}
          tabs={NEGOTIATING_TABS[role]}
          tab={index === 0 ? initialTab : null} // Set `tab` prop based on `index`
        />
      </ExpandableRow>
    );
  };

  const printContent = useMemo(() => {
    if (loading) return <DynamicLoader />;
    if (offers?.length) return offers.map((rowData, index) => printExpandableRow(rowData, index));

    return <Title level="3">No offers at the current stage</Title>;
  }, [loading, offers, toggle, initialTab, expandedParentId, printExpandableRow]);

  return printContent;
};

export default Negotiating;
