'use client';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FixtureExpandedContent from './FixtureExpandedContent';

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

const FixtureDetails = ({ searchedParams }) => {
  const dispatch = useDispatch();
  const { deal, toggle, loading } = useSelector(getFixtureSelector);

  useEffect(() => {
    dispatch(setToggle(true));
  }, []);

  const printExpandableRow = (rowData) => {
    const rowHeader = fixtureHeaderDataAdapter({ data: rowData });

    return (
      <ExpandableRow
        expand={toggle}
        className="px-5"
        header={<ExpandableCardHeader headerData={rowHeader} gridStyles="1.5fr 1.5fr 2fr 1fr 2fr 1fr 1fr 1fr" />}
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
    return [deal].map(printExpandableRow) || <Title>Outdated notification</Title>;
  }, [loading, toggle, searchedParams.id]);

  return printContent;
};

FixtureDetails.propTypes = UrlPropTypes;

export default FixtureDetails;
