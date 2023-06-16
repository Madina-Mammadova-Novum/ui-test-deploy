'use client';

import { useState } from 'react';


import ModalWrapper from '../ModalWrapper';

import { NotificationPropTypes } from '@/lib/types';

import BagSVG from '@/assets/images/bag.svg';
import BellSVG from '@/assets/images/bell.svg';
import CountDownReminderSVG from '@/assets/images/clock.svg';
import DocumentInfoSVG from '@/assets/images/documentInfo.svg';
import MinusCircleSVG from '@/assets/images/minusCircle.svg';
import MoneybagAltSVG from '@/assets/images/moneybagAlt.svg';
import MusicNoteSVG from '@/assets/images/musicNote.svg';
import SearchSVG from '@/assets/images/search.svg';
import SettingSVG from '@/assets/images/setting.svg';
import {
  Button,
  Divider,
  Dropdown,
  FieldsetHeader,
  HoverableIcon,
  Input,
  LinkAsButton,
  TextRow,
  Title,
} from '@/elements';
import { Tabs } from '@/units';

const tabs = [
  {
    label: 'Unread',
    value: 'unread',
  },
  {
    label: 'Read',
    value: 'read',
  },
];
// Mock fields
// const notifications = [
//   {
//     id: 1,
//     icon: <NewOfferSVG />,
//     title: 'New Offer',
//     time: '2:00 pm',
//     detailsLink: '/',
//     detailsText: 'See details',

//   },
//   {
//     id: 2,
//     icon: <CounterOfferSVG />,
//     title: 'counteroffer',
//     time: '5:30 pm',
//     detailsLink: '/',
//     detailsText: 'See details',
//   },
//   {
//     id: 3,
//     icon: <OfferFailedSVG />,
//     title: 'offer failed',
//     time: '5:30 pm',
//   },
//   {
//     id: 4,
//     icon: <CountDownReminderSVG />,
//     title: 'Countdown reminder',
//     time: '5:30 pm',
//   },
//   {
//     id: 5,
//     icon: <DealUpdatedSVG />,
//     title: 'deal updated',
//     time: '5:30 pm',
//   },
//   {
//     id: 6,
//     icon: <AnnouncementsSVG />,
//     title: 'Announcements',
//     time: '5:30 pm',
//   },
//   {
//     id: 7,
//     icon: <SystemUpdateSVG />,
//     title: 'System update',
//     time: '5:30 pm',
//   },
// ];



const Notification = ({ numberOfNotifications }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStore, setModalStore] = useState({
    currentTab: tabs[0].value,
  });
  const handleChangeState = (key, value) => {
    setModalStore((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };


  const options = [
    {
      label: <div className='flex justify-between  w-full'>
        <div className='flex items-center'>
          <div className='pr-1.5'>
            <BagSVG />
          </div>
          <span>New Offer</span>
        </div>
      </div>, value: 'newOffer'
    },
    {
      label: <div className='flex justify-between  w-full'>
        <div className='flex items-center'>
          <div className='pr-1.5'>
            <MoneybagAltSVG />
          </div>
          <span>Counteroffer</span>
        </div>
      </div>, value: 'counterOffer'
    },
    {
      label: <div className='flex justify-between  w-full'>
        <div className='flex items-center'>
          <div className='pr-1.5'>
            <MinusCircleSVG />
          </div>
          <span>Offer Failed</span>
        </div>
      </div>, value: 'failedOffer'
    },
    {
      label: <div className='flex justify-between  w-full'>
        <div className='flex items-center'>
          <div className='pr-1.5'>
            <BagSVG />
          </div>
          <span>Offer Accepted</span>
        </div>
      </div>, value: 'acceptedOffer'
    },
    {
      label: <div className='flex justify-between  w-full'>
        <div className='flex items-center'>
          <div className='pr-1.5'>
            <CountDownReminderSVG className="w-4 h-4 fill-black" viewBox="0 0 24 24" />
          </div>
          <span>Countdown Reminder</span>
        </div>
      </div>, value: 'countdownReminder'
    },
    {
      label: <div className='flex justify-between  w-full'>
        <div className='flex items-center'>
          <div className='pr-1.5'>
            <DocumentInfoSVG />
          </div>
          <span>Deal Updated</span>
        </div>
      </div>, value: 'dealUpdated'
    },
    {
      label: <div className='flex justify-between  w-full'>
        <div className='flex items-center'>
          <div className='pr-1.5'>
            <MusicNoteSVG />
          </div>
          <span>Announcements</span>
        </div>
      </div>, value: 'announcements'
    },
    {
      label: <div className='flex justify-between  w-full'>
        <div className='flex items-center'>
          <div className='pr-1.5'>
            <SettingSVG />
          </div>
          <span>System updated</span>
        </div>
      </div>, value: 'systemUpdated'
    },
  ];

  const handleChangeTab = ({ target }) => handleChangeState('currentTab', target.value);
  const { currentTab } = modalStore;

  return (
    <div>
      <Button
        buttonProps={{
          icon: {
            before: (
              <div>
                <HoverableIcon icon={<BellSVG />} />
                <div className="absolute border border-white border-solid -top-1 -right-2 px-0.5 h-5 min-w-[20px] rounded-base bg-blue text-xxs font-bold text-white flex items-center justify-center">
                  {numberOfNotifications}
                </div>
              </div>
            ),
          },
        }}
        type="button"
        className="relative"
        onClick={() => setIsModalOpen(!isModalOpen)}
      />
      {isModalOpen && (
        <div className="absolute top-0 right-0 z-50">
          <ModalWrapper opened={isModalOpen} onClose={() => setIsModalOpen(false)} sidebar>
            <div className="px-[30px] pt-[30px]">
              <div className="mb-[20px]">
                <FieldsetHeader title="Notifications" />
              </div>
              <div className="mb-[16px]">
                <div className="mb-[12px]">
                  <Input
                    type="text"
                    placeholder="Search through notifications"
                    icon={<SearchSVG className="fill-gray" />}
                  />
                </div>
                <div className="flex justify-between items-center ">
                  <Tabs tabs={tabs} activeTab={currentTab} onClick={handleChangeTab} />
                  <Button
                    customStyles="p-0 underline decoration-dashed"
                    buttonProps={{
                      size: 'small',
                      text: 'Mark all as read',
                      variant: 'primary',
                    }}
                  />
                </div>
              </div>
            </div>
            <Divider className="mb-[22px]" />
            <div>
              <Dropdown
                typeSelect
                placeholder="All notifications"
                onChange={() => { }}
                label="Filter By:"
                customStyles={{
                  className: 'flex gap-x-5 items-center px-[30px] justify-start',
                  dropdownWidth: 158,
                }}
                options={options}

              />
              <Title customStyle="date-styles" className="flex justify-center p-[10px]">
                Today
              </Title>
            </div>
            <div className="px-[30px] ">
              <Divider className="mb-[16px]" />
              <div className="mb-[20px]">
                <div className="flex items-center justify-between mb-[10px]">
                  <div className="flex items-center gap-x-1.5 text-[12px] ">
                    <BagSVG />
                    <Title customStyle="offer-styles">New Offer</Title>
                  </div>
                  <div>
                    <Title customStyle="date-styles">2:00 pm</Title>
                  </div>
                </div>
                <div className="flex flex-col mb-[10px]">
                  <h4 className="mb-[6px] font-semibold text-[16px]">You have a new cargo offer from Company name</h4>
                  <TextRow title=" Laycan start">Dec 18, 2021</TextRow>
                  <TextRow title="Laycan end">Dec 23, 2021</TextRow>
                </div>
                <div className="flex justify-start">
                  <LinkAsButton
                    href="/"
                    customStyles="p-0 underline decoration-underline "
                    buttonProps={{
                      size: 'small',
                      text: 'Mark all as read',
                      variant: 'primary',
                    }}
                  >
                    See details
                  </LinkAsButton>
                </div>
              </div>
              <Divider className="mt-[20px] mb-[16px]" />
              <div className="mb-[20px]">
                <div className="flex items-center justify-between mb-[10px]">
                  <div className="flex items-center gap-x-1.5 text-[12px] ">
                    <MoneybagAltSVG />
                    <Title customStyle="offer-styles">counteroffer</Title>
                  </div>
                  <div>
                    <Title customStyle="date-styles">5:30 pm</Title>
                  </div>
                </div>
                <div className="flex flex-col mb-[10px]">
                  <Title>
                    There is a counteroffer from a vessel owner for your cargo ID:{' '}
                    <span className="font-bold">9581291</span>. You have <span className="font-bold">20 minutes</span>{' '}
                    to send a response.
                  </Title>
                </div>
                <div className="flex justify-start">
                  <LinkAsButton
                    href="/"
                    customStyles="p-0 underline decoration-underline "
                    buttonProps={{
                      size: 'small',
                      text: 'Mark all as read',
                      variant: 'primary',
                    }}
                  >
                    See details
                  </LinkAsButton>
                </div>
              </div>
              <Divider className="mb-[16px]" />
              <div className="mb-[20px]">
                <div className="flex items-center justify-between mb-[10px]">
                  <div className="flex items-center gap-x-1.5 text-[12px] ">
                    <MinusCircleSVG />
                    <Title customStyle="offer-styles">offer failed</Title>
                  </div>
                  <div>
                    <Title customStyle="date-styles">5:30 pm</Title>
                  </div>
                </div>
                <div className="flex flex-col mb-[10px]">
                  <Title>
                    An offer you made for cargo ID: <span className="font-bold">9581291</span> has failed since the
                    deadline you set for vessel owner to reply has expired.
                  </Title>
                </div>
              </div>
              <Divider className="mb-[16px]" />
              <div className="mb-[20px]">
                <div className="flex items-center justify-between mb-[10px]">
                  <div className="flex items-center gap-x-1.5 text-[12px] ">
                    <CountDownReminderSVG className="w-4 h-4 fill-black" viewBox="0 0 24 24" />
                    <Title customStyle="offer-styles">Countdown reminder</Title>
                  </div>
                  <div>
                    <Title customStyle="date-styles">5:30 pm</Title>
                  </div>
                </div>
                <div className="flex flex-col mb-[10px]">
                  <Title>
                    An offer you made for cargo ID: <span className="font-bold">9581291</span> has failed since the
                    deadline you set for vessel owner to reply has expired.
                  </Title>
                </div>
              </div>
              <Divider className="mb-[16px]" />
              <div>
                <div className="flex items-center justify-between mb-[10px]">
                  <div className="flex items-center gap-x-1.5 text-[12px] ">
                    <DocumentInfoSVG />
                    <Title customStyle="offer-styles">deal updated</Title>
                  </div>

                  <div>
                    <Title customStyle="date-styles">5:30 pm</Title>
                  </div>
                </div>
                <div className="flex flex-col mb-[10px]">
                  <Title>
                    A file nas been uploaded by the vessel owner for ID: <span className="font-bold">9581291</span>{' '}
                    deal.
                  </Title>
                </div>
                <div>
                  <Divider />
                </div>
                <div>
                  <Title customStyle="date-styles" className="flex justify-center p-[10px]">
                    Yesterday
                  </Title>
                </div>
              </div>
              <Divider className="mb-[16px]" />
              <div className="mb-[20px]">
                <div className="flex items-center justify-between mb-[10px]">
                  <div className="flex items-center gap-x-1.5 text-[12px] ">
                    <MusicNoteSVG />
                    <Title customStyle="offer-styles">Announcements</Title>
                  </div>
                  <div>
                    <Title customStyle="date-styles">5:30 pm</Title>
                  </div>
                </div>
                <div className="flex flex-col mb-[10px]">
                  <Title>
                    Congratulations! Your charter party for card ID: <span className="font-bold">9581291</span> has been
                    signed and the offer is moved from <span className="font-bold">On Subs</span> to{' '}
                    <span className="font-bold">Fixture stage</span>.
                  </Title>
                </div>
              </div>
              <Divider className="mb-[16px]" />
              <div className="mb-[20px]">
                <div className="flex items-center justify-between mb-[10px]">
                  <div className="flex items-center gap-x-1.5 text-[12px] ">
                    <SettingSVG />
                    <Title customStyle="offer-styles">System update</Title>
                  </div>
                  <div>
                    <Title customStyle="date-styles">5:30 pm</Title>
                  </div>
                </div>
                <div className="flex flex-col mb-[10px]">
                  <Title>
                    An offer you made for cargo ID: <span className="font-bold">9581291</span> has failed since the
                    deadline you set for vessel owner to reply has expired.
                  </Title>
                </div>
              </div>
            </div>
          </ModalWrapper>
        </div>
      )}
    </div>
  );
};
Notification.propTypes = NotificationPropTypes;

export default Notification;
