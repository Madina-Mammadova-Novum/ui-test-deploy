'use client';

import { useEffect, useState } from 'react';

import { Dropdown, Loader, Title } from '@/elements';
import { NAVIGATION_PARAMS } from '@/lib/constants';
import { getUserPositions } from '@/services';
import { ComplexPagination, ExpandableCard, ToggleRows } from '@/units';
import { useFilters } from '@/utils/hooks';

const AccountPositions = () => {
  const [toggle, setToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [userStore, setUserStore] = useState({
    userPositions: [],
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

  const { userPositions, sortOptions, sortValue } = userStore;

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
  } = useFilters(initialPagesStore.perPage, initialPagesStore.currentPage, userPositions, sortValue.value);

  /* fetching user positions data */

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data } = await getUserPositions();
      setUserStore({ ...userStore, userPositions: data });
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (option) => {
    handleSortChange(option);
    handleChangeState('sortValue', option);
  };

  const printExpandableCard = (fleet) => (
    <ExpandableCard className="px-5" key={fleet.id} data={fleet} expandAll={{ value: toggle }} />
  );

  const dropdownStyles = { dropdownWidth: 120, className: 'flex items-center gap-x-5' };

  if (isLoading) {
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
