'use client';

import { useMemo, useState } from 'react';

import PostFixtureDetailsContent from './PostFixtureDetailsContent';
import PostFixtureDocumentsContent from './PostFixtureDocumentsContent';

import { PostFixtureExpandedContentPropTypes } from '@/lib/types';

import { Button } from '@/elements';
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

const PostFixtureExpandedContent = ({ detailsData, documentsData, offerId }) => {
  const [currentTab, setCurrentTab] = useState(tabs[0].value);

  const tabContent = useMemo(() => {
    switch (currentTab) {
      case 'documents':
        return <PostFixtureDocumentsContent rowsData={documentsData} offerId={offerId} />;
      default:
        return <PostFixtureDetailsContent detailsData={detailsData} />;
    }
  }, [currentTab, documentsData]);

  return (
    <div>
      <div className="py-8 xlMax:h-24">
        <Tabs
          activeTab={currentTab}
          tabs={tabs}
          onClick={({ target }) => setCurrentTab(target.value)}
          customStyles="custom-container my-3 mr-[-50%] mx-auto absolute left-1/2 translate-(x/y)-1/2"
        />
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
        />
      </div>
      {tabContent}
    </div>
  );
};

PostFixtureExpandedContent.propTypes = PostFixtureExpandedContentPropTypes;

export default PostFixtureExpandedContent;
