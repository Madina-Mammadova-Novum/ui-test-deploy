'use client';

import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/navigation';

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
import { getPreFixtureDataSelector } from '@/store/selectors';
import { getRoleIdentity } from '@/utils/helpers';
import { errorToast } from '@/utils/hooks';

const PreFixtureDetails = ({ searchedParams }) => {
  const router = useRouter();

  const { loading, offers, role, toggle } = useSelector(getPreFixtureDataSelector);
  const { isOwner } = getRoleIdentity({ role });

  const getInfo = async (id) => {
    const { data, status, error } = await getOfferDetails(id, role);

    if (status === 200 && data) {
      router.replace(`/account/${data?.stage}/${searchedParams?.id}`);
    }

    if (error) {
      errorToast(error.title, error.message);
    }
  };

  useEffect(() => {
    getInfo(searchedParams?.id);
  }, [searchedParams?.id]);

  const printExpandableRow = (rowData) => {
    const rowHeader = isOwner
      ? ownerPrefixtureHeaderDataAdapter({ data: rowData })
      : chartererPrefixtureHeaderDataAdapter({ data: rowData });

    const setAccepted = (isOwner ? rowData?.ownerConfirmed : rowData?.chartererConfirmed) === 'Confirmed';
    const setStyles = isOwner ? '1fr 1fr 1.5fr 1fr 2fr 1fr 1fr 1fr' : '1fr 1.5fr 1fr 2fr 1fr 1fr 1fr 1fr';

    return (
      <ExpandableRow
        key={rowData.id}
        expand={toggle || searchedParams?.status}
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
  }, [loading, printExpandableRow]);

  return printContent;
};

PreFixtureDetails.propTypes = UrlPropTypes;

export default PreFixtureDetails;
