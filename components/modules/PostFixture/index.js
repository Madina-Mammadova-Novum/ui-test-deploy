'use client';

import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { UrlPropTypes } from '@/lib/types';

import { Label, Loader, Title } from '@/elements';
import { PAGE_STATE } from '@/lib/constants';
import { PostFixtureResultContent } from '@/modules';
import { fetchPostFixtureOffers } from '@/store/entities/post-fixture/actions';
import { postFixtureSelector } from '@/store/selectors';
import { ComplexPagination, FilterByForm, PostFixtureFilter, ToggleRows } from '@/units';
import { useFilters } from '@/utils/hooks';

const PostFixture = () => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState({ value: false });

  const {
    data: { offers, totalPages },
    loading,
  } = useSelector(postFixtureSelector);

  const { page, pageSize } = PAGE_STATE;

  const { currentPage, handlePageChange, handleSelectedPageChange, onChangeOffers, perPage } = useFilters({
    initialPage: page,
    itemsPerPage: pageSize,
    data: offers,
  });

  useEffect(() => {
    dispatch(fetchPostFixtureOffers({ page: currentPage, perPage }));
  }, [currentPage, perPage]);

  const printContent = useMemo(() => {
    if (loading) return <Loader className="h-8 w-8 absolute top-1/2 z-0" />;
    if (offers?.length) return <PostFixtureResultContent data={offers} toggle={toggle} />;

    return <Title level="3">No offers at current stage</Title>;
  }, [loading, offers, toggle]);

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
        numberOfPages={totalPages}
        onPageChange={handlePageChange}
        onSelectedPageChange={handleSelectedPageChange}
        onChangeOffers={onChangeOffers}
      />
    </section>
  );
};

PostFixture.propTypes = UrlPropTypes;

export default PostFixture;
