'use client';

import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import NegotiatingExpandedContent from './NegotiatingExpandedContent';
import NegotiatingExpandedFooter from './NegotiatingExpandedFooter';
import ExpandableRow from '../ExpandableRow';

import { UrlPropTypes } from '@/lib/types';

import { chartererNegotiatingHeaderDataAdapter, ownerNegotiatingHeaderDataAdapter } from '@/adapters/negotiating';
import { ExpandableCardHeader, Loader, Title } from '@/elements';
import { NEGOTIATING_TABS } from '@/lib/constants';
import { getNegotiatingDataSelector } from '@/store/selectors';
import { getRoleIdentity } from '@/utils/helpers';

const NegotiatingDetails = ({ searchedParams }) => {
  const { role, toggle, loading, offers } = useSelector(getNegotiatingDataSelector);

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
        isOpened={Boolean(searchedParams?.status)}
      >
        <NegotiatingExpandedContent data={rowData} tab={searchedParams?.status} tabs={NEGOTIATING_TABS[role]} t />
      </ExpandableRow>
    );
  };

  const printContent = useMemo(() => {
    const searchedResult = offers.find((offer) => offer.id === searchedParams.tankerId);

    if (loading) return <Loader className="h-8 w-8 absolute top-1/2 z-0" />;
    if (searchedResult) return [searchedResult].map(printExpandableRow);

    return <Title level="3">Notification is outdated.</Title>;
  }, [loading, toggle, printExpandableRow]);

  return printContent;
};

NegotiatingDetails.propTypes = UrlPropTypes;

export default NegotiatingDetails;
