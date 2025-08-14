'use client';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { usePathname, useRouter } from 'next/navigation';

import NegotiatingExpandedContent from './NegotiatingExpandedContent';
import NegotiatingExpandedFooter from './NegotiatingExpandedFooter';
import ExpandableRow from '../ExpandableRow';

import { UrlPropTypes } from '@/lib/types';

import { chartererNegotiatingHeaderDataAdapter, ownerNegotiatingHeaderDataAdapter } from '@/adapters/negotiating';
import { ExpandableCardHeader, Loader, Title } from '@/elements';
import { NEGOTIATING_TABS } from '@/lib/constants';
import { setToggle } from '@/store/entities/negotiating/slice';
import { getNegotiatingDataSelector } from '@/store/selectors';
import { getRoleIdentity, notificationPathGenerator } from '@/utils/helpers';

const NegotiatingDetails = ({ searchedParams }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const { role, toggle, loading, offers } = useSelector(getNegotiatingDataSelector);

  const { isOwner } = getRoleIdentity({ role });

  useEffect(() => {
    dispatch(setToggle(true));
  }, []);

  // Stage validation and redirection logic
  useEffect(() => {
    const searchedResult = offers.find((offer) => offer.id === searchedParams.id);

    if (!searchedResult?.stage || !role || loading) return;

    // Check if current page matches the deal stage
    const isNegotiatingPage = pathname.startsWith('/negotiating');
    const shouldBeOnNegotiating = searchedResult.stage === 'Negotiating';

    if (!shouldBeOnNegotiating && isNegotiatingPage) {
      // Deal stage doesn't match current page, redirect to correct stage
      const correctRoute = notificationPathGenerator({
        data: searchedResult,
        role,
        isDocumentTab: searchedParams?.status === 'documents',
      });

      if (correctRoute) {
        router.push(correctRoute);
      }
    }
  }, [offers, searchedParams.id, role, loading, pathname, router, searchedParams?.status]);

  const printExpandableRow = (rowData, index) => {
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
        expand={index === 0 || toggle}
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
    if (searchedResult) return [searchedResult].map((rowData, index) => printExpandableRow(rowData, index));

    return <Title level="3">Notification is outdated.</Title>;
  }, [loading, toggle, offers, searchedParams.id, printExpandableRow]);

  return printContent;
};

NegotiatingDetails.propTypes = UrlPropTypes;

export default NegotiatingDetails;
