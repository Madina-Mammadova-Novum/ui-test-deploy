'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Dropdown, Loader, Title } from '@/elements';
import { PAGE_STATE } from '@/lib/constants';
import { fetchUnassignedFleetData } from '@/store/entities/fleets/actions';
import { fetchUserVessels } from '@/store/entities/positions/actions';
import { getUserVesselsSelector } from '@/store/selectors';
import { ComplexPagination, ExpandableCard, ToggleRows } from '@/units';
import { useFilters } from '@/utils/hooks';

const AccountPositions = () => {
  const dispatch = useDispatch();

  const [pageState, setPageState] = useState(PAGE_STATE);
  const [toggle, setToggle] = useState({ value: false });

  const dropdownStyles = { dropdownWidth: 120, className: 'flex items-center gap-x-5' };

  const { vessels, unassignedVessel, totalPages, loading } = useSelector(getUserVesselsSelector);
  const { page, pageSize, sortOptions, sortValue } = pageState;

  /* Change handler by key-value for userStore */
  const handleChangeState = (key, value) => {
    setPageState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const { currentPage, handleSortChange, handlePageChange, handleSelectedPageChange, onChangeOffers, perPage } =
    useFilters({ data: vessels, itemsPerPage: pageSize, initialPage: page, sortValue });

  /* fetching user positions data */

  useEffect(() => {
    dispatch(fetchUnassignedFleetData());
  }, []);

  useEffect(() => {
    dispatch(fetchUserVessels({ page: currentPage, perPage, sortBy: sortValue.value }));
  }, [currentPage, perPage, sortValue]);

  const handleChange = (option) => {
    handleSortChange(option);
    handleChangeState('sortValue', option);
  };

  const printExpandableCard = useCallback(
    (fleet) => {
      return <ExpandableCard className="px-5 my-5 bg-white" key={fleet.id} data={fleet} expandAll={toggle} />;
    },
    [toggle]
  );

  const printContent = useMemo(() => {
    if (loading) return <Loader className="h-8 w-8 absolute top-1/2 z-0" />;
    if (vessels) return vessels?.map(printExpandableCard);

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
      <div className="grow">
        <ExpandableCard
          data={unassignedVessel}
          key={unassignedVessel.id}
          className="px-5 my-5 bg-white"
          expandAll={toggle}
        />
        {printContent}
      </div>
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
