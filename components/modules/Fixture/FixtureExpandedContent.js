import { useMemo, useState } from 'react';

import FixtureDetailsContent from './FixtureDetailsContent';
import FixtureDocumentsContent from './FixtureDocumentsContent';

import { FixtureExpandedContentPropTypes } from '@/lib/types';

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

const FixtureExpandedContent = ({ rowsData }) => {
  const [currentTab, setCurrentTab] = useState(tabs[0].value);

  const tabContent = useMemo(() => {
    switch (currentTab) {
      case 'documents':
        return <FixtureDocumentsContent rowsData={rowsData} />;
      default:
        return <FixtureDetailsContent />;
    }
  }, [currentTab, rowsData]);

  return (
    <div className="pt-16">
      <Tabs
        activeTab={currentTab}
        tabs={tabs}
        onClick={({ target }) => setCurrentTab(target.value)}
        customStyles="custom-container my-3 mr-1/2 mx-auto absolute left-1/2 translate-(x/y)-1/2"
      />
      {tabContent}
    </div>
  );
};

FixtureExpandedContent.propTypes = FixtureExpandedContentPropTypes;

export default FixtureExpandedContent;
