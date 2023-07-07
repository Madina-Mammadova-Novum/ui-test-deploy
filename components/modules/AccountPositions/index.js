'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Dropdown, Loader, Title } from '@/elements';
import { NAVIGATION_PARAMS } from '@/lib/constants';
import { fetchUserVessels } from '@/store/entities/positions/actions';
import { getUserVesselsSelector } from '@/store/selectors';
import { ComplexPagination, ExpandableCard, ToggleRows } from '@/units';
import { useFilters } from '@/utils/hooks';

const AccountPositions = () => {
  const [toggle, setToggle] = useState(false);

  const dispatch = useDispatch();

  const { vessels, loading } = useSelector(getUserVesselsSelector);

  const [userStore, setUserStore] = useState({
    sortOptions: NAVIGATION_PARAMS.DATA_SORT_OPTIONS,
    sortValue: NAVIGATION_PARAMS.DATA_SORT_OPTIONS[0],
  });

  /* Change handler by key-value for userStore */

  const handleChangeState = (key, value) => {
    setUserStore((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const { sortOptions, sortValue } = userStore;

  const initialPagesStore = {
    currentPage: NAVIGATION_PARAMS.CURRENT_PAGE,
    perPage: NAVIGATION_PARAMS.DATA_PER_PAGE[0].value,
  };

  const {
    numberOfPages,
    items,
    currentPage,
    handleSortChange,
    handlePageChange,
    handleSelectedPageChange,
    selectedPage,
    onChangeOffers,
    perPage,
  } = useFilters(initialPagesStore.perPage, initialPagesStore.currentPage, vessels, sortValue.value);

  /* fetching user positions data */

  useEffect(() => {
    dispatch(fetchUserVessels());
  }, []);

  const handleChange = (option) => {
    handleSortChange(option);
    handleChangeState('sortValue', option);
  };

  const printExpandableCard = (fleet) => {
    return <ExpandableCard data={fleet} key={fleet.id} className="px-5" expandAll={{ value: toggle }} />;
  };

  const dropdownStyles = { dropdownWidth: 120, className: 'flex items-center gap-x-5' };

  if (loading) {
    return <Loader className="h-8 w-8 absolute top-1/2" />;
  }

  return (
    <section className="flex flex-col gap-y-5">
      <div className="flex justify-between items-center pt-5 w-full">
        <Title level={1}>My positions</Title>
        <div className="flex gap-x-5">
          <ToggleRows value={toggle} onToggleClick={() => setToggle((prevState) => !prevState)} />
          <Dropdown
            label="Sort by open day:"
            options={sortOptions}
            defaultValue={sortValue}
            customStyles={dropdownStyles}
            onChange={handleChange}
          />
        </div>
      </div>
      {items && items?.map(printExpandableCard)}
      <ComplexPagination
        label="fleets"
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

export default AccountPositions;
