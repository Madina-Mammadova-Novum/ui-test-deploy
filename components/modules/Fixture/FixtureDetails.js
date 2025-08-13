'use client';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FixtureExpandedContent from './FixtureExpandedContent';
import FixtureExpandedFooter from './FixtureExpandedFooter';

import { UrlPropTypes } from '@/lib/types';

import {
  fixtureDetailsAdapter,
  fixtureDocumentsTabRowsDataAdapter,
  fixtureHeaderDataAdapter,
} from '@/adapters/fixture';
import { ExpandableCardHeader, Loader, Title } from '@/elements';
import { ExpandableRow } from '@/modules';
import { getOfferDetails } from '@/services/offer';
import { setToggle } from '@/store/entities/fixture/slice';
import { updateDealData } from '@/store/entities/notifications/slice';
import { getFixtureSelector } from '@/store/selectors';
import { getRoleIdentity } from '@/utils/helpers';

const FixtureDetails = ({ searchedParams }) => {
  const dispatch = useDispatch();
  const { deal, toggle, loading, role } = useSelector(getFixtureSelector);
  const { isOwner } = getRoleIdentity({ role });
  useEffect(() => {
    dispatch(setToggle(true));
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
        console.error('Failed to refresh fixture deal details:', error);
      }
    };

    refreshDealDetails();
  }, [searchedParams?.dealId, deal?.id, role, dispatch]);

  const printExpandableRow = (rowData, index) => {
    const rowHeader = fixtureHeaderDataAdapter({ data: rowData });

    return (
      <ExpandableRow
        key={rowData?.id}
        expand={index === 0 || toggle}
        className="px-5"
        header={<ExpandableCardHeader headerData={rowHeader} gridStyles="1.5fr 1.5fr 1fr 1fr 2fr 1fr 1fr 1fr" />}
        footer={<FixtureExpandedFooter identity={{ isOwner }} />}
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
    if (loading) return <Loader className="absolute top-1/2 z-0 h-8 w-8" />;
    return [deal].map((rowData, index) => printExpandableRow(rowData, index)) || <Title>Outdated notification</Title>;
  }, [loading, toggle, searchedParams.id, deal]);

  return printContent;
};

FixtureDetails.propTypes = UrlPropTypes;

export default FixtureDetails;
