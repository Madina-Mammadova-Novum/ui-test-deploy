'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FleetsExpandedContent from './FleetsExpandedContent';

import { fleetsPageHeaderDataAdapter, fleetsPageRowsDataAdapter } from '@/adapters';
import PlusCircleSVG from '@/assets/images/plusCircle.svg';
import { ExpandableCardHeader, Loader, Title } from '@/elements';
import { ACTIONS, NAVIGATION_PARAMS } from '@/lib/constants';
import { AddNewTanker, ExpandableRow } from '@/modules';
import { fetchFleetsWithVessels, fetchUnassignedFleetData } from '@/store/entities/fleets/actions';
import { fleetsSelector } from '@/store/selectors';
import { ComplexPagination, CreateFleetForm, ModalWindow, ToggleRows, UnassignedFleet } from '@/units';
import { convertDataToOptions } from '@/utils/helpers';
import { useFilters } from '@/utils/hooks';

const Fleets = () => {
  const [toggle, setToggle] = useState({ value: false });
  const { refetch, data, loading: isLoading } = useSelector(fleetsSelector);
  const [userStore] = useState({
    sortOptions: NAVIGATION_PARAMS.DATA_SORT_OPTIONS,
    sortValue: NAVIGATION_PARAMS.DATA_SORT_OPTIONS[0],
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFleetsWithVessels());
    dispatch(fetchUnassignedFleetData());
  }, [dispatch, refetch]);

  const initialPagesStore = {
    currentPage: NAVIGATION_PARAMS.CURRENT_PAGE,
    perPage: NAVIGATION_PARAMS.DATA_PER_PAGE[0].value,
  };

  const { sortValue } = userStore;

  const {
    numberOfPages,
    items,
    currentPage,
    handlePageChange,
    handleSelectedPageChange,
    selectedPage,
    onChangeOffers,
    perPage,
  } = useFilters(initialPagesStore.perPage, initialPagesStore.currentPage, data, sortValue.value);

  const printExpandableRow = (rowData) => {
    const rowHeader = fleetsPageHeaderDataAdapter({ data: rowData });
    return (
      <ExpandableRow
        header={
          <ExpandableCardHeader
            headerData={rowHeader}
            itemId={rowData?.id}
            itemsContainerStyles="lg:grid-cols-2"
            actions={[
              {
                action: ACTIONS.EDIT_FLEET,
                text: 'Edit',
                variant: 'tertiary',
                size: 'medium',
              },
              {
                action: ACTIONS.DELETE_FLEET,
                text: 'Delete',
                variant: 'delete',
                size: 'medium',
              },
            ]}
          />
        }
        expand={toggle}
      >
        <FleetsExpandedContent
          rowsData={fleetsPageRowsDataAdapter({ data: rowData.vessels, fleetName: rowData.name })}
          fleetId={rowData.id}
        />
      </ExpandableRow>
    );
  };

  if (isLoading) {
    return <Loader className="h-8 w-8 absolute top-1/2" />;
  }

  return (
    <section>
      <div className="flex justify-between items-center py-5">
        <Title level={1} className="self-baseline">
          Tanker list
        </Title>
        <div className="flex flex-col-reverse gap-y-5 items-end 3md:items-center 3md:flex-row gap-x-5">
          <ToggleRows onToggleClick={setToggle} />
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

      <div className="flex flex-col gap-y-2.5">
        <UnassignedFleet toggle={toggle} />
        {items && items.map(printExpandableRow)}
      </div>
      <ComplexPagination
        label="fleets"
        currentPage={currentPage}
        numberOfPages={numberOfPages}
        onPageChange={handlePageChange}
        onSelectedPageChange={handleSelectedPageChange}
        pages={selectedPage}
        onChangeOffers={onChangeOffers}
        perPage={perPage}
      />
    </section>
  );
};

export default Fleets;
