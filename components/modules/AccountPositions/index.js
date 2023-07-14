'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Dropdown, Loader, Title } from '@/elements';
import { NAVIGATION_PARAMS } from '@/lib/constants';
import { fetchUserVessels } from '@/store/entities/positions/actions';
import { getUserVesselsSelector } from '@/store/selectors';
import { ComplexPagination, ExpandableCard, ToggleRows } from '@/units';
import { useFilters } from '@/utils/hooks';

const AccountPositions = () => {
  const [toggle, setToggle] = useState({ value: false });

  const dispatch = useDispatch();

  const { vessels, loading } = useSelector(getUserVesselsSelector);

  const [userStore, setUserStore] = useState({
    sortOptions: NAVIGATION_PARAMS.DATA_SORT_OPTIONS,
    sortValue: NAVIGATION_PARAMS.DATA_SORT_OPTIONS[0],
    page: NAVIGATION_PARAMS.CURRENT_PAGE,
    pageSize: NAVIGATION_PARAMS.DATA_PER_PAGE[0].value,
  });

  const dropdownStyles = { dropdownWidth: 120, className: 'flex items-center gap-x-5' };

  /* Change handler by key-value for userStore */

  const handleChangeState = (key, value) => {
    setUserStore((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const { page, pageSize, sortOptions, sortValue } = userStore;

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
  } = useFilters(pageSize, page, vessels, sortValue.value);

  /* fetching user positions data */

  useEffect(() => {
    dispatch(fetchUserVessels({ page: currentPage, perPage, sortBy: sortValue.value }));
  }, [currentPage, dispatch, numberOfPages, perPage, sortValue]);

  const handleChange = (option) => {
    handleSortChange(option);
    handleChangeState('sortValue', option);
  };

  const printExpandableCard = useCallback(
    (fleet) => <ExpandableCard className="px-5 my-5" key={fleet.id} data={fleet} expandAll={toggle} />,
    [toggle]
  );

  const printContent = useMemo(() => {
    if (loading) return <Loader className="h-8 w-8 absolute top-1/2" />;
    if (items) return items?.map(printExpandableCard);
    return <Title level="3">No opened positions</Title>;
  }, [items, loading, printExpandableCard]);

  return (
    <section className="flex min-h-[90vh] flex-col gap-y-5">
      <div className="flex justify-between items-center pt-5 w-full">
        <Title level="1">My positions</Title>
        <div className="flex gap-x-5">
          <ToggleRows onToggleClick={setToggle} />
          <Dropdown
            label="Sort by open day:"
            options={sortOptions}
            defaultValue={sortValue}
            customStyles={dropdownStyles}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="grow">{printContent}</div>
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
