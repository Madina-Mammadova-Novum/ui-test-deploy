'use client';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PostFixtureResultContent from './PostFixtureResultContent';

import { UrlPropTypes } from '@/lib/types';

import { Loader } from '@/elements';
import { getOfferDetails } from '@/services/offer';
import { updateDealData } from '@/store/entities/notifications/slice';
import { setToggle } from '@/store/entities/post-fixture/slice';
import { getPostFixtureDataSelector } from '@/store/selectors';

const PostFixtureDetails = ({ searchedParams }) => {
  const dispatch = useDispatch();
  const { loading, toggle, deal } = useSelector(getPostFixtureDataSelector);

  useEffect(() => {
    dispatch(setToggle(true));
  }, []);

  // Always refresh deal details by ID on mount or when params/role change
  useEffect(() => {
    const refreshDealDetails = async () => {
      try {
        const targetDealId = searchedParams?.dealId || deal?.id;
        if (!targetDealId) return;
        const { data } = await getOfferDetails(targetDealId);
        if (data) {
          dispatch(updateDealData(data));
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to refresh post-fixture deal details:', error);
      }
    };

    refreshDealDetails();
  }, [searchedParams?.dealId, deal?.id, dispatch]);

  const printContent = useMemo(() => {
    if (loading) return <Loader className="absolute top-1/2 z-0 h-8 w-8" />;

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
