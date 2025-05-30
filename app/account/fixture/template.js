'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'next/navigation';

import { AccountNestedLayout } from '@/layouts';
import { PAGE_STATE } from '@/lib/constants';
import { fetchFixtureOffers } from '@/store/entities/fixture/actions';
import { setToggle } from '@/store/entities/fixture/slice';
import { getFixtureDataSelector } from '@/store/selectors';
import { useFilters } from '@/utils/hooks';

export default function FixtureLayout({ children }) {
  const dispatch = useDispatch();
  const searchedParams = useParams();

  const { offers, totalPages } = useSelector(getFixtureDataSelector);
  const { page, pageSize } = PAGE_STATE;

  const paginationParams = useFilters({
    initialPage: page,
    itemsPerPage: pageSize,
    data: offers,
  });

  useEffect(() => {
    dispatch(fetchFixtureOffers({ page: paginationParams.currentPage, perPage: paginationParams.perPage }));
  }, [paginationParams.currentPage, paginationParams.perPage]);

  const layoutConfig = {
    withActions: false,
    useExpand: true,
    usePagination: !searchedParams.id,
    data: { label: 'Offer stage #4', title: 'Fixture' },
    pagination: { ...paginationParams, totalPages },
    onToggle: ({ value }) => dispatch(setToggle(value)),
  };

  return <AccountNestedLayout config={layoutConfig}>{children}</AccountNestedLayout>;
}
