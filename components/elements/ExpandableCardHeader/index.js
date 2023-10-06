'use client';

import { useCallback } from 'react';

import classnames from 'classnames';

import { ExpandableCardHeaderPropTypes } from '@/lib/types';

import TableArrowSVG from '@/assets/images/arrow.svg';
import { TextWithLabel } from '@/elements';
import { ACTIONS, NO_DATA_MESSAGE } from '@/lib/constants';
import { DeleteFleetModal, DynamicCountdownTimer, EditFleetForm, ModalWindow } from '@/units';
import { useMediaQuery } from '@/utils/hooks';

const ExpandableCardHeader = ({
  toggle = false,
  headerData = [],
  actions = [],
  itemsContainerStyles = '',
  gridLayout = true,
  gridStyles = '',
  itemId,
}) => {
  const sm3 = useMediaQuery('(max-width: 1023px)');
  const lg = useMediaQuery('(min-width: 1280px)');

  const printModal = useCallback(
    (action) => {
      switch (action) {
        case ACTIONS.EDIT_FLEET:
          return <EditFleetForm id={itemId} />;
        case ACTIONS.DELETE_FLEET:
          return <DeleteFleetModal id={itemId} />;
        default:
          return <div>{NO_DATA_MESSAGE.DEFAULT}</div>;
      }
    },
    [itemId]
  );

  const printHeaderRow = (data, index) => (
    <div
      className={classnames({
        'col-start-1': !lg,
        [`${index <= 3 ? '3md:col-start-1' : '3md:col-start-2'}`]: !lg,
        [`${!index && 'w-full'}`]: !gridLayout,
      })}
      style={{ gridRowStart: !lg && !sm3 && index > 3 && index - 3 }}
    >
      <TextWithLabel
        label={data?.label}
        text={data.countdownData ? <DynamicCountdownTimer {...data.countdownData} /> : data?.text}
        coverImage={data?.coverImage}
        customStyles={!index && 'mr-auto'}
        textStyles={data?.textStyles}
        helperData={data?.helperData}
        icon={data?.icon}
        countryCode={data?.countryCode}
      />
    </div>
  );

  return (
    <div className="w-full h-auto lg:h-[60px] flex items-center gap-x-2.5 py-3 lg:py-0">
      <div className={`flex flex-col lg:flex-row flex-grow ${gridLayout && 'lg:grid'} ${itemsContainerStyles}`}>
        <div
          className={`grid md:grid-cols-1 3md:grid-cols-2 ${
            !gridLayout && 'lg:flex lg:flex-row lg:items-center w-full gap-x-2.5'
          }`}
          style={{ gridTemplateColumns: lg && (gridStyles || `repeat(${headerData.length}, minmax(0, 1fr))`) }}
        >
          {headerData.map(printHeaderRow)}
        </div>
        {!!actions.length && (
          <div className="flex gap-x-2.5 justify-end border-t border-t-grey ml-5 lg:border-none pt-2 mt-3 lg:pt-0 lg:mt-0 lg:row-start-1 lg:col-start-2">
            {actions.map(({ action, text, variant, size, icon }) => (
              <ModalWindow
                containerClass="overflow-y-[unset]"
                buttonProps={{
                  icon,
                  variant,
                  size,
                  text,
                  className: 'whitespace-nowrap',
                }}
              >
                {printModal(action)}
              </ModalWindow>
            ))}
          </div>
        )}
      </div>
      <div className="hover:bg-gray-darker rounded-md self-start lg:self-auto">
        <TableArrowSVG
          className={classnames('fill-black rounded-md transition duration-200 ', toggle && 'rotate-180 !fill-blue')}
        />
      </div>
    </div>
  );
};

ExpandableCardHeader.propTypes = ExpandableCardHeaderPropTypes;

export default ExpandableCardHeader;
