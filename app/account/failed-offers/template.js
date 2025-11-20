'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'next/navigation';

import { AccountNestedLayout } from '@/layouts';
import { PAGE_STATE } from '@/lib/constants';
import { fetchCargoCodes, fetchCargoTypes, fetchVesselNames } from '@/store/entities/cargo-vessel/actions';
import { fetchFailedOffers } from '@/store/entities/failed-offers/actions';
import { setToggle } from '@/store/entities/failed-offers/slice';
import { getFailedOffersDataSelector } from '@/store/selectors';
import { useFilters } from '@/utils/hooks';

export default function FailedOffersLayout({ children }) {
  const dispatch = useDispatch();
  const searchedParams = useParams();

  const { offers, totalPages, searchParams, sorting, toggle } = useSelector(getFailedOffersDataSelector);
  const { page, pageSize } = PAGE_STATE;

  const paginationParams = useFilters({
    initialPage: page,
    itemsPerPage: pageSize,
    data: offers,
  });

  // Fetch initial data
  useEffect(() => {
    dispatch(fetchCargoTypes());
    dispatch(fetchCargoCodes());
    dispatch(fetchVesselNames());
  }, []);

  useEffect(() => {
    dispatch(
      fetchFailedOffers({
        page: paginationParams.currentPage,
        perPage: paginationParams.perPage,
        searchParams,
        sorting,
      })
    );
  }, [paginationParams.currentPage, paginationParams.perPage]);

  useEffect(() => {
    if (paginationParams.currentPage > 1) paginationParams.handlePageChange({ selected: 0 });
  }, [JSON.stringify({ ...searchParams, ...sorting })]);

  const layoutConfig = {
    withActions: false,
    data: { label: 'Offers', title: 'Failed/Declined' },
    pagination: { ...paginationParams, totalPages },
    onToggle: ({ value }) => dispatch(setToggle(value)),
    isDetailsPage: Boolean(searchedParams.id),
    expandAll: toggle,
  };

  return <AccountNestedLayout config={layoutConfig}>{children}</AccountNestedLayout>;
}
