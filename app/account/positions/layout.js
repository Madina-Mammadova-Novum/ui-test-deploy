'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Dropdown, Title } from '@/elements';
import { PAGE_STATE } from '@/lib/constants';
import { fetchUnassignedFleetData } from '@/store/entities/fleets/actions';
import { fetchUserVessels } from '@/store/entities/positions/actions';
import { setToggle } from '@/store/entities/positions/slice';
import { getUserVesselsSelector } from '@/store/selectors';
import { ComplexPagination, ToggleRows } from '@/units';
import { useFilters } from '@/utils/hooks';

export default function PositionsLayout({ children }) {
  const dispatch = useDispatch();

  const [pageState, setPageState] = useState(PAGE_STATE);

  const dropdownStyles = { dropdownWidth: 120, className: 'flex items-center gap-x-5' };

  const { vessels, totalPages } = useSelector(getUserVesselsSelector);
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

  const handleToggle = ({ value }) => dispatch(setToggle(value));

  return (
    <div className="px-5">
      <section className="flex min-h-[90vh] flex-col gap-y-5 px-5">
        <div className="flex flex-col 3md:flex-row 3md:justify-between 3md:items-center gap-4 3md:gap-0 pt-5 w-full">
          <Title level="1" className="text-2xl">
            My positions
          </Title>
          <div className="flex items-center justify-between 3md:justify-end gap-x-5">
            <ToggleRows onToggleClick={handleToggle} />
            <Dropdown
              label="Sort by open day:"
              options={sortOptions}
              defaultValue={sortValue}
              customStyles={dropdownStyles}
              onChange={handleChange}
            />
          </div>
        </div>
        {children}
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
    </div>
  );
}
