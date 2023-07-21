'use client';

import { useState } from 'react';

import { PostFixturePropTypes } from '@/lib/types';

import { Label, Loader, Title } from '@/elements';
import { NAVIGATION_PARAMS } from '@/lib/constants';
import { PostFixtureResultContent } from '@/modules';
import { getUserFixtures } from '@/services';
import { ComplexPagination, FilterByForm, PostFixtureFilter, ToggleRows } from '@/units';
import { useFetch, useFilters } from '@/utils/hooks';

const PostFixture = ({ title }) => {
  const [toggle, setToggle] = useState({ value: false });
  const [data, isLoading] = useFetch(getUserFixtures);

  const initialPagesStore = {
    currentPage: NAVIGATION_PARAMS.CURRENT_PAGE,
    perPage: NAVIGATION_PARAMS.DATA_PER_PAGE[0].value,
  };

  const {
    numberOfPages,
    items,
    currentPage,
    handlePageChange,
    handleSelectedPageChange,
    selectedPage,
    onChangeOffers,
    perPage,
  } = useFilters(initialPagesStore.perPage, initialPagesStore.currentPage, data);

  if (isLoading) {
    return <Loader className="h-8 w-8 absolute top-1/2" />;
  }

  return (
    <section>
      <div className="items-center py-5">
        <div className="flex flex-col">
          <Label className="text-xs-sm">Offer stage #5</Label>
          <div className="flex justify-between">
            <Title level={1}>{title}</Title>
            <ToggleRows onToggleClick={setToggle} />
          </div>
          <FilterByForm>
            <PostFixtureFilter />
          </FilterByForm>
        </div>
      </div>

      {!!items?.length && <PostFixtureResultContent data={items} toggle={toggle} />}

      <ComplexPagination
        currentPage={currentPage}
        numberOfPages={numberOfPages}
        onPageChange={handlePageChange}
        onSelectedPageChange={handleSelectedPageChange}
        pages={selectedPage}
        onChangeOffers={onChangeOffers}
        perPage={perPage}
      />
    </section>
  );
};
PostFixture.propTypes = PostFixturePropTypes;

export default PostFixture;
