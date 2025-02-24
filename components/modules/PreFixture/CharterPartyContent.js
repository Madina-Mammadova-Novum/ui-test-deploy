import { useState } from 'react';

import PropTypes from 'prop-types';

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

const getCharterPartyStatus = ({ charterPartyOptions, proposedBaseCharterParty }) => {
  if (charterPartyOptions) {
    return {
      status: 'Final',
      step: 'final-review',
    };
  }

  if (proposedBaseCharterParty) {
    return {
      status: proposedBaseCharterParty.status,
      step: 'agreement-process',
      proposedBy: proposedBaseCharterParty.proposedBy,
    };
  }

  return {
    status: 'Initial',
    step: 'initial-request',
  };
};

const CharterPartyContent = ({
  charterPartyData = null,
  offerId = null,
  proposedBaseCharterParty = {
    id: '0d83ee52-56fe-427d-18fb-08dd51a2088d',
    charterPartyTemplate: null,
    proposedBy: 'Owner',
    status: 'Proposed',
  },
}) => {
  const [isLoading, setIsLoading] = useState(false);

  // Safe destructuring with default values
  const { baseCharterParty = null, riderClauses = [], additionalClauses = [], pdfUrl = null } = charterPartyData || {};

  const handleReviewClick = async () => {
    if (!baseCharterParty?.url) return;

    setIsLoading(true);
    try {
      await handleViewDocument(baseCharterParty.url);
    } catch (error) {
      errorToast('View Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const charterPartyStatus = getCharterPartyStatus({
    charterPartyOptions: charterPartyData?.charterPartyOptions,
    proposedBaseCharterParty,
  });

  const renderContent = () => {
    switch (charterPartyStatus.step) {
      case 'final-review':
        return (
          <FinalReviewStep
            baseCharterParty={baseCharterParty}
            status={charterPartyStatus.status}
            pdfUrl={pdfUrl}
            riderClauses={riderClauses}
            additionalClauses={additionalClauses}
          />
        );
      case 'agreement-process':
        return (
          <AgreementProcessStep
            proposedBaseCharterParty={proposedBaseCharterParty}
            charterPartyData={charterPartyData}
          />
        );
      case 'initial-request':
      default:
        return <InitialRequestStep offerId={offerId} />;
    }
  };

  const headerData = [
    {
      text: baseCharterParty?.name || proposedBaseCharterParty?.charterPartyTemplate?.name || 'N/A',
      label: 'Charter Party',
    },
    {
      text: `${(riderClauses?.length || 0) + (additionalClauses?.length || 0)} clauses`,
      label: 'Total Clauses',
    },
    {
      label: 'Charter Party Status',
      text: (
        <span className="flex items-center gap-1">
          <StatusIndicator status={charterPartyStatus.status} />
          {charterPartyStatus.status}
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
      <div className="flex flex-col gap-4">{renderContent()}</div>
    </ExpandableRow>
  );
};

CharterPartyContent.propTypes = {
  ...charterPartyContentPropTypes,
  proposedBaseCharterParty: PropTypes.shape({
    id: PropTypes.string,
    charterPartyTemplate: PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    }),
    proposedBy: PropTypes.string,
    status: PropTypes.string,
  }),
};

export default CharterPartyContent;
