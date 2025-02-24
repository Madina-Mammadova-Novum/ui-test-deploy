import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import FileInfoAlt from '@/assets/images/fileInfoAlt.svg';
import { Button, FieldsetContent, FieldsetWrapper, StatusIndicator, TextRow, Title } from '@/elements';
import { ModalWindow, Notes } from '@/units';
import RequestCharterPartyForm from '@/units/RequestCharterPartyForm';
import { getCookieFromBrowser } from '@/utils/helpers';

const AgreementProcessStep = ({ proposedBaseCharterParty }) => {
  const [userRole, setUserRole] = useState(null);
  const isOwnerProposed = proposedBaseCharterParty?.proposedBy === 'Owner';
  const isChartererProposed = proposedBaseCharterParty?.proposedBy === 'Charterer';
  const templateName = proposedBaseCharterParty?.charterPartyTemplate?.name;
  const templateUrl = proposedBaseCharterParty?.charterPartyTemplate?.url;

  useEffect(() => {
    const role = getCookieFromBrowser('session-user-role');
    setUserRole(role);
  }, []);

  const getStatusText = () => {
    if (isOwnerProposed) {
      return 'Pending Charterer Review';
    }
    if (isChartererProposed) {
      return 'Pending Owner Review';
    }
    return 'Pending Review';
  };

  const handleViewDocument = async () => {
    if (templateUrl) {
      window.open(templateUrl, '_blank');
    }
  };

  const renderActionButtons = () => {
    const isUserProposer =
      (userRole === 'Owner' && isOwnerProposed) || (userRole === 'Charterer' && isChartererProposed);

    const commonButtons = [
      <Button
        key="view"
        buttonProps={{
          text: 'View Document',
          icon: { before: <FileInfoAlt className="h-6 w-6 fill-black" /> },
          variant: 'tertiary',
          size: 'large',
        }}
        onClick={handleViewDocument}
        disabled={!templateUrl}
        customStyles="whitespace-nowrap"
      />,
      <ModalWindow
        key="change"
        buttonProps={{
          text: isUserProposer ? 'Change Base Charter Party' : 'Propose a Different CP',
          variant: 'secondary',
          size: 'large',
        }}
      >
        <RequestCharterPartyForm offerId={proposedBaseCharterParty?.id} />
      </ModalWindow>,
    ];

    if (!isUserProposer) {
      commonButtons.splice(
        1,
        0,
        <Button
          key="approve"
          buttonProps={{
            text: 'Approve & Proceed',
            variant: 'primary',
            size: 'large',
          }}
          customStyles="whitespace-nowrap"
        />
      );
    }

    return commonButtons;
  };

  return (
    <div className="mb-5 flex flex-col gap-y-5">
      <Title level="2">Second Step: Owner/Charterer Agreement</Title>

      <Notes
        title="Please note!"
        subtitle="Base charter party proposing continues in both sides. The broker will check your preferences and upload the charter party and clauses soon."
      />

      <FieldsetWrapper>
        <Title level="3">
          {userRole === proposedBaseCharterParty?.proposedBy
            ? 'Your Charter Party Request'
            : 'Review Charter Party Request'}
        </Title>
        <FieldsetContent className="mt-2.5">
          <div className="flex flex-col gap-4">
            <div className="rounded-lg bg-blue-50 p-4 text-blue-700">
              <p className="text-sm">
                {userRole === proposedBaseCharterParty?.proposedBy ? (
                  <>
                    You have requested the <span className="font-semibold">{templateName}</span> base charter party. The
                    broker will review and finalize the charter party details.
                  </>
                ) : (
                  <>
                    The {proposedBaseCharterParty?.proposedBy.toLowerCase()} has proposed the base charter party:{' '}
                    <span className="font-semibold">{templateName}</span>
                  </>
                )}
              </p>
            </div>

            <div className="rounded-lg bg-[#E7ECF8] p-4">
              <TextRow title="Base Charter Party" inlineVariant>
                {templateName}
              </TextRow>
              <TextRow title="Status" inlineVariant className="flex items-center">
                <span className="flex items-center gap-1">
                  <StatusIndicator status={proposedBaseCharterParty?.status} />
                  {getStatusText()}
                </span>
              </TextRow>
            </div>

            <div className="flex flex-wrap items-center gap-4">{renderActionButtons()}</div>
          </div>
        </FieldsetContent>
      </FieldsetWrapper>
    </div>
  );
};

AgreementProcessStep.propTypes = {
  proposedBaseCharterParty: PropTypes.shape({
    id: PropTypes.string,
    charterPartyTemplate: PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    }),
    proposedBy: PropTypes.oneOf(['Owner', 'Charterer']),
    status: PropTypes.string,
  }),
};

export default AgreementProcessStep;
