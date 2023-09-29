import { useMemo, useState } from 'react';

import DetailsContent from './DetailsContent';
import DocumentsContent from './DocumentsContent';

import { OnSubsExpandedContentPropTypes } from '@/lib/types';

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

const OnSubsExpandedContent = ({ detailsData }) => {
  const [currentTab, setCurrentTab] = useState(tabs[0].value);

  const tabContent = useMemo(() => {
    switch (currentTab) {
      case 'documents':
        return <DocumentsContent />;
      default:
        return <DetailsContent detailsData={detailsData} />;
    }
  }, [currentTab]);

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

OnSubsExpandedContent.propTypes = OnSubsExpandedContentPropTypes;

export default OnSubsExpandedContent;
