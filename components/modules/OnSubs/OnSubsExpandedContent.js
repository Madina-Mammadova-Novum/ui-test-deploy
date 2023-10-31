'use client';

import { useMemo, useState } from 'react';

import { useSession } from 'next-auth/react';

import DetailsContent from './DetailsContent';
import DocumentsContent from './DocumentsContent';
import ExtendOnSubsCountdown from './ExtendOnSubsCountdown';

import { OnSubsExpandedContentPropTypes } from '@/lib/types';

import { ModalWindow, Tabs } from '@/units';
import { getRoleIdentity } from '@/utils/helpers';

const tabs = [
  {
    label: 'Details',
    value: 'details',
  },
  {
    label: 'Documents',
    value: 'documents',
  },
];

const OnSubsExpandedContent = ({ detailsData = {}, documentsData = [], offerId, tab = 'details' }) => {
  const [currentTab, setCurrentTab] = useState(tab ?? tabs[0].value);
  const [allowCountdownExtension, setAllowCountdownExtension] = useState(detailsData?.allowExtension);

  const { data: session } = useSession();
  const { isCharterer } = getRoleIdentity({ role: session?.role });

  const printContent = useMemo(() => {
    if (currentTab === 'documents') {
      return <DocumentsContent rowsData={documentsData} offerId={offerId} />;
    }

    return <DetailsContent detailsData={detailsData} />;
  }, [currentTab, detailsData, documentsData, offerId]);

  return (
    <div>
      <div className={`py-8 ${isCharterer && 'xlMax:h-20'}`}>
        <Tabs
          activeTab={currentTab}
          tabs={tabs}
          onClick={({ target }) => setCurrentTab(target.value)}
          customStyles="custom-container my-3 mr-[-50%] mx-auto absolute left-1/2 translate-(x/y)-1/2"
        />
        {isCharterer && (
          <ModalWindow
            buttonProps={{
              text: 'Request response time extension',
              variant: 'primary',
              size: 'small',
              disabled: !allowCountdownExtension,
              className:
                'border border-blue hover:border-blue-darker whitespace-nowrap !px-2.5 !py-0.5 uppercase !text-[10px] font-bold absolute right-1 -translate-x-5 xlMax:w-fit xlMax:top-14 xlMax:left-[50%] xlMax:transform xlMax:-translate-x-1/2',
            }}
          >
            <ExtendOnSubsCountdown offerId={offerId} onExtensionSuccess={() => setAllowCountdownExtension(false)} />
          </ModalWindow>
        )}
      </div>
      {printContent}
    </div>
  );
};

OnSubsExpandedContent.propTypes = OnSubsExpandedContentPropTypes;

export default OnSubsExpandedContent;
