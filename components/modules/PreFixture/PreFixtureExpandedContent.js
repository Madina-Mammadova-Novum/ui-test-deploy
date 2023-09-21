import React, { useState } from 'react';

import { useSession } from 'next-auth/react';

import DetailsContent from './DetailsContent';
import DocumentsContent from './DocumentsContent';

import { PreFixtureExpandedContentPropTypes } from '@/lib/types';

import { Button } from '@/elements';
import { extendCountdown } from '@/services/offer';
import { Tabs } from '@/units';
import { parseErrors } from '@/utils/helpers';
import { errorToast, successToast } from '@/utils/hooks';

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

const PreFixtureExpandedContent = ({ detailsData, documentsData, offerId }) => {
  const [currentTab, setCurrentTab] = useState(tabs[0].value);
  const allowCountdownExtension = detailsData?.additionalCharterPartyTerms?.length;
  const { data: session } = useSession();

  const handleExtendCountdown = async () => {
    const { error, message: successMessage } = await extendCountdown({ offerId, role: session?.role });
    if (error) {
      errorToast(parseErrors(error.message));
    } else {
      successToast(successMessage);
    }
  };

  const tabContent = () => {
    switch (currentTab) {
      case 'documents':
        return <DocumentsContent rowsData={documentsData} />;
      default:
        return <DetailsContent data={detailsData} />;
    }
  };

  return (
    <div>
      <div className="">
        <div className="py-8 xlMax:h-20">
          <Tabs
            activeTab={currentTab}
            tabs={tabs}
            onClick={({ target }) => setCurrentTab(target.value)}
            customStyles="custom-container my-3 mr-[-50%] mx-auto absolute left-1/2 translate-(x/y)-1/2"
          />
          <Button
            buttonProps={{ text: 'Extend the response time by 15min', variant: 'primary', size: 'small' }}
            customStyles="
              border border-blue 
              hover:border-blue-darker 
              whitespace-nowrap
              !px-2.5 !py-0.5 uppercase !text-[10px] 
              font-bold 
              absolute 
              right-1
              -translate-x-5 
              xlMax:w-fit
              xlMax:top-14
              xlMax:left-[50%] 
              xlMax:transform
              xlMax:-translate-x-1/2
            "
            disabled={!allowCountdownExtension}
            onClick={handleExtendCountdown}
          />
        </div>
      </div>
      {tabContent()}
    </div>
  );
};

PreFixtureExpandedContent.propTypes = PreFixtureExpandedContentPropTypes;

export default PreFixtureExpandedContent;
