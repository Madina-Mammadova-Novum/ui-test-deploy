'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AccountNestedLayout } from '@/layouts';
import { PAGE_STATE } from '@/lib/constants';
import { fetchFleetsWithVessels, fetchUnassignedFleetData } from '@/store/entities/fleets/actions';
import { setToggle } from '@/store/entities/fleets/slice';
import { getFleetsSelector } from '@/store/selectors';
import { useFilters } from '@/utils/hooks';

export default function FleetsLayout({ children }) {
  const dispatch = useDispatch();
  const { refetch, data, totalPages } = useSelector(getFleetsSelector);

  const { page, pageSize } = PAGE_STATE;

  const paginationParams = useFilters({
    initialPage: page,
    itemsPerPage: pageSize,
    data,
  });

  useEffect(() => {
    dispatch(fetchUnassignedFleetData());
  }, [refetch]);

  useEffect(() => {
    dispatch(fetchFleetsWithVessels({ page: paginationParams.currentPage, perPage: paginationParams.perPage }));
  }, [paginationParams.currentPage, paginationParams.perPage, refetch]);

  const layoutConfig = {
    data: {
      label: null,
      title: 'Тanker List',
    },
    pagination: { ...paginationParams, totalPages },
    onToggle: ({ value }) => dispatch(setToggle(value)),
    withActions: true,
  };

  return <AccountNestedLayout config={layoutConfig}>{children}</AccountNestedLayout>;
}
