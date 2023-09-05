'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Dropdown, Loader, Title } from '@/elements';
import { NAVIGATION_PARAMS } from '@/lib/constants';
import { fetchUserVessels } from '@/store/entities/positions/actions';
import { getUserVesselsSelector } from '@/store/selectors';
import { ComplexPagination, ExpandableCard, ToggleRows, UnassignedFleet } from '@/units';
import { useFilters } from '@/utils/hooks';

const AccountPositions = () => {
  const [toggle, setToggle] = useState({ value: false });

  const dispatch = useDispatch();

  const { vessels, totalPages, loading } = useSelector(getUserVesselsSelector);

  const [userStore, setUserStore] = useState({
    sortOptions: NAVIGATION_PARAMS.DATA_SORT_OPTIONS,
    sortValue: NAVIGATION_PARAMS.DATA_SORT_OPTIONS[0],
    page: NAVIGATION_PARAMS.CURRENT_PAGE,
    pageSize: NAVIGATION_PARAMS.DATA_PER_PAGE[0].value,
  });

  const { page, pageSize, sortOptions, sortValue } = userStore;

  const dropdownStyles = { dropdownWidth: 120, className: 'flex items-center gap-x-5' };

  /* Change handler by key-value for userStore */

  const handleChangeState = (key, value) => {
    setUserStore((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const { currentPage, handleSortChange, handlePageChange, handleSelectedPageChange, onChangeOffers, perPage } =
    useFilters(pageSize, page, vessels, sortValue.value);

  /* fetching user positions data */

  useEffect(() => {
    dispatch(fetchUserVessels({ page: currentPage, perPage, sortBy: sortValue.value }));
  }, [currentPage, dispatch, perPage, sortValue]);

  const handleChange = (option) => {
    handleSortChange(option);
    handleChangeState('sortValue', option);
  };

  const printExpandableCard = useCallback(
    (fleet) => <ExpandableCard className="px-5 my-5 bg-white" key={fleet.id} data={fleet} expandAll={toggle} />,
    [toggle]
  );

  const printContent = useMemo(() => {
    if (loading) return <Loader className="h-8 w-8 absolute top-1/2" />;
    if (vessels)
      return (
        <>
          <UnassignedFleet toggle={toggle} />
          {vessels?.map(printExpandableCard)}
        </>
      );
    return <Title level="3">No opened positions</Title>;
  }, [loading, vessels, printExpandableCard]);

  return (
    <section className="flex min-h-[90vh] flex-col gap-y-5">
      <div className="flex flex-col 3md:flex-row 3md:justify-between 3md:items-center gap-4 3md:gap-0 pt-5 w-full">
        <Title level="1" className="text-2xl">
          My positions
        </Title>
        <div className="flex items-center justify-between 3md:justify-end gap-x-5">
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
        numberOfPages={totalPages}
        onPageChange={handlePageChange}
        onSelectedPageChange={handleSelectedPageChange}
        onChangeOffers={onChangeOffers}
        perPage={perPage}
      />
    </section>
  );
};

export default AccountPositions;
