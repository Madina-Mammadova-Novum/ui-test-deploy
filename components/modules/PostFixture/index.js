'use client';

import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { UrlPropTypes } from '@/lib/types';

import { Dropdown, Label, TankerLoader, Title } from '@/elements';
import { NAVIGATION_PARAMS, POST_FIXTURE_SORT_COLUMN_OPTIONS } from '@/lib/constants';
import { PostFixtureResultContent } from '@/modules';
import { fetchPostFixtureOffers } from '@/store/entities/post-fixture/actions';
import { getPostFixtureDataSelector } from '@/store/selectors';
import { FilterByForm, PostFixtureFilter } from '@/units';

const dropdownStyles = { dropdownWidth: 120, className: 'flex items-center gap-x-5' };

const PostFixture = () => {
  const dispatch = useDispatch();

  const [userStore, setUserStore] = useState({
    sortColumnDirectionOptions: NAVIGATION_PARAMS.DATA_SORT_OPTIONS,
    sortColumnDirection: '',
    sortColumnOptions: POST_FIXTURE_SORT_COLUMN_OPTIONS,
    sortColumn: '',
  });

  const { offers, loading, toggle, perPage, filters } = useSelector(getPostFixtureDataSelector);
  const { sortColumnDirectionOptions, sortColumnDirection, sortColumnOptions, sortColumn } = userStore;

  const handleChangeState = (key, value) => {
    setUserStore((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSortSelection = (key, sortOption) => {
    dispatch(
      fetchPostFixtureOffers({
        page: 1,
        perPage,
        filters,
        sorting: {
          sortColumnDirection: sortColumnDirection?.value,
          sortColumn: sortColumn?.value,
          [key]: sortOption.value,
        },
      })
    );
  };

  const handleSortColumnSelection = (option) => {
    handleChangeState('sortColumn', option);
    if (sortColumnDirection) handleSortSelection('sortColumn', option);
  };

  const handleSortDirectionSelection = (option) => {
    handleChangeState('sortColumnDirection', option);
    if (sortColumn) handleSortSelection('sortColumnDirection', option);
  };

  const printContent = useMemo(() => {
    if (loading) return <TankerLoader />;

    if (offers?.length)
      return (
        <div className="flex flex-col gap-y-5">
          <PostFixtureResultContent data={offers} toggle={toggle} />
        </div>
      );

    return <Title level="3">No offers at current stage</Title>;
  }, [loading, offers, toggle]);

  return (
    <>
      <FilterByForm>
        <PostFixtureFilter {...filters} />
      </FilterByForm>
      <div className="flex justify-end pt-6 items-center gap-2.5">
        <Label className="text-xs-sm	font-semibold">Sort cargoes by:</Label>
        <div className="flex">
          <Dropdown
            placeholder="Sort by"
            options={sortColumnOptions}
            defaultValue={sortColumn}
            customStyles={dropdownStyles}
            onChange={handleSortColumnSelection}
          />

          <Dropdown
            placeholder="Sort direction"
            options={sortColumnDirectionOptions}
            defaultValue={sortColumnDirection}
            customStyles={dropdownStyles}
            onChange={handleSortDirectionSelection}
          />
        </div>
      </div>
      {printContent}
    </>
  );
};

PostFixture.propTypes = UrlPropTypes;

export default PostFixture;
