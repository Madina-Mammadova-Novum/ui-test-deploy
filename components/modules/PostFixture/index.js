'use client';

import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { UrlPropTypes } from '@/lib/types';

import { Loader, Title } from '@/elements';
import { PostFixtureResultContent } from '@/modules';
import { getPostFixtureDataSelector } from '@/store/selectors';
import { FilterByForm, PostFixtureFilter } from '@/units';

const PostFixture = () => {
  const { offers, loading, toggle } = useSelector(getPostFixtureDataSelector);

  const printContent = useMemo(() => {
    if (loading) return <Loader className="h-8 w-8 absolute top-1/2 z-0" />;

    if (offers?.length)
      return (
        <div className="flex flex-col gap-y-5">
          <FilterByForm>
            <PostFixtureFilter />
          </FilterByForm>
          <PostFixtureResultContent data={offers} toggle={toggle} />
        </div>
      );

    return <Title level="3">No offers at current stage</Title>;
  }, [loading, offers, toggle]);

  return printContent;
};

PostFixture.propTypes = UrlPropTypes;

export default PostFixture;
