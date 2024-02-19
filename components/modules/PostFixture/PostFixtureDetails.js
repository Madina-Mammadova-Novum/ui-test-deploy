'use client';

import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/navigation';

import { UrlPropTypes } from '@/lib/types';

import { Loader, Title } from '@/elements';
import { PostFixtureResultContent } from '@/modules';
import { getOfferDetails } from '@/services/offer';
import { getPostFixtureDataSelector } from '@/store/selectors';
import { errorToast } from '@/utils/hooks';

const PostFixtureDetails = ({ searchedParams }) => {
  const router = useRouter();

  const { offers, loading, toggle, role } = useSelector(getPostFixtureDataSelector);

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

  const printContent = useMemo(() => {
    const searchedResult = offers.find((offer) => offer.cargoeId === searchedParams.id);

    if (loading) return <Loader className="h-8 w-8 absolute top-1/2 z-0" />;
    if (searchedResult)
      return (
        <PostFixtureResultContent
          data={[searchedResult]}
          tab={searchedParams?.status}
          isOpened={Boolean(searchedParams?.status)}
          toggle={toggle}
        />
      );

    return <Title level="3">Notification is outdated.</Title>;
  }, [loading, toggle]);

  return printContent;
};

PostFixtureDetails.propTypes = UrlPropTypes;

export default PostFixtureDetails;
