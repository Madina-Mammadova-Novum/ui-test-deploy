/* eslint-disable no-unused-vars */

'use client';

import { useCallback, useEffect, useState } from 'react';

import { Dropdown, Loader, Title } from '@/elements';
import { NAVIGATION_PARAMS } from '@/lib/constants';
import { getUserPositions } from '@/services';
import {
  ComplexPagination,
  ExpandableCard
} from '@/units';
import { useFilters } from '@/utils/hooks';

const AccountPositions = () => {
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
  const { numberOfPages, items, currentPage, handlePageChange, handleSelectedPageChange, selectedPage, onChangeOffers, perPage } =
    useFilters(initialPagesStore.perPage, initialPagesStore.currentPage, userStore.userPositions);

  /* fetching user positions data */

  const fetchData = useCallback(async () => {
    try {
      const data = await getUserPositions();
      setUserStore(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  const handleChange = (option) => handleChangeState('sortValue', option);


  const printExpandableCard = (fleet) => <ExpandableCard key={fleet.id} data={fleet} />;

  const dropdownStyles = { dropdownWidth: 120, className: 'flex items-center gap-x-5' };
  return (
    <section className="flex flex-col gap-y-5">
      {userPositions ? (
        <>
          <div className="flex justify-between items-center pt-5 w-full">
            <Title level={1}>My positions</Title>
            <Dropdown
              label="Sort by open day:"
              options={sortOptions}
              defaultValue={sortValue}
              customStyles={dropdownStyles}
              onChange={handleChange}
            />
          </div>
          {items && items?.map(printExpandableCard)}
          <ComplexPagination currentPage={currentPage}
            numberOfPages={numberOfPages}
            onPageChange={handlePageChange}
            onSelectedPageChange={handleSelectedPageChange}
            pages={selectedPage}
            onChangeOffers={onChangeOffers}
            perPage={perPage} />
        </>
      ) : (
        <Loader className="h-8 w-8 absolute top-1/2 left-1/2" />
      )}
    </section>
  );
};

export default AccountPositions;
