'use client';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
import { setToggle } from '@/store/entities/pre-fixture/slice';
import { getPreFixtureDataSelector } from '@/store/selectors';
import { getRoleIdentity } from '@/utils/helpers';

const PreFixtureDetails = ({ searchedParams }) => {
  const dispatch = useDispatch();

  const { loading, offers, role, toggle } = useSelector(getPreFixtureDataSelector);
  const { isOwner } = getRoleIdentity({ role });

  useEffect(() => {
    dispatch(setToggle(true));

    return () => {
      dispatch(setToggle(false));
    };
  }, []);
  const printExpandableRow = (rowData) => {
    const rowHeader = isOwner
      ? ownerPrefixtureHeaderDataAdapter({ data: rowData })
      : chartererPrefixtureHeaderDataAdapter({ data: rowData });

    const setAccepted = (isOwner ? rowData?.ownerConfirmed : rowData?.chartererConfirmed) === 'Confirmed';
    const setStyles = isOwner ? '1fr 1fr 1.5fr 1fr 2fr 1fr 1fr 1fr' : '1fr 1.5fr 1fr 2fr 1fr 1fr 1fr 1fr';

    return (
      <ExpandableRow
        key={rowData.id}
        expand={toggle}
        header={<ExpandableCardHeader headerData={rowHeader} gridStyles={setStyles} />}
        footer={
          <PreFixtureExpandedFooter
            underNegotiation={!rowData?.additionalCharterPartyTerms?.length}
            offerId={rowData.id}
            offerAccepted={setAccepted}
          />
        }
      >
        <PreFixtureExpandedContent
          detailsData={prefixtureDetailsAdapter({ data: rowData, role })}
          documentsData={prefixtureDocumentsTabRowsDataAdapter({ data: rowData?.documents })}
          tab={searchedParams?.status}
          offerId={rowData?.id}
        />
      </ExpandableRow>
    );
  };

  const printContent = useMemo(() => {
    const searchedResult = offers.find((offer) => offer?.cargoeId === searchedParams?.id);

    if (loading) return <Loader className="h-8 w-8 absolute top-1/2 z-0" />;
    if (searchedResult) return [searchedResult].map(printExpandableRow);

    return <Title level="3">Notification is outdated.</Title>;
  }, [loading, toggle, offers, searchedParams?.id]);

  return printContent;
};

PreFixtureDetails.propTypes = UrlPropTypes;

export default PreFixtureDetails;
