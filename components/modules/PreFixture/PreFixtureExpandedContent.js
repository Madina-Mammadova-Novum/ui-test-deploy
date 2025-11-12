'use client';

import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import { UilClock, UilEye } from '@iconscout/react-unicons';

import CharterPartyContent from './CharterPartyContent';
import DetailsContent from './DetailsContent';
import DocumentsContent from './DocumentsContent';

import { PreFixtureExpandedContentPropTypes } from '@/lib/types';

import { IconButtonWithTooltip } from '@/elements';
import { PAGE_STATE } from '@/lib/constants';
import { updateDealData } from '@/store/entities/notifications/slice';
import { fetchPrefixtureOffers } from '@/store/entities/pre-fixture/actions';
import { updateCountdown } from '@/store/entities/pre-fixture/slice';
import { AdminChangeRequestsModal, ExtendCountdown, ModalWindow, Tabs } from '@/units';
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

  // Refetch pre-fixture offers after successful approve/reject
  const handleRefetchOffers = () => {
    const { page, pageSize } = PAGE_STATE;
    dispatch(fetchPrefixtureOffers({ page, perPage: pageSize }));
  };

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

  const hasChangeRequests = detailsData?.requests && detailsData.requests.length > 0;

  return (
    <div className="px-5">
      <div className="relative py-[3.75rem] 2md:py-8">
        <Tabs
          tabs={tabs}
          activeTab={currentTab}
          onClick={handleChange}
          customStyles="custom-container my-3 -mr-1/2 mx-auto absolute left-1/2 translate-(x/y)-1/2"
        />
        <div className="absolute left-1/2 top-14 flex -translate-x-1/2 items-center gap-2 2md:left-auto 2md:right-0 2md:top-3 2md:translate-x-0">
          {extensionTimeOptions && extensionTimeOptions.length > 0 && (
            <ModalWindow
              buttonComponent={
                <IconButtonWithTooltip
                  icon={<UilClock size="18" className="fill-blue" />}
                  tooltipText="Request response time extension"
                  disabled={!allowExtension || !isCountdownActive}
                />
              }
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
          {hasChangeRequests && (
            <ModalWindow
              buttonComponent={
                <IconButtonWithTooltip
                  icon={<UilEye size="18" className="fill-blue" />}
                  tooltipText="Review deal information changes"
                />
              }
            >
              <AdminChangeRequestsModal
                requests={detailsData.requests}
                cargoId={detailsData.cargoCode || 'CARGO-###'}
                onSuccess={handleRefetchOffers}
              />
            </ModalWindow>
          )}
        </div>
      </div>
      {printContent}
    </div>
  );
};

PreFixtureExpandedContent.propTypes = PreFixtureExpandedContentPropTypes;

export default PreFixtureExpandedContent;
