'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';

import FleetsExpandedContent from './FleetsExpandedContent';

import { fleetsPageHeaderDataAdapter, fleetsPageRowsDataAdapter } from '@/adapters';
import PlusCircleSVG from '@/assets/images/plusCircle.svg';
import { ExpandableCardHeader, Loader, Title } from '@/elements';
import { ACTIONS, NAVIGATION_PARAMS } from '@/lib/constants';
import { ExpandableRow } from '@/modules';
import { getUserFleets } from '@/services';
import { fleetsSelector } from '@/store/selectors';
import { ComplexPagination, CreateFleetForm, ModalWindow, ToggleRows } from '@/units';
import { useFetch, useFilters } from '@/utils/hooks';

const Fleets = () => {
  const [toggle, setToggle] = useState({ value: false });
  const { refetch } = useSelector(fleetsSelector);
  const [data, isLoading] = useFetch(getUserFleets, refetch);
  const [userStore] = useState({
    sortOptions: NAVIGATION_PARAMS.DATA_SORT_OPTIONS,
    sortValue: NAVIGATION_PARAMS.DATA_SORT_OPTIONS[0],
  });

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
            actions={[
              {
                action: ACTIONS.ADD_TANKER,
                text: 'Add a New Tanker',
                variant: 'primary',
                size: 'small',
                icon: {
                  before: <PlusCircleSVG className="fill-blue" />,
                },
              },
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
        <FleetsExpandedContent rowsData={fleetsPageRowsDataAdapter({ data: rowData.tankers })} />
      </ExpandableRow>
    );
  };

  if (isLoading) {
    return <Loader className="h-8 w-8 absolute top-1/2" />;
  }

  return (
    <section>
      <div className="flex justify-between items-center py-5">
        <Title level={1}>Fleets</Title>
        <div className="flex gap-x-5">
          <ToggleRows onToggleClick={setToggle} />
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
        </div>
      </div>

      <div className="flex flex-col gap-y-2.5">{items && items.map(printExpandableRow)}</div>
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
