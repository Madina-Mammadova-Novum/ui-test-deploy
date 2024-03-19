'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AccountNestedLayout } from '@/layouts';
import { PAGE_STATE } from '@/lib/constants';
import { fetchVesselsBySearch } from '@/store/entities/search/actions';
import { getSearchSelector } from '@/store/selectors';
import { useFilters } from '@/utils/hooks';

export default function SearchLayout({ children }) {
  const dispatch = useDispatch();
  const { data, searchParams } = useSelector(getSearchSelector);

  const [pageState, setPageState] = useState(PAGE_STATE);
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
    data: data?.partialResults ?? data?.exactResults,
  });

  useEffect(() => {
    dispatch(fetchVesselsBySearch({ sortBy: sortValue.value }));
  }, [searchParams, sortValue]);

  const handleChange = (option) => {
    handleChangeState('sortValue', option);
    if (paginationParams) {
      paginationParams?.handleSortChange(option);
    }
  };

  const layoutConfig = {
    useExpand: false,
    usePagination: false,
    withActions: false,
    data: { label: null, title: 'Search' },
    pagination: paginationParams && { ...paginationParams, totalPages: 0 },
    sorting: {
      value: sortValue,
      options: sortOptions,
      onChange: handleChange,
    },
  };

  return <AccountNestedLayout config={layoutConfig}>{children}</AccountNestedLayout>;
}
