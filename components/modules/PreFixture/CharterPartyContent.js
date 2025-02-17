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
import { ExpandableRowFooter } from '@/units';

const CharterPartyContent = ({ charterPartyData = {} }) => {
  const { charterParty, riderClauses = [], additionalClauses = [], pdfUrl } = charterPartyData;
  const { baseCharterParty, createdDate, status = 'Active' } = charterParty || {};

  if (!baseCharterParty) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Title level="3">No charter party data available</Title>
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
      text: 'Approve',
      variant: 'primary',
      size: 'medium',
    },
    {
      action: ACTIONS.UPDATE_CP,
      text: 'Update CP',
      variant: 'primary',
      size: 'medium',
    },
  ];

  const content = (
    <div className="mb-5 flex flex-col gap-y-5">
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
