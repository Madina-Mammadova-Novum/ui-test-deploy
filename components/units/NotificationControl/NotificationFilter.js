import { NotificationFilterPropTypes } from '@/lib/types';

import BagSVG from '@/assets/images/bag.svg';
import CountDownReminderSVG from '@/assets/images/clock.svg';
import DocumentInfoSVG from '@/assets/images/documentInfo.svg';
import MinusCircleSVG from '@/assets/images/minusCircle.svg';
import MoneybagAltSVG from '@/assets/images/moneybagAlt.svg';
import MusicNoteSVG from '@/assets/images/musicNote.svg';
import SettingSVG from '@/assets/images/setting.svg';
import { Dropdown, LabelAsOption } from '@/elements';
import { NOTIFICATION_FILTERS } from '@/lib/constants';

const NotificationFilter = ({ containerClass, value, onChange, ...rest }) => {
  const options = [
    {
      label: <LabelAsOption icon={<BagSVG className="fill-black" />} text="New Offer" />,
      value: NOTIFICATION_FILTERS.newOffer,
    },
    {
      label: <LabelAsOption icon={<MoneybagAltSVG className="fill-black" />} text="Counteroffer" />,
      value: NOTIFICATION_FILTERS.counterOffer,
    },
    {
      label: <LabelAsOption icon={<MinusCircleSVG className="fill-black" />} text="Offer Failed" />,
      value: NOTIFICATION_FILTERS.offerFailed,
    },
    {
      label: <LabelAsOption icon={<BagSVG className="fill-black" />} text="Offer Accepted" />,
      value: NOTIFICATION_FILTERS.offerAccepted,
    },
    {
      label: <LabelAsOption icon={<CountDownReminderSVG className="fill-black" />} text="Countdown Reminder" />,
      value: NOTIFICATION_FILTERS.reminders,
    },
    {
      label: <LabelAsOption icon={<DocumentInfoSVG className="fill-black" />} text="Deal Updated" />,
      value: NOTIFICATION_FILTERS.dealUpd,
    },
    {
      label: <LabelAsOption icon={<MusicNoteSVG className="fill-black" />} text="Announcements" />,
      value: NOTIFICATION_FILTERS.announcements,
    },
    {
      label: <LabelAsOption icon={<SettingSVG className="fill-black" />} text="System updates" />,
      value: NOTIFICATION_FILTERS.systemUpd,
    },
  ];

  const dropdownStyles = { className: 'flex gap-x-5 items-center justify-start', dropdownWidth: 248 };

  return (
    <div className={containerClass}>
      <Dropdown
        isMulti
        label="Filter By:"
        placeholder="All notifications"
        defaultValue={value}
        options={options}
        customStyles={dropdownStyles}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};

NotificationFilter.propTypes = NotificationFilterPropTypes;

export default NotificationFilter;
