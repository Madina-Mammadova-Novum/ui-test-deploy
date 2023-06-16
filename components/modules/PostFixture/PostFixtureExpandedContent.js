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

const PostFixtureExpandedContent = ({ rowsData }) => {
  const [currentTab, setCurrentTab] = useState(tabs[0].value);

  const tabContent = useMemo(() => {
    switch (currentTab) {
      case 'documents':
        return <PostFixtureDocumentsContent rowsData={rowsData} />;
      default:
        return <PostFixtureDetailsContent />;
    }
  }, [currentTab]);

  return (
    <div className='pt-16'>
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
