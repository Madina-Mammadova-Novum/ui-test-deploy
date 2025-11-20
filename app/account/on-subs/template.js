'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'next/navigation';

import { AccountNestedLayout } from '@/layouts';
import { PAGE_STATE } from '@/lib/constants';
import { fetchOnSubsOffers } from '@/store/entities/on-subs/actions';
import { setToggle } from '@/store/entities/on-subs/slice';
import { getOnSubsDataSelector } from '@/store/selectors';
import { useFilters } from '@/utils/hooks';

export default function OnSubsLayout({ children }) {
  const dispatch = useDispatch();
  const searchedParams = useParams();
  const { offers, totalPages, toggle } = useSelector(getOnSubsDataSelector);

  const { page, pageSize } = PAGE_STATE;

  const paginationParams = useFilters({
    initialPage: page,
    itemsPerPage: pageSize,
    data: offers,
  });

  useEffect(() => {
    dispatch(fetchOnSubsOffers({ page: paginationParams.currentPage, perPage: paginationParams.perPage }));
  }, [paginationParams.currentPage, paginationParams.perPage]);

  const layoutConfig = {
    useExpand: true,
    usePagination: !searchedParams.id,
    withActions: false,
    data: { label: 'Offer stage #3', title: 'On subs' },
    pagination: { ...paginationParams, totalPages },
    onToggle: ({ value }) => dispatch(setToggle(value)),
    expandAll: toggle,
  };

  return <AccountNestedLayout config={layoutConfig}>{children}</AccountNestedLayout>;
}
