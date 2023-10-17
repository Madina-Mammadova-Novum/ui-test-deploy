'use client';

import { useMemo, useState } from 'react';

import PostFixtureDetailsContent from './PostFixtureDetailsContent';
import PostFixtureDocumentsContent from './PostFixtureDocumentsContent';

import { PostFixtureExpandedContentPropTypes } from '@/lib/types';

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

const PostFixtureExpandedContent = ({ detailsData, documentsData, tab, offerId }) => {
  const [currentTab, setCurrentTab] = useState(tab ?? tabs[0].value);

  const tabContent = useMemo(() => {
    switch (currentTab) {
      case 'documents':
        return <PostFixtureDocumentsContent rowsData={documentsData} offerId={offerId} />;
      default:
        return <PostFixtureDetailsContent detailsData={detailsData} />;
    }
  }, [currentTab, documentsData]);

  return (
    <div className="pt-16">
      <Tabs
        activeTab={currentTab}
        tabs={tabs}
        onClick={({ target }) => setCurrentTab(target.value)}
        customStyles="custom-container my-3 mr-[-50%] mx-auto absolute left-1/2 translate-(x/y)-1/2"
      />
      {tabContent}
    </div>
  );
};

PostFixtureExpandedContent.propTypes = PostFixtureExpandedContentPropTypes;

export default PostFixtureExpandedContent;
