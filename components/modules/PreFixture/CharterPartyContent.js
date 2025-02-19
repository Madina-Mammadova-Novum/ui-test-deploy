import { charterPartyContentPropTypes } from '@/lib/types';

import FileInfoAlt from '@/assets/images/fileInfoAlt.svg';
import {
  Button,
  Divider,
  ExpandableCardHeader,
  FieldsetContent,
  FieldsetWrapper,
  StatusIndicator,
  TextRow,
  Title,
} from '@/elements';
import { ACTIONS } from '@/lib/constants';
import { ExpandableRow } from '@/modules';
import { ExpandableRowFooter, ModalWindow } from '@/units';
import RequestCharterPartyForm from '@/units/RequestCharterPartyForm';

const CharterPartyContent = ({ charterPartyData = {} }) => {
  const { charterParty, riderClauses = [], additionalClauses = [], pdfUrl } = charterPartyData;
  const { baseCharterParty, createdDate, status = 'Active' } = charterParty || {};

  if (!baseCharterParty) {
    return (
      <div className="flex h-full w-full flex-col gap-y-5 p-8">
        <FieldsetWrapper>
          <Title level="3" className="text-center">
            Charter Party Not Available
          </Title>
          <FieldsetContent className="mt-2.5">
            <div className="flex flex-col items-center gap-4 text-center">
              <p className="max-w-[600px] text-gray-600">
                The base charter party and clauses have not been uploaded by the broker yet. Please wait for the broker
                to prepare the necessary documents. If needed, you can request a base charter party to initiate the
                process.
              </p>
              <ModalWindow
                buttonProps={{
                  text: 'Request Base Charter Party',
                  variant: 'primary',
                  size: 'large',
                }}
              >
                <RequestCharterPartyForm />
              </ModalWindow>
            </div>
          </FieldsetContent>
        </FieldsetWrapper>
      </div>
    );
  }

  const headerData = [
    { text: baseCharterParty, label: 'Charter Party' },
    { text: createdDate, label: 'Created Date' },
    { text: `${riderClauses.length + additionalClauses.length} clauses`, label: 'Total Clauses' },
    {
      label: 'Charter Party Status',
      text: (
        <span className="flex items-center gap-1">
          <StatusIndicator status={status} />
          {status}
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
      <div className="flex h-full w-full flex-col gap-y-5 p-8">
        <Title level="2">First Step: Request Base Charter Party</Title>
        <FieldsetWrapper>
          <Title level="3" className="text-center">
            Charter Party Not Available
          </Title>
          <FieldsetContent className="mt-2.5">
            <div className="flex flex-col items-center gap-4 text-center">
              <p className="max-w-[600px] text-gray-600">
                The base charter party and clauses have not been uploaded by the broker yet. Please wait for the broker
                to prepare the necessary documents. If needed, you can request a base charter party to initiate the
                process.
              </p>
              <ModalWindow
                buttonProps={{
                  text: 'Request Base Charter Party',
                  variant: 'primary',
                  size: 'large',
                }}
              >
                <RequestCharterPartyForm />
              </ModalWindow>
            </div>
          </FieldsetContent>
        </FieldsetWrapper>
      </div>
      <hr />
      <hr />
      <hr />
      <div className="mb-5 flex flex-col gap-y-5">
        <Title level="2">Second Step: Owner/Charterer Agreement</Title>
        <FieldsetWrapper>
          <Title level="3">Requested Base Charter Party</Title>
          <FieldsetContent className="mt-2.5">
            <div className="flex flex-col gap-4">
              <p className="text-gray-600">
                You have requested the <span className="font-semibold">SHELLTIME</span> base charter party. The broker
                will review and finalize the charter party details.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  buttonProps={{
                    text: 'View Document',
                    icon: { before: <FileInfoAlt className="h-5 w-5 fill-gray-600" /> },
                    variant: 'tertiary',
                    size: 'large',
                  }}
                  customStyles="whitespace-nowrap"
                />
                <ModalWindow
                  buttonProps={{
                    text: 'Change Base Charter Party',
                    variant: 'secondary',
                    size: 'large',
                  }}
                >
                  <RequestCharterPartyForm />
                </ModalWindow>
              </div>
              <div className="mt-2 rounded-lg bg-[#E7ECF8] p-4">
                <TextRow title="Selected Charter Party" inlineVariant>
                  SHELLTIME
                </TextRow>
                <TextRow title="Created Date" inlineVariant>
                  2025-02-17
                </TextRow>
                <TextRow title="Status" inlineVariant className="flex items-center">
                  <span className="flex items-center gap-1">
                    <StatusIndicator status="Pending" />
                    Pending Broker Review
                  </span>
                </TextRow>
              </div>
            </div>
          </FieldsetContent>
        </FieldsetWrapper>
      </div>
      <hr />
      <hr />
      <hr />
      <div className="mb-5 flex flex-col gap-y-5">
        <Title level="2">Second Step: Owner/Charterer Agreement PART 2</Title>
        <FieldsetWrapper>
          <Title level="3">Charterer Review</Title>
          <FieldsetContent className="mt-2.5">
            <div className="flex flex-col gap-4">
              <div className="rounded-lg bg-blue-50 p-4 text-blue-700">
                <p className="text-sm">
                  The vessel owner has proposed the base charter party: <span className="font-semibold">SHELLTIME</span>
                </p>
              </div>

              <div className="rounded-lg bg-[#E7ECF8] p-4">
                <TextRow title="Base Charter Party" inlineVariant>
                  SHELLTIME
                </TextRow>
                <TextRow title="Created Date" inlineVariant>
                  2025-02-17
                </TextRow>
                <TextRow title="Status" inlineVariant className="flex items-center">
                  <span className="flex items-center gap-1">
                    <StatusIndicator status="Pending" />
                    Pending Charterer Approval
                  </span>
                </TextRow>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Button
                  buttonProps={{
                    text: 'View Document',
                    icon: { before: <FileInfoAlt className="h-5 w-5 fill-gray-600" /> },
                    variant: 'tertiary',
                    size: 'large',
                  }}
                  customStyles="whitespace-nowrap"
                />
                <Button
                  buttonProps={{
                    text: 'Approve & Proceed',
                    variant: 'primary',
                    size: 'large',
                  }}
                  customStyles="whitespace-nowrap"
                />
                <ModalWindow
                  buttonProps={{
                    text: 'Propose a Different CP',
                    variant: 'secondary',
                    size: 'large',
                  }}
                >
                  <RequestCharterPartyForm />
                </ModalWindow>
              </div>

              {/* Approval Confirmation Message - This would be shown after approval */}
              <div className="rounded-lg bg-green-50 p-4 text-green-700">
                <p className="text-sm">
                  You have approved the base charter party: <span className="font-semibold">SHELLTIME</span>. The broker
                  will proceed with the next steps.
                </p>
              </div>
            </div>
          </FieldsetContent>
        </FieldsetWrapper>
      </div>
      <hr />
      <hr />
      <hr />
      <div className="mb-5 flex flex-col gap-y-5">
        <Title level="2">Second Step: Owner/Charterer Agreement PART 3</Title>
        <FieldsetWrapper>
          <Title level="3">Owner&apos;s View</Title>
          <FieldsetContent className="mt-2.5">
            <div className="flex flex-col gap-6">
              {/* Scenario 1: Waiting for Charterer */}
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-xs rounded-md bg-yellow-100 px-2 py-1 font-semibold text-yellow-700">
                    Scenario 1: Awaiting Charterer Response
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="rounded-lg bg-[#E7ECF8] p-4">
                    <TextRow title="Your Action" inlineVariant>
                      Submitted SHELLTIME for approval
                    </TextRow>
                    <TextRow title="Current Status" inlineVariant className="flex items-center">
                      <span className="flex items-center gap-1">
                        <StatusIndicator status="Pending" />
                        Waiting for Charterer to Approve
                      </span>
                    </TextRow>
                  </div>
                  <div className="rounded-lg bg-yellow-50 p-4">
                    <p className="text-sm text-yellow-700">
                      You have submitted <span className="font-semibold">SHELLTIME</span> as the base charter party.
                      Waiting for the charterer to review and respond.
                    </p>
                  </div>
                </div>
              </div>

              {/* Scenario 2: Charterer Approved */}
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-xs rounded-md bg-green-100 px-2 py-1 font-semibold text-green-700">
                    Scenario 2: Charterer Approved
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="rounded-lg bg-[#E7ECF8] p-4">
                    <TextRow title="Charterer Action" inlineVariant>
                      Approved SHELLTIME
                    </TextRow>
                    <TextRow title="Status Update" inlineVariant className="flex items-center">
                      <span className="flex items-center gap-1">
                        <StatusIndicator status="Approved" />
                        Approved by Charterer
                      </span>
                    </TextRow>
                  </div>
                  <div className="rounded-lg bg-green-50 p-4">
                    <p className="text-sm text-green-700">
                      The charterer has approved your proposed base charter party:{' '}
                      <span className="font-semibold">SHELLTIME</span>. The broker will proceed with the next steps.
                    </p>
                  </div>
                </div>
              </div>

              {/* Scenario 3: Charterer Counter-Proposed */}
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-xs rounded-md bg-blue-100 px-2 py-1 font-semibold text-blue-700">
                    Scenario 3: Charterer Counter-Proposed
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="rounded-lg bg-[#E7ECF8] p-4">
                    <TextRow title="Charterer Action" inlineVariant>
                      Proposed different CP: GENCON 2022
                    </TextRow>
                    <TextRow title="Required Action" inlineVariant>
                      Review and respond to new proposal
                    </TextRow>
                    <TextRow title="Status" inlineVariant className="flex items-center">
                      <span className="flex items-center gap-1">
                        <StatusIndicator status="Pending" />
                        Updated by Charterer - Pending Your Approval
                      </span>
                    </TextRow>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button
                      buttonProps={{
                        text: 'View New Proposal',
                        icon: { before: <FileInfoAlt className="h-5 w-5 fill-gray-600" /> },
                        variant: 'tertiary',
                        size: 'large',
                      }}
                      customStyles="whitespace-nowrap"
                    />
                    <Button
                      buttonProps={{
                        text: 'Accept GENCON 2022',
                        variant: 'primary',
                        size: 'large',
                      }}
                      customStyles="whitespace-nowrap"
                    />
                    <ModalWindow
                      buttonProps={{
                        text: 'Propose Alternative',
                        variant: 'secondary',
                        size: 'large',
                      }}
                    >
                      <RequestCharterPartyForm />
                    </ModalWindow>
                  </div>
                </div>
              </div>

              {/* Current Process Status */}
              <div className="rounded-lg border-l-4 border-l-blue-600 bg-blue-50 p-4">
                <div className="flex items-center gap-2">
                  <FileInfoAlt className="h-5 w-5 fill-blue-600" />
                  <p className="text-sm text-blue-700">
                    The charter party selection process requires agreement from both parties before proceeding
                  </p>
                </div>
              </div>
            </div>
          </FieldsetContent>
        </FieldsetWrapper>
      </div>
      <hr />
      <hr />
      <hr />
      <div className="mb-5 flex flex-col gap-y-5">
        <Title level="2">Third Step: Review Charter Party</Title>
        <FieldsetWrapper>
          <Title level="3">Base Charter Party</Title>
          <FieldsetContent className="mt-2.5">
            <TextRow title="Selected Charter Party" inlineVariant>
              {baseCharterParty}
            </TextRow>
            <TextRow title="Created Date" inlineVariant>
              {createdDate}
            </TextRow>
            <TextRow title="Status" inlineVariant className="flex items-center">
              <span className="flex items-center gap-1">
                <StatusIndicator status={status} />
                {status}
              </span>
            </TextRow>
            {pdfUrl && (
              <TextRow title="PDF Document" inlineVariant>
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue hover:underline">
                  View Document
                </a>
              </TextRow>
            )}
          </FieldsetContent>
        </FieldsetWrapper>

        {!!riderClauses?.length && (
          <FieldsetWrapper>
            <Title level="3">Rider Clauses</Title>
            <FieldsetContent className="mt-2.5">
              {riderClauses.map(({ clauseNumber, title, text }) => (
                <div key={clauseNumber} className="mb-4 last:mb-0">
                  <TextRow title={`Clause ${clauseNumber}`} className="mb-1 font-semibold">
                    {title}
                  </TextRow>
                  <p className="pl-4 text-xsm text-black">{text}</p>
                  {clauseNumber < riderClauses.length && <Divider className="mt-4" />}
                </div>
              ))}
            </FieldsetContent>
          </FieldsetWrapper>
        )}

        {!!additionalClauses?.length && (
          <FieldsetWrapper>
            <Title level="3">Additional Clauses</Title>
            <FieldsetContent className="mt-2.5">
              {additionalClauses.map(({ clauseNumber, title, text }) => (
                <div key={clauseNumber} className="mb-4 last:mb-0">
                  <TextRow title={`Clause ${clauseNumber}`} className="mb-1 font-semibold">
                    {title}
                  </TextRow>
                  <p className="pl-4 text-xsm text-black">{text}</p>
                  {clauseNumber < additionalClauses.length && <Divider className="mt-4" />}
                </div>
              ))}
            </FieldsetContent>
          </FieldsetWrapper>
        )}
      </div>
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
          gridStyles="1fr 1fr 1fr 1fr"
        />
      }
      footer={
        baseCharterParty ? (
          <ExpandableRowFooter>
            <div className="flex flex-col justify-center gap-x-5 gap-y-2.5 pb-2.5 lg:flex-row">
              <div className="w-full grow">
                <Button
                  buttonProps={{
                    text: 'Review',
                    icon: { before: <FileInfoAlt className="h-6 w-6 fill-black" /> },
                    variant: 'tertiary',
                    size: 'large',
                  }}
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
