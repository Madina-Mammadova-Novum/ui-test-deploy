'use client';

import { useState } from 'react';

// import OnSubsExpandedContent from './OnSubsExpandedContent';
// import OnSubsExpandedFooter from './OnSubsExpandedFooter';

import FleetsExpandedContent from './FleetsExpandedContent';

import { fleetsPageHeaderDataAdapter, fleetsPageRowsDataAdapter } from '@/adapters';
import PlusCircleSVG from '@/assets/images/plusCircle.svg';
import { Button, ExpandableCardHeader, Loader, Title } from '@/elements';
// import { NAVIGATION_PARAMS } from '@/lib/constants';
import { ExpandableRow } from '@/modules';
import { getUserFleets } from '@/services';
import { ToggleRows } from '@/units';
import { useFetch } from '@/utils/hooks';

const Fleets = () => {
  const [toggle, setToggle] = useState(false);
  const [data, isLoading] = useFetch(getUserFleets);
  //   const initialPagesStore = {
  //     currentPage: NAVIGATION_PARAMS.CURRENT_PAGE,
  //     perPage: NAVIGATION_PARAMS.DATA_PER_PAGE[0].value,
  //   };

  //   const {
  //     numberOfPages,
  //     items,
  //     currentPage,
  //     handlePageChange,
  //     handleSelectedPageChange,
  //     selectedPage,
  //     onChangeOffers,
  //     perPage,
  //   } = useFilters(initialPagesStore.perPage, initialPagesStore.currentPage, data);

  const printExpandableRow = (rowData) => {
    const rowHeader = fleetsPageHeaderDataAdapter({ data: rowData });

    return (
      <ExpandableRow header={<ExpandableCardHeader headerData={rowHeader} />} expand={toggle}>
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
          <ToggleRows value={toggle} onToggleClick={() => setToggle((prevState) => !prevState)} />
          <Button
            buttonProps={{
              text: 'Create new fleet',
              variant: 'primary',
              size: 'large',
              icon: {
                before: <PlusCircleSVG className="fill-white" />,
              },
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-y-2.5">{data && data.map(printExpandableRow)}</div>

      {/* <ComplexPagination
        currentPage={currentPage}
        numberOfPages={numberOfPages}
        onPageChange={handlePageChange}
        onSelectedPageChange={handleSelectedPageChange}
        pages={selectedPage}
        onChangeOffers={onChangeOffers}
        perPage={perPage}
      /> */}
    </section>
  );
};

export default Fleets;
