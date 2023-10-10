'use client';

import { useMemo, useState } from 'react';

import { UrlPropTypes } from '@/lib/types';

import { Label, Loader, Title } from '@/elements';
import { PAGE_STATE } from '@/lib/constants';
import { PostFixtureResultContent } from '@/modules';
import { getUserFixtures } from '@/services';
import { ComplexPagination, FilterByForm, PostFixtureFilter, ToggleRows } from '@/units';
import { useFetch, useFilters } from '@/utils/hooks';

const PostFixture = () => {
  const [toggle, setToggle] = useState({ value: false });
  const [data, isLoading] = useFetch(getUserFixtures);

  const { page, pageSize } = PAGE_STATE;

  const { numberOfPages, items, currentPage, handlePageChange, handleSelectedPageChange, onChangeOffers, perPage } =
    useFilters({ initialPage: page, itemsPerPage: pageSize, data });

  const printContent = useMemo(() => {
    if (isLoading) return <Loader className="h-8 w-8 absolute top-1/2 z-0" />;
    if (items?.length) return <PostFixtureResultContent data={items} toggle={toggle} />;

    return <Title level="3">No opened positions</Title>;
  }, [isLoading, items, toggle]);

  return (
    <section className="flex min-h-[90vh] flex-col gap-y-5">
      <div className="items-center pt-5">
        <div className="flex flex-col">
          <Label className="text-xs-sm">Offer stage #5</Label>
          <div className="flex justify-between">
            <Title level="1">Post-fixture</Title>
            <ToggleRows onToggleClick={setToggle} />
          </div>
          <FilterByForm>
            <PostFixtureFilter />
          </FilterByForm>
        </div>
      </div>
      <div className="grow">{printContent}</div>
      <ComplexPagination
        label="offers"
        perPage={perPage}
        currentPage={currentPage}
        numberOfPages={numberOfPages}
        onPageChange={handlePageChange}
        onSelectedPageChange={handleSelectedPageChange}
        onChangeOffers={onChangeOffers}
      />
    </section>
  );
};

PostFixture.propTypes = UrlPropTypes;

export default PostFixture;
