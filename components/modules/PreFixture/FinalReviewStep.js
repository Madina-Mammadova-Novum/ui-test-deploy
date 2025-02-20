import PropTypes from 'prop-types';

import { Divider, FieldsetContent, FieldsetWrapper, StatusIndicator, TextRow, Title } from '@/elements';

const FinalReviewStep = ({ baseCharterParty, status, pdfUrl, riderClauses = [], additionalClauses = [] }) => (
  <div className="mb-5 flex flex-col gap-y-5">
    <Title level="2">Third Step: Review Charter Party</Title>
    <FieldsetWrapper>
      <Title level="3">Base Charter Party</Title>
      <FieldsetContent className="mt-2.5">
        <TextRow title="Selected Charter Party" inlineVariant>
          {baseCharterParty}
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

FinalReviewStep.propTypes = {
  baseCharterParty: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  pdfUrl: PropTypes.string,
  riderClauses: PropTypes.arrayOf(
    PropTypes.shape({
      clauseNumber: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
  additionalClauses: PropTypes.arrayOf(
    PropTypes.shape({
      clauseNumber: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
};

FinalReviewStep.defaultProps = {
  pdfUrl: '',
  riderClauses: [],
  additionalClauses: [],
};

export default FinalReviewStep;
