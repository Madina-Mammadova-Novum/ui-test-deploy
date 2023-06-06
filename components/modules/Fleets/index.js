'use client';

import { useState } from 'react';

import FleetsExpandedContent from './FleetsExpandedContent';

import { fleetsPageHeaderDataAdapter, fleetsPageRowsDataAdapter } from '@/adapters';
import PlusCircleSVG from '@/assets/images/plusCircle.svg';
import { ExpandableCardHeader, Loader, Title } from '@/elements';
import { ACTIONS } from '@/lib/constants';
import { ExpandableRow } from '@/modules';
import { getUserFleets } from '@/services';
import { CreateFleetForm, ModalWindow, ToggleRows } from '@/units';
import { useFetch } from '@/utils/hooks';

const Fleets = () => {
  const [toggle, setToggle] = useState(false);
  const [data, isLoading] = useFetch(getUserFleets);

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
          <ToggleRows value={toggle} onToggleClick={() => setToggle((prevState) => !prevState)} />
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

      <div className="flex flex-col gap-y-2.5">{data && data.map(printExpandableRow)}</div>
    </section>
  );
};

export default Fleets;
