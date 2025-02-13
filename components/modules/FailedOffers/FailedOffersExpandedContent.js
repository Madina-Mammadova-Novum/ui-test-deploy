'use client';

import { useMemo, useState } from 'react';

import { FailedOffersExpandedContentPropTypes } from '@/lib/types';

import { Button, TextWithLabel } from '@/elements';
import { FailedOffersDetailsContent, FailedOffersDocumentsContent } from '@/modules';
import { Tabs } from '@/units';
import { downloadFile } from '@/utils/helpers';

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

const FailedOffersExpandedContent = ({ detailsData, documentsData, tab, offerId }) => {
  const [currentTab, setCurrentTab] = useState(tab ?? tabs[0].value);

  const { failureReason } = detailsData;

  const tabContent = useMemo(() => {
    switch (currentTab) {
      case 'documents':
        return <FailedOffersDocumentsContent rowsData={documentsData} offerId={offerId} />;
      default:
        return <FailedOffersDetailsContent detailsData={detailsData} />;
    }
  }, [currentTab, documentsData]);

  return (
    <>
      <div className="py-8 xlMax:h-24">
        <Tabs
          activeTab={currentTab}
          tabs={tabs}
          onClick={({ target }) => setCurrentTab(target.value)}
          customStyles="custom-container my-3 mr-[-50%] mx-auto absolute left-1/2 translate-(x/y)-1/2"
        />
        {failureReason && (
          <TextWithLabel
            label="Failure Reason"
            text={failureReason}
            textGroupStyle="!mx-0"
            customStyles="!lg:items-end !items-end flex-col"
          />
        )}
        <Button
          buttonProps={{ text: 'Charter party (generate pdf)', variant: 'tertiary', size: 'medium' }}
          customStyles="
            border border-blue 
            hover:border-blue-darker 
            whitespace-nowrap
            !px-2.5 !py-0.5 !text-[10px] 
            font-medium
            !text-xsm 
            absolute 
            left-1
            translate-x-5 
            xlMax:w-fit
            xlMax:top-14
            xlMax:left-[50%] 
            xlMax:transform
            xlMax:-translate-x-1/2
          "
          onClick={() => downloadFile({ url: detailsData?.charterPartyUrl, fileName: detailsData?.charterPartyUrl })}
          disabled={!detailsData?.charterPartyUrl}
        />
      </div>
      {tabContent}
    </>
  );
};

FailedOffersExpandedContent.propTypes = FailedOffersExpandedContentPropTypes;

export default FailedOffersExpandedContent;
