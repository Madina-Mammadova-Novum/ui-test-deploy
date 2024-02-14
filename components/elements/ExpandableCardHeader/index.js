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
    if (lg) return 24;
    if (sm3) return 20;

    return SETTINGS.MAX_VISIBLE_TEXT_LENGTH;
  }, [lg, sm3]);

  const printHeaderRow = (data, index) => {
    const { disableTooltip, tooltipText, trimmedText } = processTooltipData({ text: data.text, length: textLength });

    let textContent = lg && !data?.disableTooltip ? trimmedText : tooltipText;

    if (data.countdownData) {
      textContent = <DynamicCountdownTimer {...data.countdownData} />;
    }

    return (
      <div
        className={classnames({
          'col-start-1': !lg,
          [`${index <= 3 ? '3md:col-start-1' : '3md:col-start-2'}`]: !lg,
          [`${!index && 'w-full'}`]: !gridLayout,
        })}
        style={{ gridRowStart: !lg && !sm3 && index > 3 && index - 3 }}
      >
        <HoverTooltip data={{ description: tooltipText }} disabled={!lg || disableTooltip || data?.disableTooltip}>
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
    <div className="w-full relative h-auto min-h-[60px] flex items-start gap-x-2.5 pt-2.5">
      <div className={`flex flex-col lg:flex-row flex-grow pb-2.5 ${gridLayout && 'lg:grid'} ${itemsContainerStyles}`}>
        <div
          className={`grid gap-y-1 md:grid-cols-1 ${headerData?.length > 3 && '3md:grid-cols-2'} ${
            !gridLayout && 'lg:flex lg:flex-row lg:items-center w-full gap-x-2.5'
          }`}
          style={{ gridTemplateColumns: lg && (gridStyles || `repeat(${headerData.length}, minmax(0, 1fr))`) }}
        >
          {headerData.map(printHeaderRow)}
        </div>
        {!!actions.length && (
          <div className="w-full relative lg:pr-10">
            <div className="flex border-t border-purple-light lg:border-t-0 gap-x-2.5 justify-end pt-2 mt-3 lg:pt-0 lg:mt-0 lg:row-start-1 lg:col-start-2">
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
          </div>
        )}
      </div>
      <div className="hover:bg-gray-darker rounded-md self-start lg:self-auto absolute right-0">
        <TableArrowSVG
          className={classnames('fill-black rounded-md transition duration-200 ', toggle && 'rotate-180 !fill-blue')}
        />
      </div>
    </div>
  );
};

ExpandableCardHeader.propTypes = ExpandableCardHeaderPropTypes;

export default ExpandableCardHeader;
