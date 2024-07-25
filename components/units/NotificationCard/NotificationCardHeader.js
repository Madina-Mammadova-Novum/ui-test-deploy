import { useMemo } from 'react';

import { NotificationCardHeaderPropTypes } from '@/lib/types';

import BagSVG from '@/assets/images/bag.svg';
import CountDownReminderSVG from '@/assets/images/clock.svg';
import DocumentInfoSVG from '@/assets/images/documentInfo.svg';
import MinusCircleSVG from '@/assets/images/minusCircle.svg';
import MoneybagAltSVG from '@/assets/images/moneybagAlt.svg';
import MusicNoteSVG from '@/assets/images/musicNote.svg';
import SettingSVG from '@/assets/images/setting.svg';
import { formattedBySpaces } from '@/utils/helpers';

const NotificationCardHeader = ({ time, topic }) => {
  const printIcon = useMemo(() => {
    switch (topic) {
      case 'SystemUpdates':
        return <SettingSVG className="fill-black" />;
      case 'OfferFailed':
        return <MinusCircleSVG className="fill-black" />;
      case 'OfferAccepted':
        return <BagSVG className="fill-black" />;
      case 'NewOffer':
        return <BagSVG className="fill-black" />;
      case 'DealUpdate':
        return <DocumentInfoSVG className="fill-black" />;
      case 'CountdownReminder':
        return <CountDownReminderSVG className="fill-black" />;
      case 'CounterOffer':
        return <MoneybagAltSVG className="fill-black" />;
      case 'Announcements':
        return <MusicNoteSVG className="fill-black" />;
      default:
        return null;
    }
  }, [topic]);

  return (
    <div className="flex justify-between gap-3">
      <div className="flex items-center gap-x-1.5">
        {printIcon}
        <p className="uppercase font-semibold text-xs-sm">{formattedBySpaces({ string: topic })}</p>
      </div>
      <div>
        <p className="text-xs-sm font-normal text-gray">{time}</p>
      </div>
    </div>
  );
};

NotificationCardHeader.propTypes = NotificationCardHeaderPropTypes;

export default NotificationCardHeader;
