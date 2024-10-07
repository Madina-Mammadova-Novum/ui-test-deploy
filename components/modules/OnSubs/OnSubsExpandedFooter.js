import FailTheSubsModalContent from './FailTheSubsModalContent';

import { OnSubsExpandedFooterPropTypes } from '@/lib/types';

import ClockSVG from '@/assets/images/clock.svg';
import CircleArrowsSVG from '@/assets/images/process.svg';
import { Button, Divider, NextLink } from '@/elements';
import { ExpandableRowFooter, ModalWindow } from '@/units';

const OnSubsExpandedFooter = ({ underRecap = true, offerId, status, identity, scriveURL = '' }) => {
  const owner = identity.isOwner && status.owner === 'Confirmed' && status.charterer !== 'Confirmed';
  const charterer = identity.isCharterer && status.charterer === 'Confirmed' && status.owner !== 'Confirmed';

  const printCta = () => {
    if (owner)
      return (
        <Button
          buttonProps={{
            text: 'You have lifted the subs. We are waiting for your counterparty’s decision. You will be notified soon',
            icon: { before: <ClockSVG /> },
            variant: 'tertiary',
            size: 'large',
          }}
          customStyles="w-full"
          disabled
        />
      );

    if (charterer)
      return (
        <Button
          buttonProps={{
            text: 'You have lifted the subs. We are waiting for your counterparty’s decision. You will be notified soon',
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
        {underRecap && (
          <div className="w-full grow">
            <Button
              buttonProps={{
                text: 'The recap is being finalized',
                icon: { before: <CircleArrowsSVG /> },
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
          <div className="w-full">
            <NextLink
              href={scriveURL}
              target="_blank"
              className={`block h-10 whitespace-nowrap rounded-md bg-blue px-5 py-2.5 text-xsm text-white hover:bg-blue-darker ${
                underRecap && 'pointer-events-none opacity-50'
              }`}
            >
              Lift the Subs
            </NextLink>
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
