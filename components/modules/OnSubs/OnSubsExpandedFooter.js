import React from 'react';

import FailTheSubsModalContent from './FailTheSubsModalContent';

import { OnSubsExpandedFooterPropTypes } from '@/lib/types';

import ClockSVG from '@/assets/images/clock.svg';
import MobileSVG from '@/assets/images/mobile.svg';
import CircleArrowsSVG from '@/assets/images/process.svg';
import { Button, Divider, QrCode } from '@/elements';
import { ExpandableRowFooter, ModalWindow } from '@/units';

const APP_DOWNLOAD_URL = 'https://apps.apple.com/app/id1146507477';
const APP_LOGO_PATH = '/images/dark-logo.svg';

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

    const justifyClass = underRecap && !isOwnerConfirmed && !isChartererConfirmed ? 'justify-between' : 'justify-end';

    return (
      <div className={`flex gap-x-5 ${justifyClass} pt-2.5`}>
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
          <div className="flex w-full gap-x-2.5">
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
            <ModalWindow
              buttonProps={{
                variant: 'primary',
                size: 'large',
                text: 'Lift The Sub',
                className: 'w-max',
                // disabled: underRecap,
              }}
              containerClass="w-[356px] max-w-full"
            >
              <div className="flex flex-col items-center p-4 text-center">
                <div className="mb-4 text-xsm font-semibold text-gray-900">
                  The lifting process is handled in our mobile app. If you&apos;ve already downloaded it, please open
                  the app now. Otherwise, scan the QR code below to download the app.
                </div>
                <div className="flex justify-center">
                  <QrCode
                    value={APP_DOWNLOAD_URL}
                    logo={APP_LOGO_PATH}
                    size={180}
                    logoWidth={150}
                    logoHeight={100}
                    logoOpacity={0.5}
                  />
                </div>
                <div className="mt-4 text-xs text-gray-500">Scan to download the ShipLink app</div>
              </div>
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
