import FailTheSubsModalContent from './FailTheSubsModalContent';

import { OnSubsExpandedFooterPropTypes } from '@/lib/types';

import ClockSVG from '@/assets/images/clock.svg';
import MobileSVG from '@/assets/images/mobile.svg';
import CircleArrowsSVG from '@/assets/images/process.svg';
import { Button, Divider } from '@/elements';
import { ExpandableRowFooter, ModalWindow } from '@/units';

const OnSubsExpandedFooter = ({ underRecap = true, offerId, status, identity }) => {
  const isOwnerConfirmed = identity.isOwner && status.owner === 'Confirmed';
  const isChartererConfirmed = identity.isCharterer && status.charterer === 'Confirmed';

  const isCounterpartyPending =
    (isOwnerConfirmed && status.charterer !== 'Confirmed') || (isChartererConfirmed && status.owner !== 'Confirmed');

  const printCta = () => {
    if (isOwnerConfirmed && isCounterpartyPending)
      return (
        <Button
          buttonProps={{
            text: "You have lifted the subs. We are waiting for your counterparty's decision. You will be notified soon",
            icon: { before: <ClockSVG /> },
            variant: 'tertiary',
            size: 'large',
          }}
          customStyles="w-full"
          disabled
        />
      );

    if (isChartererConfirmed && isCounterpartyPending)
      return (
        <Button
          buttonProps={{
            text: "You have lifted the subs. We are waiting for your counterparty's decision. You will be notified soon",
            icon: { before: <ClockSVG /> },
            variant: 'tertiary',
            size: 'large',
          }}
          customStyles="w-full"
          disabled
        />
      );

    return (
      <div className={`flex gap-x-5 ${underRecap ? 'justify-between' : 'justify-end'} pt-2.5`}>
        {!isOwnerConfirmed && !isChartererConfirmed && (
          <div className="w-full grow">
            <Button
              buttonProps={{
                text: underRecap ? 'The recap is being finalized' : 'To lift the subs, please use our mobile app',
                icon: { before: underRecap ? <CircleArrowsSVG /> : <MobileSVG className="h-5 w-5 fill-gray" /> },
                variant: 'tertiary',
                size: 'large',
              }}
              customStyles="w-full whitespace-nowrap 3md:grow"
              disabled
            />
          </div>
        )}

        <div className="flex items-center justify-end gap-x-2.5 gap-y-2.5">
          <div className="w-full">
            <ModalWindow
              buttonProps={{
                variant: 'delete',
                size: 'large',
                text: 'Fail the Subs',
                className: 'w-max',
                disabled: underRecap,
              }}
              containerClass="w-[356px]"
            >
              <FailTheSubsModalContent offerId={offerId} />
            </ModalWindow>
          </div>
        </div>
      </div>
    );
  };

  return (
    <ExpandableRowFooter>
      <Divider />
      <div className="w-full py-2.5">{printCta()}</div>
    </ExpandableRowFooter>
  );
};

OnSubsExpandedFooter.propTypes = OnSubsExpandedFooterPropTypes;

export default OnSubsExpandedFooter;
