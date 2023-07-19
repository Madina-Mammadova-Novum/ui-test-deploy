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
import { Button, Divider, Dropdown, FieldsetHeader, HoverableIcon, Input, LinkAsButton, TextRow } from '@/elements';
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

const Notification = ({ numberOfNotifications }) => {
  const [modalStore, setModalStore] = useState({
    currentTab: tabs[0].value,
    isModalOpen: false,
  });

  const { isModalOpen, currentTab } = modalStore;

  const handleChangeState = (key, value) => {
    setModalStore((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleOpen = () => handleChangeState('isModalOpen', !isModalOpen);
  const handleChangeTab = ({ target }) => handleChangeState('currentTab', target.value);

  const options = [
    {
      label: (
        <div className="flex justify-between  w-full">
          <div className="flex items-center">
            <div className="pr-1.5">
              <BagSVG />
            </div>
            <span>New Offer</span>
          </div>
        </div>
      ),
      value: 'newOffer',
    },
    {
      label: (
        <div className="flex justify-between  w-full">
          <div className="flex items-center">
            <div className="pr-1.5">
              <MoneybagAltSVG />
            </div>
            <span>Counteroffer</span>
          </div>
        </div>
      ),
      value: 'counterOffer',
    },
    {
      label: (
        <div className="flex justify-between  w-full">
          <div className="flex items-center">
            <div className="pr-1.5">
              <MinusCircleSVG />
            </div>
            <span>Offer Failed</span>
          </div>
        </div>
      ),
      value: 'failedOffer',
    },
    {
      label: (
        <div className="flex justify-between  w-full">
          <div className="flex items-center">
            <div className="pr-1.5">
              <BagSVG />
            </div>
            <span>Offer Accepted</span>
          </div>
        </div>
      ),
      value: 'acceptedOffer',
    },
    {
      label: (
        <div className="flex justify-between  w-full">
          <div className="flex items-center">
            <div className="pr-1.5">
              <CountDownReminderSVG className="w-4 h-4 fill-black" viewBox="0 0 24 24" />
            </div>
            <span>Countdown Reminder</span>
          </div>
        </div>
      ),
      value: 'countdownReminder',
    },
    {
      label: (
        <div className="flex justify-between  w-full">
          <div className="flex items-center">
            <div className="pr-1.5">
              <DocumentInfoSVG />
            </div>
            <span>Deal Updated</span>
          </div>
        </div>
      ),
      value: 'dealUpdated',
    },
    {
      label: (
        <div className="flex justify-between  w-full">
          <div className="flex items-center">
            <div className="pr-1.5">
              <MusicNoteSVG />
            </div>
            <span>Announcements</span>
          </div>
        </div>
      ),
      value: 'announcements',
    },
    {
      label: (
        <div className="flex justify-between  w-full">
          <div className="flex items-center">
            <div className="pr-1.5">
              <SettingSVG />
            </div>
            <span>System updated</span>
          </div>
        </div>
      ),
      value: 'systemUpdated',
    },
  ];

  return (
    <div>
      <Button
        buttonProps={{
          icon: {
            before: (
              <div>
                <HoverableIcon icon={<BellSVG />} />
                <div className="absolute border border-white border-solid -top-1 -right-2 px-0.5 h-5 min-w-4 rounded-base bg-blue text-xxs font-bold text-white flex items-center justify-center">
                  {numberOfNotifications}
                </div>
              </div>
            ),
          },
        }}
        type="button"
        className="relative"
        onClick={handleOpen}
      />
      {isModalOpen && (
        <div className="absolute top-0 right-0 z-50">
          <ModalWrapper
            opened={isModalOpen}
            onClose={() => handleChangeState('isModalOpen', false)}
            containerClass="absolute z-50 !max-h-screen !w-[550px] !-left-[275px] !-translate-y-0 !top-0 !rounded-none !p-0"
          >
            <div className="px-[30px] pt-[30px]">
              <div className="mb-4">
                <FieldsetHeader title="Notifications" />
              </div>
              <div className="mb-4">
                <div className="mb-3">
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
            <Divider className="mb-6" />
            <div>
              <Dropdown
                label="Filter By:"
                placeholder="All notifications"
                onChange={() => {}}
                customStyles={{
                  className: 'flex gap-x-5 items-center px-7 justify-start',
                  dropdownWidth: 158,
                }}
                options={options}
                isMulti
              />
              <p className="text-[14px] text-gray flex justify-center p-2.5">Today</p>
            </div>
            <div className="px-[30px]">
              <Divider className="mb-4" />
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-x-1.5 text-xs-sm">
                    <BagSVG />
                    <p className="uppercase font-semibold">New Offer</p>
                  </div>
                  <div>
                    <p className="text-[14px] text-gray">2:00 pm</p>
                  </div>
                </div>
                <div className="flex flex-col mb-2.5">
                  <h4 className="mb-[6px] font-semibold text-sm">You have a new cargo offer from Company name</h4>
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
              <Divider className="mt-4 mb-4" />
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-x-1.5 text-xs-sm">
                    <MoneybagAltSVG />
                    <p className="uppercase font-semibold">counteroffer</p>
                  </div>
                  <div>
                    <p className="text-[14px] text-gray">5:30 pm</p>
                  </div>
                </div>
                <div className="flex flex-col mb-2.5">
                  <p className="inline-flex flex-col text-xsm">
                    <span>
                      There is a counteroffer from a vessel owner for your cargo ID:{' '}
                      <span className="font-bold">9581291</span>.
                    </span>
                    <span>
                      You have <span className="font-bold">20 minutes</span> to send a response.
                    </span>
                  </p>
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
              <Divider className="mb-4" />
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-x-1.5 text-xs-sm ">
                    <MinusCircleSVG />
                    <p className="uppercase font-semibold text-xsm">offer failed</p>
                  </div>
                  <div>
                    <p className="text-xsm text-gray">5:30 pm</p>
                  </div>
                </div>
                <div className="flex flex-col mb-2.5">
                  <p className="text-xsm">
                    An offer you made for cargo ID: <span className="font-bold">9581291</span> has failed since the
                    deadline you set for vessel owner to reply has expired.
                  </p>
                </div>
              </div>
              <Divider className="mb-4" />
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-x-1.5 text-xs-sm">
                    <CountDownReminderSVG className="w-4 h-4 fill-black" viewBox="0 0 24 24" />
                    <p className="uppercase font-semibold text-xsm">Countdown reminder</p>
                  </div>
                  <div>
                    <p className="text-xsm text-gray">5:30 pm</p>
                  </div>
                </div>
                <div className="flex flex-col mb-2.5">
                  <p>
                    An offer you made for cargo ID: <span className="font-bold">9581291</span> has failed since the
                    deadline you set for vessel owner to reply has expired.
                  </p>
                </div>
              </div>
              <Divider className="mb-4" />
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-x-1.5 text-xs-sm">
                    <DocumentInfoSVG />
                    <p className="uppercase font-semibold text-xsm">deal updated</p>
                  </div>

                  <div>
                    <p className="text-xsm text-gray">5:30 pm</p>
                  </div>
                </div>
                <div className="flex flex-col mb-2.5">
                  <p className="text-xsm">
                    A file nas been uploaded by the vessel owner for ID: <span className="font-bold">9581291</span>{' '}
                    deal.
                  </p>
                </div>
                <div>
                  <Divider />
                </div>
                <div>
                  <p className="flex justify-center p-2.5 text-xsm text-gray">Yesterday</p>
                </div>
              </div>
              <Divider className="mb-4" />
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-x-1.5 text-xs-sm">
                    <MusicNoteSVG />
                    <p className="uppercase font-semibold text-xsm">Announcements</p>
                  </div>
                  <div>
                    <p className="text-xsm text-gray">5:30 pm</p>
                  </div>
                </div>
                <div className="flex flex-col mb-2.5">
                  <p className="text-xsm">
                    Congratulations! Your charter party for card ID: <span className="font-bold">9581291</span> has been
                    signed and the offer is moved from <span className="font-bold">On Subs</span> to{' '}
                    <span className="font-bold">Fixture stage</span>.
                  </p>
                </div>
              </div>
              <Divider className="mb-4" />
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-x-1.5 text-xs-sm">
                    <SettingSVG className="fill-black w-4 h-4" viewBox="0 0 24 24" />
                    <p className="uppercase font-semibold text-xsm">System update</p>
                  </div>
                  <div>
                    <p className="text-xsm text-gray">5:30 pm</p>
                  </div>
                </div>
                <div className="flex flex-col mb-2.5">
                  <p className="text-xsm">
                    An offer you made for cargo ID: <span className="font-bold">9581291</span> has failed since the
                    deadline you set for vessel owner to reply has expired.
                  </p>
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
