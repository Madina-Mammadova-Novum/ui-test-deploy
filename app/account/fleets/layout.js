'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PlusCircleSVG from '@/assets/images/plusCircle.svg';
import { Title } from '@/elements';
import { PAGE_STATE } from '@/lib/constants';
import { AddNewTanker } from '@/modules';
import { setToggle } from '@/store/entities/fixture/slice';
import { fetchFleetsWithVessels, fetchUnassignedFleetData } from '@/store/entities/fleets/actions';
import { getFleetsSelector } from '@/store/selectors';
import { ComplexPagination, CreateFleetForm, ModalWindow, ToggleRows } from '@/units';
import { convertDataToOptions } from '@/utils/helpers';
import { useFilters } from '@/utils/hooks';

export default function FleetsLayout({ children }) {
  const dispatch = useDispatch();
  const { refetch, data, totalPages } = useSelector(getFleetsSelector);

  const { page, pageSize } = PAGE_STATE;

  const { currentPage, handlePageChange, handleSelectedPageChange, onChangeOffers, perPage } = useFilters({
    initialPage: page,
    itemsPerPage: pageSize,
    data,
  });

  const handleToggle = ({ value }) => dispatch(setToggle(value));

  useEffect(() => {
    dispatch(fetchUnassignedFleetData());
  }, [refetch]);

  useEffect(() => {
    dispatch(fetchFleetsWithVessels({ page: currentPage, perPage }));
  }, [perPage, currentPage, refetch]);

  return (
    <div className="px-5">
      <section className="flex min-h-[90vh] flex-col gap-y-5">
        <div className="flex justify-between items-center py-5">
          <Title level="1" className="self-baseline">
            Tanker list
          </Title>
          <div className="flex flex-col-reverse gap-y-5 items-end 3md:items-center 3md:flex-row gap-x-5">
            <ToggleRows onToggleClick={handleToggle} />
            <div className="flex gap-x-5">
              <ModalWindow
                buttonProps={{
                  text: 'Create new fleet',
                  variant: 'primary',
                  size: 'large',
                  icon: {
                    before: <PlusCircleSVG className="fill-white" />,
                  },
                }}
              >
                <CreateFleetForm />
              </ModalWindow>
              <ModalWindow
                buttonProps={{
                  text: 'Add a New Tanker',
                  variant: 'primary',
                  size: 'large',
                  icon: {
                    before: <PlusCircleSVG className="fill-white" />,
                  },
                }}
              >
                <AddNewTanker fleetOptions={convertDataToOptions({ data }, 'id', 'name')} />
              </ModalWindow>
            </div>
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
