'use client';

import { useCallback, useEffect, useState } from 'react';

import { Label, Loader, Title } from '@/elements';
import { NAVIGATION_PARAMS } from '@/lib/constants';
import { ExpandableRow } from '@/modules';
import NegotiatingExpandedContent from '@/modules/Negotiating/NegotiatingExpandedContent';
import NegotiatingExpandedFooter from '@/modules/Negotiating/NegotiatingExpandedFooter';
import { getUserNegotiating } from '@/services';
import { ComplexPagination, ExpandableRowHeader, ToggleRows } from '@/units';
import { useFilters } from '@/utils/hooks';

const Negotiating = () => {
  const [negotiatingData, setNegotiatingData] = useState(null);
  const [toggle, setToggle] = useState(false);

  const initialPagesStore = {
    currentPage: NAVIGATION_PARAMS.CURRENT_PAGE,
    perPage: NAVIGATION_PARAMS.DATA_PER_PAGE[0].value,
  };

  const { numberOfPages, items, currentPage, handlePageChange, handleSelectedPageChange, selectedPage, onChangeOffers, perPage } =
    useFilters(initialPagesStore.perPage, initialPagesStore.currentPage, negotiatingData);

  const fetchData = useCallback(async () => {
    try {
      const data = await getUserNegotiating();
      setNegotiatingData(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  return negotiatingData ? (
    <section>
      <div className="flex justify-between items-center py-5">
        <div className="flex flex-col">
          <Label className="text-xs-sm">Offer stage #1</Label>
          <Title level={1}>Negotiating</Title>
        </div>
        <ToggleRows value={toggle} onToggleClick={() => setToggle((prevState) => !prevState)} />
      </div>

      <div className="flex flex-col gap-y-2.5">
        {items && items.map((rowHeader) => (
          <ExpandableRow
            header={<ExpandableRowHeader headerData={rowHeader} />}
            footer={<NegotiatingExpandedFooter isCharterer />}
            expand={toggle}
          >
            <NegotiatingExpandedContent />
          </ExpandableRow>
        ))}
      </div>

      <ComplexPagination currentPage={currentPage}
        numberOfPages={numberOfPages}
        onPageChange={handlePageChange}
        onSelectedPageChange={handleSelectedPageChange}
        pages={selectedPage}
        onChangeOffers={onChangeOffers}
        perPage={perPage} />
    </section>
  ) : (
    <Loader className="h-8 w-8 absolute top-1/2" />
  );
};

export default Negotiating;
