'use client';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NegotiatingExpandedContent from './NegotiatingExpandedContent';
import NegotiatingExpandedFooter from './NegotiatingExpandedFooter';
import ExpandableRow from '../ExpandableRow';

import { UrlPropTypes } from '@/lib/types';

import { chartererNegotiatingHeaderDataAdapter, ownerNegotiatingHeaderDataAdapter } from '@/adapters/negotiating';
import { ExpandableCardHeader, Loader, Title } from '@/elements';
import { NEGOTIATING_TABS } from '@/lib/constants';
import { setToggle } from '@/store/entities/negotiating/slice';
import { getNegotiatingDataSelector } from '@/store/selectors';
import { getRoleIdentity } from '@/utils/helpers';

const NegotiatingDetails = ({ searchedParams }) => {
  const dispatch = useDispatch();

  const { role, toggle, loading, offers } = useSelector(getNegotiatingDataSelector);

  const { isOwner } = getRoleIdentity({ role });

  useEffect(() => {
    dispatch(setToggle(true));
  }, []);

  const printExpandableRow = (rowData) => {
    const rowHeader = isOwner
      ? ownerNegotiatingHeaderDataAdapter({ data: rowData })
      : chartererNegotiatingHeaderDataAdapter({ data: rowData });

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
        expand={toggle}
      >
        <NegotiatingExpandedContent
          tab={searchedParams.status}
          data={{ ...rowData, fleetId: searchedParams.fleetId }}
          tabs={NEGOTIATING_TABS[role]}
        />
      </ExpandableRow>
    );
  };

  const printContent = useMemo(() => {
    const searchedResult = offers.find((offer) => offer.id === searchedParams.id);

    if (loading) return <Loader className="absolute top-1/2 z-0 h-8 w-8" />;
    if (searchedResult) return [searchedResult].map(printExpandableRow);

    return <Title level="3">Notification is outdated.</Title>;
  }, [loading, toggle, offers, searchedParams.id, printExpandableRow]);

  return printContent;
};

NegotiatingDetails.propTypes = UrlPropTypes;

export default NegotiatingDetails;
