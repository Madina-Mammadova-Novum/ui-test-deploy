import { NotificationFilterPropTypes } from '@/lib/types';

import BagSVG from '@/assets/images/bag.svg';
import CountDownReminderSVG from '@/assets/images/clock.svg';
import DocumentInfoSVG from '@/assets/images/documentInfo.svg';
import MinusCircleSVG from '@/assets/images/minusCircle.svg';
import MoneybagAltSVG from '@/assets/images/moneybagAlt.svg';
import MusicNoteSVG from '@/assets/images/musicNote.svg';
import SettingSVG from '@/assets/images/setting.svg';
import { Dropdown, LabelAsOption } from '@/elements';

const NotificationFilter = ({ containerClass, onChange }) => {
  const options = [
    {
      label: <LabelAsOption icon={<BagSVG className="fill-black" />} text="New Offer" />,
      value: 'newOffer',
    },
    {
      label: <LabelAsOption icon={<MoneybagAltSVG className="fill-black" />} text="Counteroffer" />,
      value: 'counterOffer',
    },
    {
      label: <LabelAsOption icon={<MinusCircleSVG className="fill-black" />} text="Offer Failed" />,
      value: 'failedOffer',
    },
    {
      label: <LabelAsOption icon={<BagSVG className="fill-black" />} text="Offer Accepted" />,
      value: 'acceptedOffer',
    },
    {
      label: <LabelAsOption icon={<CountDownReminderSVG className="fill-black" />} text="Countdown Reminder" />,
      value: 'countdownReminder',
    },
    {
      label: <LabelAsOption icon={<DocumentInfoSVG className="fill-black" />} text="Deal Updated" />,
      value: 'dealUpdated',
    },
    {
      label: <LabelAsOption icon={<MusicNoteSVG className="fill-black" />} text="Announcements" />,
      value: 'announcements',
    },
    {
      label: <LabelAsOption icon={<SettingSVG className="fill-black" />} text="System updates" />,
      value: 'systemUpdates',
    },
  ];

  const dropdownStyles = { className: 'flex gap-x-5 items-center justify-start', dropdownWidth: 248 };

  return (
    <div className={containerClass}>
      <Dropdown
        label="Filter By:"
        placeholder="All notifications"
        options={options}
        customStyles={dropdownStyles}
        onChange={onChange}
      />
    </div>
  );
};

NotificationFilter.propTypes = NotificationFilterPropTypes;

export default NotificationFilter;
