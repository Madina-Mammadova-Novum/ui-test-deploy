'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AccountNestedLayout } from '@/layouts';
import { PAGE_STATE } from '@/lib/constants';
import { fetchUserVessels } from '@/store/entities/positions/actions';
import { setToggle } from '@/store/entities/positions/slice';
import { getUserVesselsSelector } from '@/store/selectors';
import { useFilters } from '@/utils/hooks';

export default function PositionsLayout({ children }) {
  const dispatch = useDispatch();

  const [pageState, setPageState] = useState(PAGE_STATE);

  const { vessels, totalPages } = useSelector(getUserVesselsSelector);
  const { page, pageSize, sortOptions, sortValue } = pageState;

  /* Change handler by key-value for userStore */
  const handleChangeState = (key, value) => {
    setPageState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const paginationParams = useFilters({
    initialPage: page,
    itemsPerPage: pageSize,
    data: vessels,
  });

  /* fetching user positions data */
  useEffect(() => {
    dispatch(
      fetchUserVessels({
        page: paginationParams.currentPage,
        perPage: paginationParams.perPage,
        sortBy: sortValue.value,
      })
    );
  }, [paginationParams.currentPage, paginationParams.perPage, sortValue]);

  const handleChange = (option) => {
    paginationParams.handleSortChange(option);
    handleChangeState('sortValue', option);
  };

  const layoutConfig = {
    withActions: false,
    usePagination: true,
    data: { label: null, title: 'My positions' },
    pagination: { ...paginationParams, totalPages },
    onToggle: ({ value }) => dispatch(setToggle(value)),
    sorting: {
      value: sortValue,
      options: sortOptions,
      onChange: handleChange,
    },
  };

  return <AccountNestedLayout config={layoutConfig}>{children}</AccountNestedLayout>;
}
