'use client';

import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import CharterPartyContent from './CharterPartyContent';
import DetailsContent from './DetailsContent';
import DocumentsContent from './DocumentsContent';

import { PreFixtureExpandedContentPropTypes } from '@/lib/types';

import { updateDealData } from '@/store/entities/notifications/slice';
import { updateCountdown } from '@/store/entities/pre-fixture/slice';
import { ExtendCountdown, ModalWindow, Tabs } from '@/units';
import { transformDate } from '@/utils/date';

const tabs = [
  {
    label: 'Details',
    value: 'details',
  },
  {
    label: 'Documents',
    value: 'documents',
  },
  {
    label: 'Charter Party',
    value: 'charter-party',
  },
];

const PreFixtureExpandedContent = ({
  detailsData,
  documentsData,
  charterPartyData,
  proposedBaseCharterParty,
  offerId,
  tab = 'details',
  handleCountdownExtensionSuccess,
}) => {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState(tab ?? tabs[0]?.value);

  const { allowExtension, extensionTimeOptions, taskId, isCountdownActive } = detailsData || {};

  const handleExtensionSuccess = (extendedMinutes) => {
    // Update the local state
    dispatch(updateCountdown({ offerId, extendMinute: extendedMinutes }));

    // Update the deal data in notifications state similar to OnSubsExpandedContent
    const extendMinutesInMs = extendedMinutes * 60 * 1000;
    const currentExpiresAt = detailsData?.expiresAt;
    let newExpiresAt = null;

    if (currentExpiresAt) {
      newExpiresAt = transformDate(
        new Date(currentExpiresAt).getTime() + extendMinutesInMs,
        "yyyy-MM-dd'T'HH:mm:ss.SSS"
      );
    }

    dispatch(
      updateDealData({
        dealId: offerId,
        allowExtension: false,
        ...(newExpiresAt && { expiresAt: newExpiresAt, countdownStatus: 'Running', isCountdownActive: true }),
      })
    );

    // Call the parent callback if provided
    if (handleCountdownExtensionSuccess) {
      handleCountdownExtensionSuccess(extendedMinutes);
    }
  };

  const handleChange = ({ target }) => setCurrentTab(target.value);

  const printContent = useMemo(() => {
    if (currentTab === 'documents') {
      return <DocumentsContent rowsData={documentsData} offerId={offerId} />;
    }

    if (currentTab === 'charter-party') {
      return (
        <CharterPartyContent
          charterPartyData={charterPartyData}
          proposedBaseCharterParty={proposedBaseCharterParty}
          offerId={offerId}
          isCountdownActive={detailsData?.isCountdownActive}
        />
      );
    }

    return <DetailsContent detailsData={detailsData} />;
  }, [currentTab, detailsData, documentsData, offerId]);

  return (
    <div className="px-5">
      <div className="py-8 xlMax:h-20">
        <Tabs
          tabs={tabs}
          activeTab={currentTab}
          onClick={handleChange}
          customStyles="custom-container my-3 -mr-1/2 mx-auto absolute left-1/2 translate-(x/y)-1/2"
        />
        {extensionTimeOptions && extensionTimeOptions.length > 0 && (
          <ModalWindow
            buttonProps={{
              text: 'Request response time extension',
              variant: 'primary',
              size: 'small',
              className: 'tab-btn !text-[10px] font-bold !px-2 !h-5 uppercase leading-none',
              disabled: !allowExtension || !isCountdownActive,
            }}
          >
            <ExtendCountdown
              offerId={offerId}
              taskId={taskId}
              onExtensionSuccess={handleExtensionSuccess}
              description="In order to increase countdown time, please, send the request."
              options={extensionTimeOptions}
            />
          </ModalWindow>
        )}
      </div>
      {printContent}
    </div>
  );
};

PreFixtureExpandedContent.propTypes = PreFixtureExpandedContentPropTypes;

export default PreFixtureExpandedContent;
