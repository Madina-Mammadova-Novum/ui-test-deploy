'use client';

import { useCallback, useMemo } from 'react';

import classnames from 'classnames';

import { ExpandableCardHeaderPropTypes } from '@/lib/types';

import TableArrowSVG from '@/assets/images/arrow.svg';
import { HoverTooltip, TextWithLabel } from '@/elements';
import { ACTIONS, NO_DATA_MESSAGE, SETTINGS } from '@/lib/constants';
import { DeleteFleetModal, DynamicCountdownTimer, EditFleetForm, ModalWindow } from '@/units';
import { processTooltipData } from '@/utils/helpers';
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
  const lg = useMediaQuery('(min-width: 1280px)');
  const sm3 = useMediaQuery('(max-width: 1023px)');

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

  const textLength = useMemo(() => {
    if (lg) return 35;
    if (sm3) return 20;

    return SETTINGS.MAX_VISIBLE_TEXT_LENGTH;
  }, [lg, sm3]);

  const printHeaderRow = (data, index) => {
    const { disableTooltip, tooltipText, trimmedText } = processTooltipData({ text: data.text, length: textLength });

    let textContent = lg && !data?.disableTooltip ? trimmedText : tooltipText;
    if (data.countdownData && data.isFailed) return null;

    if (data.label === 'Status' && !data.isFailed) return null;

    if (data.countdownData) {
      textContent = <DynamicCountdownTimer {...data.countdownData} />;
    }

    const newId = crypto.randomUUID();

    return (
      <div
        key={newId}
        className={classnames({
          'col-start-1': !lg,
          [`${index <= 3 ? '3md:col-start-1' : '3md:col-start-2'}`]: !lg,
          [`${!index && 'w-full'}`]: !gridLayout,
        })}
        style={{ gridRowStart: !lg && !sm3 && index > 3 && index - 3 }}
      >
        <HoverTooltip
          className="!-left-10 !top-0"
          data={{ description: tooltipText }}
          disabled={!lg || disableTooltip || data?.disableTooltip}
        >
          <TextWithLabel
            label={data?.label}
            text={textContent}
            coverImage={data?.coverImage}
            customStyles={`${!index && 'mr-auto'} ${
              data?.customStyles
            } items-baseline [&>label]:!self-baseline [&>div]:!items-center`}
            textStyles={`${data?.textStyles} whitespace-normal`}
            helperData={data?.helperData}
            icon={data?.icon}
            countryCode={data?.countryCode}
          />
        </HoverTooltip>
      </div>
    );
  };

  return (
    <div className="relative flex h-auto min-h-[60px] w-full items-start gap-x-2.5 pt-2.5">
      <div className={`flex flex-grow flex-col pb-2.5 lg:flex-row ${gridLayout && 'lg:grid'} ${itemsContainerStyles}`}>
        <div
          className={`grid md:grid-cols-1 ${headerData?.length > 3 && '3md:grid-cols-2'} ${
            !gridLayout && 'w-full gap-x-2.5 lg:flex lg:flex-row lg:items-center'
          }`}
          style={{ gridTemplateColumns: lg && (gridStyles || `repeat(${headerData.length}, minmax(0, 1fr))`) }}
        >
          {headerData.map(printHeaderRow)}
        </div>
        {!!actions.length && (
          <div className="relative w-full lg:pr-10">
            <div className="mt-3 flex justify-end gap-x-2.5 border-t border-purple-light pt-2 lg:col-start-2 lg:row-start-1 lg:mt-0 lg:border-t-0 lg:pt-0">
              {actions.map(({ action, text, variant, size, icon }) => (
                <ModalWindow
                  key={action}
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
          </div>
        )}
      </div>
      <div className="absolute -right-2.5 self-start rounded-md hover:bg-gray-darker lg:self-auto">
        <TableArrowSVG
          className={classnames('rounded-md fill-black transition duration-200', toggle && 'rotate-180 !fill-blue')}
        />
      </div>
    </div>
  );
};

ExpandableCardHeader.propTypes = ExpandableCardHeaderPropTypes;

export default ExpandableCardHeader;
