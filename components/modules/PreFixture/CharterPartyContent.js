import { useState } from 'react';

import AgreementProcessStep from './AgreementProcessStep';
import FinalReviewStep from './FinalReviewStep';
import InitialRequestStep from './InitialRequestStep';

import { charterPartyContentPropTypes } from '@/lib/types';

import FileInfoAlt from '@/assets/images/fileInfoAlt.svg';
import { Button, ExpandableCardHeader, StatusIndicator } from '@/elements';
import { ACTIONS } from '@/lib/constants';
import { ExpandableRow } from '@/modules';
import { ExpandableRowFooter } from '@/units';
import { handleViewDocument } from '@/utils/helpers';
import { errorToast } from '@/utils/hooks';

const STATUS = 'Active';

const CharterPartyContent = ({ charterPartyData = {}, offerId = null }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { baseCharterParty, riderClauses = [], additionalClauses = [], pdfUrl } = charterPartyData;

  const handleReviewClick = async () => {
    setIsLoading(true);
    try {
      await handleViewDocument(baseCharterParty?.url);
    } catch (error) {
      errorToast('View Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!baseCharterParty) {
    return <InitialRequestStep />;
  }

  const headerData = [
    { text: baseCharterParty.name, label: 'Charter Party' },
    { text: `${riderClauses.length + additionalClauses.length} clauses`, label: 'Total Clauses' },
    {
      label: 'Charter Party Status',
      text: (
        <span className="flex items-center gap-1">
          <StatusIndicator status={STATUS} />
          {STATUS}
        </span>
      ),
    },
  ];

  const actions = [
    {
      action: ACTIONS.APPROVE_CP,
      text: 'Need Help? Talk to the Broker',
      variant: 'primary',
      size: 'medium',
    },
  ];

  const content = (
    <div className="flex flex-col gap-4">
      <InitialRequestStep offerId={offerId} />
      <hr />
      <AgreementProcessStep />
      <hr />
      <FinalReviewStep
        baseCharterParty={baseCharterParty}
        status={STATUS}
        pdfUrl={pdfUrl}
        riderClauses={riderClauses}
        additionalClauses={additionalClauses}
      />
    </div>
  );

  return (
    <ExpandableRow
      className="px-5"
      header={
        <ExpandableCardHeader
          headerData={headerData}
          actions={actions}
          itemsContainerStyles="lg:grid-cols-2"
          gridStyles="1fr 1fr 1fr"
        />
      }
      footer={
        baseCharterParty ? (
          <ExpandableRowFooter>
            <div className="flex flex-col justify-center gap-x-5 gap-y-2.5 pb-2.5 lg:flex-row">
              <div className="w-full grow">
                <Button
                  buttonProps={{
                    text: isLoading ? 'Loading...' : 'Review',
                    icon: { before: <FileInfoAlt className="h-6 w-6 fill-black" /> },
                    variant: 'tertiary',
                    size: 'large',
                  }}
                  onClick={handleReviewClick}
                  disabled={!baseCharterParty?.url || isLoading}
                  customStyles="w-1/4 whitespace-nowrap 3md:grow"
                />
              </div>
            </div>
          </ExpandableRowFooter>
        ) : null
      }
    >
      {content}
    </ExpandableRow>
  );
};

CharterPartyContent.propTypes = charterPartyContentPropTypes;

export default CharterPartyContent;
