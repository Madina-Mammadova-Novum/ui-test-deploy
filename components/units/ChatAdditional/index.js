import { ChatAdditionalPropTypes } from '@/lib/types';

import ArrowSVG from '@/assets/images/small-arrow.svg';
import { TextRow } from '@/elements';
import { Flag } from '@/units';

const ChatAdditional = ({ data, isActive, onClick }) => {
  const { vessel, countries, additional } = data;

  const printAdditionalProducts = ({ id, name }, index) => (
    <TextRow key={id} title={`Product #${index + 1}`} className="!text-xs-sm normal-case">
      {name.charAt(0).toUpperCase() + name.slice(1) || '-'}
    </TextRow>
  );

  return (
    additional && (
      <>
        <span
          aria-hidden
          onClick={onClick}
          className="flex cursor-pointer items-center gap-x-1.5 pt-1.5 text-xsm font-medium text-blue"
        >
          Show all info
          <ArrowSVG
            className={`transform transition-all duration-300 ease-in-out ${isActive ? '-rotate-180' : 'rotate-0'}`}
          />
        </span>
        {isActive && (
          <div className="h-auto pt-1.5">
            <TextRow title="Load terminal" className="!text-xs-sm">
              <span className="flex gap-x-1">
                <Flag data={countries} id={additional?.terminal?.countryId} />
                {additional?.terminal?.name || '-'}
              </span>
            </TextRow>
            <TextRow title="Laycan" className="whitespace-nowrap pb-2.5 !text-xs-sm">
              {additional?.laycanStart} to {additional?.laycanEnd}
            </TextRow>
            {vessel?.products?.map(printAdditionalProducts)}
            <TextRow title="Total Quantity" className="!text-xs-sm">
              {additional?.totalQuantity || '-'} tons
            </TextRow>
          </div>
        )}
      </>
    )
  );
};

ChatAdditional.propTypes = ChatAdditionalPropTypes;

export default ChatAdditional;
