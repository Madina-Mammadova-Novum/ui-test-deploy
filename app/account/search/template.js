'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AccountNestedLayout } from '@/layouts';
import { fetchVesselsBySearch } from '@/store/entities/search/actions';
import { getSearchSelector } from '@/store/selectors';

export default function SearchLayout({ children }) {
  const dispatch = useDispatch();
  const { searchParams, sorting } = useSelector(getSearchSelector);

  useEffect(() => {
    const data = { ...searchParams, sortBy: sorting?.currentDirection?.value, rangeBy: sorting?.currentRange?.value };
    dispatch(fetchVesselsBySearch(data));
  }, [searchParams, sorting]);

  const layoutConfig = {
    useExpand: false,
    usePagination: false,
    withActions: false,
    pagination: null,
    onToggle: (v) => v,
    data: { label: null, title: 'Search' },
  };

  return <AccountNestedLayout config={layoutConfig}>{children}</AccountNestedLayout>;
}
