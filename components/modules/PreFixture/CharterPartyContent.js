import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import AgreementProcessStep from './AgreementProcessStep';
import FinalReviewStep from './FinalReviewStep';
import InitialRequestStep from './InitialRequestStep';

import { charterPartyContentPropTypes } from '@/lib/types';

import FileInfoAlt from '@/assets/images/fileInfoAlt.svg';
import { Button, ExpandableCardHeader, StatusIndicator } from '@/elements';
import { ACTIONS } from '@/lib/constants';
import { ExpandableRow } from '@/modules';
import { removeCollapsedChat, resetUser, setConversation, setOpenedChat, setUser } from '@/store/entities/chat/slice';
import { getAuthChatSelector } from '@/store/selectors';
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

const CharterPartyContent = ({ charterPartyData = null, offerId = null, proposedBaseCharterParty = null }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { chats, isActive } = useSelector(getAuthChatSelector);

  const { baseCharterParty = null, riderClauses = [], additionalClauses = [], pdfUrl = null } = charterPartyData || {};

  const handleReviewClick = async () => {
    if (!baseCharterParty?.url) return;

    setIsLoading(true);
    try {
      await handleViewDocument(baseCharterParty.url);
    } catch (error) {
      errorToast('View Error', error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatWithBroker = () => {
    // First, try to find a chat with matching dealId in active chats
    const dealChat = chats?.active?.find((chat) => chat.dealId === offerId);

    // If we found a matching deal chat, use it
    if (dealChat) {
      // If the chat is already active, don't do anything
      if (isActive && chats?.user?.data?.chatId === dealChat.chatId) return;

      // Remove any existing chat and activate the deal chat
      dispatch(resetUser());
      dispatch(removeCollapsedChat(dealChat.chatId));
      dispatch(setUser(dealChat));
      dispatch(setOpenedChat(true));
      dispatch(setConversation(true));
      return;
    }

    // If no matching deal chat found, fall back to support chat
    if (chats?.support?.length > 0) {
      const supportChat = chats.support[0];

      // If the chat is already active, don't do anything
      if (isActive && chats?.user?.data?.chatId === supportChat.chatId) return;

      // Remove any existing chat and activate the support chat
      dispatch(resetUser());
      dispatch(removeCollapsedChat(supportChat.chatId));
      dispatch(setUser(supportChat));
      dispatch(setOpenedChat(true));
      dispatch(setConversation(true));
    }
  };

  const charterPartyStatus = getCharterPartyStatus({
    charterPartyOptions: baseCharterParty,
    proposedBaseCharterParty,
  });

  const getStatusDisplayText = (status, step) => {
    switch (step) {
      case 'final-review':
        return 'Broker Finalized Charter Party';

      case 'agreement-process':
        if (status === 'Accepted') {
          return 'Awaiting Broker Finalization';
        }
        return 'Proposed Charter Party - Pending Review';

      case 'initial-request':
        return 'Awaiting Charter Party Request';

      default:
        // Fallback to status-based description if step logic doesn't apply
        switch (status) {
          case 'Proposed':
            return 'Proposed Charter Party - Pending Review';
          case 'Accepted':
            return 'Awaiting Broker Finalization';
          case 'Final':
            return 'Broker Finalized Charter Party';
          case 'Initial':
            return 'Awaiting Charter Party Request';
          default:
            return status;
        }
    }
  };

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
            proposedBaseCharterParty={{
              ...proposedBaseCharterParty,
              dealId: offerId,
            }}
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
          <StatusIndicator status={getStatusDisplayText(charterPartyStatus.status, charterPartyStatus.step)} />
          {getStatusDisplayText(charterPartyStatus.status, charterPartyStatus.step)}
        </span>
      ),
    },
  ];

  const actions = [
    {
      action: ACTIONS.CHAT_FOR_CP,
      text: 'Need Help? Talk to the Broker',
      variant: 'primary',
      size: 'medium',
      onClick: handleChatWithBroker,
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
          gridStyles="1fr 1fr 3fr"
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
                  disabled={!pdfUrl || isLoading}
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
