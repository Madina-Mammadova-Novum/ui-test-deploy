'use client';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PostFixtureResultContent from './PostFixtureResultContent';

import { UrlPropTypes } from '@/lib/types';

import { Loader } from '@/elements';
import { setToggle } from '@/store/entities/post-fixture/slice';
import { getPostFixtureDataSelector } from '@/store/selectors';

const PostFixtureDetails = ({ searchedParams }) => {
  const dispatch = useDispatch();
  const { loading, toggle, deal } = useSelector(getPostFixtureDataSelector);

  useEffect(() => {
    dispatch(setToggle(true));
  }, []);

  const printContent = useMemo(() => {
    if (loading) return <Loader className="h-8 w-8 absolute top-1/2 z-0" />;

    return (
      <div className="flex flex-col gap-y-5">
        <PostFixtureResultContent data={[deal]} toggle={toggle} />
      </div>
    );
  }, [loading, searchedParams.id, toggle]);

  return printContent;
};

PostFixtureDetails.propTypes = UrlPropTypes;

export default PostFixtureDetails;
