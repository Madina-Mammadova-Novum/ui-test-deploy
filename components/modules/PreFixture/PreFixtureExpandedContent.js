import React, { useState } from 'react';

import DetailsContent from './DetailsContent';
import DocumentsContent from './DocumentsContent';

import { PreFixtureExpandedContentPropTypes } from '@/lib/types';

import { Button } from '@/elements';
import { Tabs } from '@/units';

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

const PreFixtureExpandedContent = ({ underNegotiation, detailsData, documentsData }) => {
  const [currentTab, setCurrentTab] = useState(tabs[0].value);

  const tabContent = () => {
    switch (currentTab) {
      case 'documents':
        return <DocumentsContent rowsData={documentsData} />;
      default:
        return <DetailsContent underNegotiation={underNegotiation} data={detailsData} />;
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
          />
        </div>
      </div>
      {tabContent()}
    </div>
  );
};

PreFixtureExpandedContent.propTypes = PreFixtureExpandedContentPropTypes;

export default PreFixtureExpandedContent;
