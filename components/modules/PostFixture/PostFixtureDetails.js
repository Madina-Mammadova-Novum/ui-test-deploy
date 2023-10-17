'use client';

import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { UrlPropTypes } from '@/lib/types';

import { Loader, Title } from '@/elements';
import { PostFixtureResultContent } from '@/modules';
import { getPostFixtureDataSelector } from '@/store/selectors';

const PostFixtureDetails = ({ searchedParams }) => {
  const { offers, loading, toggle } = useSelector(getPostFixtureDataSelector);

  const searchedResult = offers.find((offer) => offer.cargoeId === searchedParams.id);

  const printContent = useMemo(() => {
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
  }, [loading, searchedResult, toggle]);

  return <div className="grow">{printContent}</div>;
};

PostFixtureDetails.propTypes = UrlPropTypes;

export default PostFixtureDetails;
