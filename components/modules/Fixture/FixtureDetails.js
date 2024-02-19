'use client';

import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/navigation';

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
import { getFixtureSelector } from '@/store/selectors';
import { errorToast } from '@/utils/hooks';

const FixtureDetails = ({ searchedParams }) => {
  const router = useRouter();
  const { offers, toggle, loading, role } = useSelector(getFixtureSelector);

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
    const rowHeader = fixtureHeaderDataAdapter({ data: rowData });

    return (
      <ExpandableRow
        header={<ExpandableCardHeader headerData={rowHeader} gridStyles="1fr 2fr 1fr 1fr 2fr 1fr 1fr 1fr" />}
        footer={<FixtureExpandedFooter drafted={!rowData?.isCountdownActive} />}
        expand={toggle}
        className="px-5"
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
    const searchedResult = offers.find((offer) => offer.cargoeId === searchedParams.id);

    if (loading) return <Loader className="h-8 w-8 absolute top-1/2 z-0" />;
    if (searchedResult) return [searchedResult].map(printExpandableRow);

    return <Title level="3">Notification is outdated.</Title>;
  }, [loading, printExpandableRow]);

  return printContent;
};

FixtureDetails.propTypes = UrlPropTypes;

export default FixtureDetails;
