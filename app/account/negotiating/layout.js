'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Label, Title } from '@/elements';
import { PAGE_STATE } from '@/lib/constants';
import { fetchUserNegotiating } from '@/store/entities/negotiating/actions';
import { setToggle } from '@/store/entities/negotiating/slice';
import { getNegotiatingDataSelector } from '@/store/selectors';
import { ComplexPagination, ToggleRows } from '@/units';
import { useFilters } from '@/utils/hooks';

export default function NegotiatingLayout({ children }) {
  const dispatch = useDispatch();
  const { offers, totalPages } = useSelector(getNegotiatingDataSelector);

  const { page, pageSize } = PAGE_STATE;

  const { currentPage, handlePageChange, handleSelectedPageChange, onChangeOffers, perPage } = useFilters({
    initialPage: page,
    itemsPerPage: pageSize,
    data: offers,
  });

  const handleToggle = ({ value }) => dispatch(setToggle(value));

  useEffect(() => {
    dispatch(fetchUserNegotiating({ page: currentPage, perPage }));
  }, [currentPage, perPage]);

  return (
    <div className="px-5">
      <section className="flex min-h-[90vh] flex-col gap-y-5">
        <div className="flex justify-between items-center pt-5">
          <div className="flex flex-col">
            <Label className="text-xs-sm">Offer stage #1</Label>
            <Title level="1">Negotiating</Title>
          </div>
          <ToggleRows onToggleClick={handleToggle} />
        </div>
        {children}
        <ComplexPagination
          label="offers"
          perPage={perPage}
          currentPage={currentPage}
          numberOfPages={totalPages}
          onPageChange={handlePageChange}
          onSelectedPageChange={handleSelectedPageChange}
          onChangeOffers={onChangeOffers}
        />
      </section>
    </div>
  );
}
