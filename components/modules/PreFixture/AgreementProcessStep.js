import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import FileInfoAlt from '@/assets/images/fileInfoAlt.svg';
import { Button, FieldsetContent, FieldsetWrapper, StatusIndicator, TextRow, Title } from '@/elements';
import { PAGE_STATE } from '@/lib/constants';
import { acceptBaseCharterParty } from '@/services/charterParty';
import { getCurrentDealStage } from '@/store/entities/notifications/actions';
import { fetchPrefixtureOffers } from '@/store/entities/pre-fixture/actions';
import { getPreFixtureDataSelector } from '@/store/selectors';
import { ConfirmModal, ModalWindow, Notes } from '@/units';
import RequestCharterPartyForm from '@/units/RequestCharterPartyForm';
import { getCookieFromBrowser, handleViewDocument } from '@/utils/helpers';
import { errorToast, successToast } from '@/utils/hooks';

/**
 * @component AgreementProcessStep
 * @description Handles the charter party agreement process with role-based actions
 * @props {Object} proposedBaseCharterParty - Charter party proposal details
 * @maritime Manages charter party template proposals between Owner and Charterer
 */
const AgreementProcessStep = ({ proposedBaseCharterParty }) => {
  const dispatch = useDispatch();

  const { isDetails } = useSelector(getPreFixtureDataSelector);

  // State
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // Extract common properties
  const { proposedBy, status, charterPartyTemplate, dealId, id: proposalId } = proposedBaseCharterParty || {};
  const { page, pageSize } = PAGE_STATE;

  const templateName = charterPartyTemplate?.name;
  const templateUrl = charterPartyTemplate?.url;
  const templateId = charterPartyTemplate?.id;

  // Derived state
  const isOwnerProposed = proposedBy === 'Owner';
  const isChartererProposed = proposedBy === 'Charterer';
  const isProposed = status === 'Proposed';
  const isAccepted = status === 'Accepted';
  const isUserProposer = (userRole === 'owner' && isOwnerProposed) || (userRole === 'charterer' && isChartererProposed);
  const counterRole = userRole === 'owner' ? 'Charterer' : 'Owner';
  const proposerRole = isOwnerProposed ? 'Owner' : 'Charterer';

  // Effects
  useEffect(() => {
    const role = getCookieFromBrowser('session-user-role');
    setUserRole(role);
  }, []);

  // Handlers
  /**
   * @function viewDocument
   * @description Handles the viewing of charter party template documents
   * @maritime Opens the charter party document in a new tab for review
   * @returns {Promise<void>} A promise that resolves when the document is opened or an error occurs
   */
  const viewDocument = async () => {
    if (!templateUrl) {
      const errorMessage = 'Document URL is not available';

      errorToast('View Error', errorMessage);
      return;
    }

    setIsLoading(true);

    try {
      await handleViewDocument(templateUrl);
    } catch (error) {
      console.error('Document view error:', error);
      const errorMessage = error.message || 'Failed to load document';

      errorToast('View Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const openConfirmModal = () => setIsConfirmModalOpen(true);
  const closeConfirmModal = () => setIsConfirmModalOpen(false);

  const handleAccept = async () => {
    if (!dealId || !proposalId) {
      errorToast('Error', 'Missing required information to accept the proposal');
      return;
    }

    setIsLoading(true);

    try {
      const response = await acceptBaseCharterParty({
        dealId,
        proposalId,
      });

      if (response.error) {
        errorToast('Error', response.message || 'Failed to accept charter party');
      } else {
        if (isDetails) {
          dispatch(getCurrentDealStage({ id: dealId, role: userRole }));
        } else {
          // Refresh the prefixture data with default pagination
          dispatch(fetchPrefixtureOffers({ page, perPage: pageSize }));
        }

        // Show success message
        successToast('Success', 'Charter party accepted successfully');
      }
    } catch (error) {
      errorToast('Error', 'An error occurred while accepting the charter party');
      console.error('Accept charter party error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCounterproposalSubmit = () => {
    // Refresh the prefixture data with default pagination
    dispatch(fetchPrefixtureOffers({ page, perPage: pageSize }));

    successToast('Success', 'Counter proposal submitted successfully');
  };

  // UI Helper Functions
  const getStatusText = () => {
    if (isAccepted) {
      return 'Accepted by both parties';
    }

    if (isOwnerProposed) {
      return 'Pending Charterer Review';
    }
    if (isChartererProposed) {
      return 'Pending Owner Review';
    }
    return 'Pending Review';
  };

  const renderInfoContent = () => {
    if (isAccepted) {
      if (isUserProposer) {
        return `The ${counterRole.toLowerCase()} has accepted your proposed base charter party. Please wait for the broker to finalize the details.`;
      }
      return `You have accepted the ${proposerRole.toLowerCase()}'s proposed base charter party. Please wait for the broker to finalize the details.`;
    }

    if (isProposed) {
      if (isUserProposer) {
        return `You have proposed the ${templateName} base charter party and are waiting for the ${counterRole.toLowerCase()}'s review.`;
      }
      return `The ${proposerRole.toLowerCase()} has proposed the ${templateName} base charter party. You can view, accept, or propose a different charter party.`;
    }

    return 'Base charter party proposing continues on both sides. The broker will check your preferences and upload the charter party and clauses soon.';
  };

  // Common button component
  const ViewDocumentButton = (
    <Button
      key="view"
      buttonProps={{
        text: isLoading ? 'Loading...' : 'View Document',
        icon: { before: <FileInfoAlt className="h-6 w-6 fill-black" /> },
        variant: 'tertiary',
        size: 'large',
      }}
      onClick={viewDocument}
      disabled={!templateUrl || isLoading}
      customStyles="whitespace-nowrap"
    />
  );

  const renderActionButtons = () => {
    // For Accepted status, only show View Document button
    if (isAccepted) {
      return [ViewDocumentButton];
    }

    // For Proposed status
    if (isProposed) {
      // If user is the proposer, only show View Document
      if (isUserProposer) {
        return [ViewDocumentButton];
      }

      // If user is not the proposer, show all three buttons
      return [
        ViewDocumentButton,
        <Button
          key="approve"
          buttonProps={{
            text: 'Approve & Proceed',
            variant: 'primary',
            size: 'large',
            loading: isLoading,
          }}
          onClick={openConfirmModal}
          disabled={isLoading}
          customStyles="whitespace-nowrap"
        />,
        <ModalWindow
          key="change"
          buttonProps={{
            text: 'Propose Different Charter Party',
            variant: 'secondary',
            size: 'large',
            disabled: isLoading,
          }}
        >
          <RequestCharterPartyForm
            offerId={dealId}
            proposalId={proposalId}
            isCounterproposal
            onSuccess={handleCounterproposalSubmit}
            templateId={templateId}
          />
        </ModalWindow>,
      ];
    }

    // Default buttons
    return [ViewDocumentButton];
  };

  return (
    <div className="mb-5 flex flex-col gap-y-5 pt-5">
      <Notes title="Please note!">
        <p className="text-xsm text-black">{renderInfoContent()}</p>
      </Notes>

      <FieldsetWrapper>
        <Title level="3">{isUserProposer ? 'Your Charter Party Request' : 'Review Charter Party Request'}</Title>
        <FieldsetContent className="mt-2.5">
          <div className="flex flex-col gap-4">
            <div className="rounded-lg bg-[#E7ECF8] p-4">
              <TextRow title="Base Charter Party" inlineVariant>
                {templateName}
              </TextRow>
              <TextRow title="Status" inlineVariant className="flex items-center">
                <span className="flex items-center gap-1">
                  <StatusIndicator status={status} />
                  {getStatusText()}
                </span>
              </TextRow>
            </div>

            <div className="flex flex-wrap items-center gap-4">{renderActionButtons()}</div>
          </div>
        </FieldsetContent>
      </FieldsetWrapper>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onConfirm={handleAccept}
        onClose={closeConfirmModal}
        title="Confirm Charter Party Acceptance"
        message={`Are you sure you want to accept the ${templateName} charter party proposed by the ${proposerRole.toLowerCase()}?`}
        okButtonProps={{
          text: 'Accept',
          loading: isLoading,
        }}
      />
    </div>
  );
};

AgreementProcessStep.propTypes = {
  proposedBaseCharterParty: PropTypes.shape({
    id: PropTypes.string,
    dealId: PropTypes.string,
    charterPartyTemplate: PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    }),
    proposedBy: PropTypes.oneOf(['Owner', 'Charterer']),
    status: PropTypes.oneOf(['Proposed', 'Accepted']),
  }),
};

export default AgreementProcessStep;
