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
import { setToggle } from '@/store/entities/fixture/slice';
import { getFixtureSelector } from '@/store/selectors';
import { getRoleIdentity } from '@/utils/helpers';

const FixtureDetails = ({ searchedParams }) => {
  const dispatch = useDispatch();
  const { deal, toggle, loading, role } = useSelector(getFixtureSelector);
  const { isOwner } = getRoleIdentity({ role });
  useEffect(() => {
    dispatch(setToggle(true));
  }, []);

  const printExpandableRow = (rowData, index) => {
    const rowHeader = fixtureHeaderDataAdapter({ data: rowData });

    return (
      <ExpandableRow
        key={rowData?.id}
        expand={index === 0 || toggle}
        className="px-5"
        header={<ExpandableCardHeader headerData={rowHeader} gridStyles="1.5fr 1.5fr 1fr 1fr 2fr 1fr 1fr 1fr" />}
        footer={<FixtureExpandedFooter underRecap={!rowData?.isCountdownActive} identity={{ isOwner }} />}
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
  }, [loading, toggle, searchedParams.id]);

  return printContent;
};

FixtureDetails.propTypes = UrlPropTypes;

export default FixtureDetails;
