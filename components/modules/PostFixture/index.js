'use client';

import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { UrlPropTypes } from '@/lib/types';

import { Loader, Title } from '@/elements';
import { PostFixtureResultContent } from '@/modules';
import { getPostFixtureDataSelector } from '@/store/selectors';

const PostFixture = () => {
  const { offers, loading, toggle } = useSelector(getPostFixtureDataSelector);

  const printContent = useMemo(() => {
    if (loading) return <Loader className="h-8 w-8 absolute top-1/2 z-0" />;
    if (offers?.length) return <PostFixtureResultContent data={offers} toggle={toggle} />;

    return <Title level="3">No offers at current stage</Title>;
  }, [loading, offers, toggle]);

  return <div className="grow">{printContent}</div>;
};

PostFixture.propTypes = UrlPropTypes;

export default PostFixture;
