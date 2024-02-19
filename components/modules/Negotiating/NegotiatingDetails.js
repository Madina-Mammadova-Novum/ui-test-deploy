'use client';

import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/navigation';

import NegotiatingExpandedContent from './NegotiatingExpandedContent';
import NegotiatingExpandedFooter from './NegotiatingExpandedFooter';
import ExpandableRow from '../ExpandableRow';

import { UrlPropTypes } from '@/lib/types';

import { chartererNegotiatingHeaderDataAdapter, ownerNegotiatingHeaderDataAdapter } from '@/adapters/negotiating';
import { ExpandableCardHeader, Loader, Title } from '@/elements';
import { NEGOTIATING_TABS } from '@/lib/constants';
import { getOfferDetails } from '@/services/offer';
import { getNegotiatingDataSelector } from '@/store/selectors';
import { getRoleIdentity } from '@/utils/helpers';
import { errorToast } from '@/utils/hooks';

const NegotiatingDetails = ({ searchedParams }) => {
  const router = useRouter();

  const { role, toggle, loading, offers } = useSelector(getNegotiatingDataSelector);
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
      ? ownerNegotiatingHeaderDataAdapter({ data: rowData })
      : chartererNegotiatingHeaderDataAdapter({ data: rowData });

    return (
      <ExpandableRow
        key={rowData.id}
        className="pt-14 px-5"
        header={
          <ExpandableCardHeader
            headerData={rowHeader}
            gridStyles={isOwner ? '2fr 1fr 1fr 1fr 2fr' : '1fr 1fr 2fr 2fr 1fr 1fr 1fr'}
          />
        }
        footer={<NegotiatingExpandedFooter isCharterer={!isOwner} cargoId={rowData?.id} />}
        expand={toggle}
        isOpened={Boolean(searchedParams?.status)}
      >
        <NegotiatingExpandedContent data={rowData} tab={searchedParams?.status} tabs={NEGOTIATING_TABS[role]} t />
      </ExpandableRow>
    );
  };

  const printContent = useMemo(() => {
    const searchedResult = offers.find((offer) => offer.id === searchedParams.tankerId);

    if (loading) return <Loader className="h-8 w-8 absolute top-1/2 z-0" />;
    if (searchedResult) return [searchedResult].map(printExpandableRow);

    return <Title level="3">Notification is outdated.</Title>;
  }, [loading, toggle, printExpandableRow]);

  return printContent;
};

NegotiatingDetails.propTypes = UrlPropTypes;

export default NegotiatingDetails;
