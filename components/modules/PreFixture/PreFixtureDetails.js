'use client';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { usePathname, useRouter } from 'next/navigation';

import PreFixtureExpandedContent from './PreFixtureExpandedContent';
import PreFixtureExpandedFooter from './PreFixtureExpandedFooter';

import { UrlPropTypes } from '@/lib/types';

import {
  chartererPrefixtureHeaderDataAdapter,
  ownerPrefixtureHeaderDataAdapter,
  prefixtureDetailsAdapter,
  prefixtureDocumentsTabRowsDataAdapter,
} from '@/adapters';
import { ExpandableCardHeader, Loader, Title } from '@/elements';
import { ExpandableRow } from '@/modules';
import { getOfferDetails } from '@/services/offer';
import { updateDealData } from '@/store/entities/notifications/slice';
import { fetchDealCountdownData } from '@/store/entities/pre-fixture/actions';
import { setToggle } from '@/store/entities/pre-fixture/slice';
import { getPreFixtureDataSelector } from '@/store/selectors';
import { getRoleIdentity, notificationPathGenerator } from '@/utils/helpers';

const PreFixtureDetails = ({ searchedParams }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const { loading, role, toggle, deal } = useSelector(getPreFixtureDataSelector);

  const { isOwner } = getRoleIdentity({ role });

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
        console.error('Failed to refresh pre-fixture deal details:', error);
      }
    };

    refreshDealDetails();
  }, [searchedParams?.dealId, deal?.id, role, dispatch]);

  // Fetch countdown data when deal changes
  useEffect(() => {
    if (deal?.id) {
      dispatch(fetchDealCountdownData({ dealId: deal.id }))
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
    const isPreFixturePage = pathname.startsWith('/pre-fixture');
    const shouldBeOnPreFixture = deal.stage === 'Pre_Fixture';

    if (!shouldBeOnPreFixture && isPreFixturePage) {
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
      ? ownerPrefixtureHeaderDataAdapter({ data: rowData })
      : chartererPrefixtureHeaderDataAdapter({ data: rowData });

    const setAccepted = (isOwner ? rowData?.ownerConfirmed : rowData?.chartererConfirmed) === 'Confirmed';
    const shouldExpand = toggle !== null ? toggle : index === 0;

    return (
      <ExpandableRow
        key={rowData.id}
        expand={shouldExpand}
        header={
          <ExpandableCardHeader
            headerData={rowHeader}
            gridStyles={isOwner ? '1fr 1.5fr 1fr 1fr 2fr 1fr 1fr 1fr' : '1fr 1fr 1fr 2fr 1fr 1fr 1fr'}
          />
        }
        footer={
          <PreFixtureExpandedFooter
            underNegotiation={!rowData?.isCountdownActive}
            offerId={rowData.id}
            offerAccepted={setAccepted}
          />
        }
      >
        <PreFixtureExpandedContent
          detailsData={prefixtureDetailsAdapter({ data: rowData, role })}
          documentsData={prefixtureDocumentsTabRowsDataAdapter({ data: rowData?.documents })}
          charterPartyData={rowData?.charterPartyOptions}
          proposedBaseCharterParty={rowData?.proposedBaseCharterParty}
          tab={searchedParams?.status}
          offerId={rowData?.id}
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

PreFixtureDetails.propTypes = UrlPropTypes;

export default PreFixtureDetails;
