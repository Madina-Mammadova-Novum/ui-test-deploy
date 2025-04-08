import { useCallback, useMemo, useState } from 'react';

import FixtureDetailsContent from './FixtureDetailsContent';
import FixtureDocumentsContent from './FixtureDocumentsContent';

import { FixtureExpandedContentPropTypes } from '@/lib/types';

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

const FixtureExpandedContent = ({ detailsData, documentsData, offerId }) => {
  const [currentTab, setCurrentTab] = useState(tabs[0].value);

  const handleDownload = useCallback(() => {
    const fileName = detailsData?.cargoCode ? `charter-party-${detailsData?.cargoCode}.pdf` : 'charter-party.pdf';

    downloadFile({ url: detailsData?.charterPartyUrl, fileName });
  }, [detailsData?.charterPartyUrl]);

  const printTabContent = useMemo(() => {
    switch (currentTab) {
      case 'documents':
        return <FixtureDocumentsContent rowsData={documentsData} offerId={offerId} />;
      default:
        return <FixtureDetailsContent detailsData={detailsData} />;
    }
  }, [currentTab, detailsData]);

  return (
    <div>
      <div className="py-8 xlMax:h-24">
        <Tabs
          activeTab={currentTab}
          tabs={tabs}
          onClick={({ target }) => setCurrentTab(target.value)}
          customStyles="custom-container my-3 mr-1/2 mx-auto absolute left-1/2 translate-(x/y)-1/2"
        />
        <Button
          buttonProps={{ text: 'Charter party (generate pdf)', variant: 'tertiary', size: 'medium' }}
          customStyles="tab-btn"
          onClick={handleDownload}
          disabled={!detailsData?.charterPartyUrl}
        />
      </div>

      {printTabContent}
    </div>
  );
};

FixtureExpandedContent.propTypes = FixtureExpandedContentPropTypes;

export default FixtureExpandedContent;
