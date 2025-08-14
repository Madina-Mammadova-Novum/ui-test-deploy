'use client';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { usePathname, useRouter } from 'next/navigation';

import OnSubsExpandedContent from './OnSubsExpandedContent';
import OnSubsExpandedFooter from './OnSubsExpandedFooter';

import { UrlPropTypes } from '@/lib/types';

import {
  chartererOnSubsHeaderDataAdapter,
  onSubsDetailsAdapter,
  onSubsDocumentsTabRowsDataAdapter,
  ownerOnSubsHeaderDataAdapter,
} from '@/adapters';
import { ExpandableCardHeader, Loader, Title } from '@/elements';
import { ExpandableRow } from '@/modules';
import { getOfferDetails } from '@/services/offer';
import { updateDealData } from '@/store/entities/notifications/slice';
import { fetchOnSubsDealCountdownData } from '@/store/entities/on-subs/actions';
import { setToggle } from '@/store/entities/on-subs/slice';
import { getOnSubsDataSelector } from '@/store/selectors';
import { getRoleIdentity, notificationPathGenerator } from '@/utils/helpers';

const OnSubsDetails = ({ searchedParams }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const { loading, role, toggle, deal } = useSelector(getOnSubsDataSelector);
  const { isOwner, isCharterer } = getRoleIdentity({ role });

  useEffect(() => {
    dispatch(setToggle(true));

    return () => {
      dispatch(setToggle(false));
    };
  }, []);

  // Always refresh deal details by ID on mount or when params/role change
  useEffect(() => {
    const refreshDealDetails = async () => {
      try {
        const targetDealId = searchedParams?.dealId || deal?.id;
        if (!targetDealId || !role) return;
        const { data } = await getOfferDetails(targetDealId, role);
        if (data) {
          dispatch(updateDealData(data));
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to refresh on-subs deal details:', error);
      }
    };

    refreshDealDetails();
  }, [searchedParams?.dealId, deal?.id, role, dispatch]);

  // Fetch countdown data when deal changes
  useEffect(() => {
    if (deal?.id) {
      dispatch(fetchOnSubsDealCountdownData({ dealId: deal.id }))
        .unwrap()
        .then((countdownData) => {
          // Update the deal object in notifications state with countdown data
          dispatch(updateDealData(countdownData));
        })
        .catch((error) => {
          console.error('Failed to fetch countdown data for deal:', error);
        });
    }
  }, [deal?.id, dispatch]);

  // Stage validation and redirection logic
  useEffect(() => {
    if (!deal?.stage || !role || loading) return;

    // Check if current page matches the deal stage
    const isOnSubsPage = pathname.includes('/on-subs');
    const shouldBeOnSubs = deal.stage === 'On_Subs';

    if (!shouldBeOnSubs && isOnSubsPage) {
      // Deal stage doesn't match current page, redirect to correct stage
      const correctRoute = notificationPathGenerator({
        data: deal,
        role,
        isDocumentTab: searchedParams?.status === 'documents',
      });

      if (correctRoute) {
        router.push(correctRoute);
      }
    }
  }, [deal?.stage, role, loading, pathname, router, searchedParams?.status]);

  const printExpandableRow = (rowData, index) => {
    const rowHeader = isOwner
      ? ownerOnSubsHeaderDataAdapter({ data: rowData })
      : chartererOnSubsHeaderDataAdapter({ data: rowData });

    const { frozenAt, isFailed } = rowData;
    const isStatusSectionActive = isFailed || frozenAt;

    return (
      <ExpandableRow
        key={rowData?.id}
        header={
          <ExpandableCardHeader
            headerData={rowHeader}
            gridStyles={
              isOwner
                ? `1fr 2fr 1fr 1fr 2fr 1fr 1fr 1fr ${isStatusSectionActive ? '1fr' : ''}`
                : `1fr 2fr 1fr 1fr 2fr 1fr 1fr 1fr 1fr ${isStatusSectionActive ? '1fr' : ''}`
            }
          />
        }
        expand={index === 0 || toggle}
        className="px-5"
        footer={
          <OnSubsExpandedFooter
            offerId={rowData?.id}
            identity={{ isOwner, isCharterer }}
            underRecap={!rowData?.isCountdownActive}
          />
        }
      >
        <OnSubsExpandedContent
          offerId={rowData?.id}
          detailsData={onSubsDetailsAdapter({ data: rowData })}
          documentsData={onSubsDocumentsTabRowsDataAdapter({ data: rowData?.documents })}
          tab={searchedParams?.status}
        />
      </ExpandableRow>
    );
  };

  const printContent = useMemo(() => {
    if (loading) return <Loader className="absolute top-1/2 z-0 h-8 w-8" />;

    return [deal].map((rowData, index) => printExpandableRow(rowData, index)) || <Title>Outdated notification</Title>;
  }, [loading, toggle, searchedParams.id, deal]);

  return printContent;
};

OnSubsDetails.propTypes = UrlPropTypes;

export default OnSubsDetails;
