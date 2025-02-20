import FileInfoAlt from '@/assets/images/fileInfoAlt.svg';
import { Button, FieldsetContent, FieldsetWrapper, StatusIndicator, TextRow, Title } from '@/elements';
import { ModalWindow } from '@/units';
import RequestCharterPartyForm from '@/units/RequestCharterPartyForm';

const AgreementProcessStep = () => (
  <div className="mb-5 flex flex-col gap-y-5">
    <Title level="2">Second Step: Owner/Charterer Agreement</Title>

    {/* Owner's Initial Request Section */}
    <FieldsetWrapper>
      <Title level="3">Requested Base Charter Party</Title>
      <FieldsetContent className="mt-2.5">
        <div className="flex flex-col gap-4">
          <p className="text-gray-600">
            You have requested the <span className="font-semibold">SHELLTIME</span> base charter party. The broker will
            review and finalize the charter party details.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button
              buttonProps={{
                text: 'View Document',
                icon: { before: <FileInfoAlt className="h-6 w-6 fill-black" /> },
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

    {/* Charterer Review Section */}
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
                icon: { before: <FileInfoAlt className="h-6 w-6 fill-black" /> },
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

          <div className="rounded-lg bg-green-50 p-4 text-green-700">
            <p className="text-sm">
              You have approved the base charter party: <span className="font-semibold">SHELLTIME</span>. The broker
              will proceed with the next steps.
            </p>
          </div>
        </div>
      </FieldsetContent>
    </FieldsetWrapper>

    {/* Owner's Response Section */}
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
                  You have submitted <span className="font-semibold">SHELLTIME</span> as the base charter party. Waiting
                  for the charterer to review and respond.
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
                    icon: { before: <FileInfoAlt className="h-6 w-6 fill-black" /> },
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
        </div>
      </FieldsetContent>
    </FieldsetWrapper>
  </div>
);

export default AgreementProcessStep;
