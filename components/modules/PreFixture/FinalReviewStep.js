import PropTypes from 'prop-types';

import { Divider, FieldsetContent, FieldsetWrapper, TextRow, Title } from '@/elements';

const FinalReviewStep = ({ baseCharterParty, pdfUrl, riderClauses = [], additionalClauses = [] }) => (
  <div className="mb-5 flex flex-col gap-y-5">
    <Title level="2">Third Step: Review Charter Party</Title>
    <FieldsetWrapper>
      <Title level="3">Base Charter Party</Title>
      <FieldsetContent className="mt-2.5">
        <TextRow title="Selected Charter Party" inlineVariant>
          {baseCharterParty}
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
          {riderClauses.map(({ name, url }, index) => (
            <div key={`${name}-${url}`} className="mb-4 last:mb-0">
              <TextRow title={`Clause ${index + 1}`} className="mb-1 font-semibold">
                {name}
              </TextRow>
              <TextRow title="PDF Document" inlineVariant>
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue hover:underline">
                  View Document
                </a>
              </TextRow>
              {index < riderClauses.length - 1 && <Divider className="mt-4" />}
            </div>
          ))}
        </FieldsetContent>
      </FieldsetWrapper>
    )}

    {!!additionalClauses?.length && (
      <FieldsetWrapper>
        <Title level="3">Additional Clauses</Title>
        <FieldsetContent className="mt-2.5">
          {additionalClauses.map(({ name, url }, index) => (
            <div key={`${name}-${url}`} className="mb-4 last:mb-0">
              <TextRow title={`Clause ${index + 1}`} className="mb-1 font-semibold">
                {name}
              </TextRow>
              <TextRow title="PDF Document" inlineVariant>
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue hover:underline">
                  View Document
                </a>
              </TextRow>
              {index < additionalClauses.length - 1 && <Divider className="mt-4" />}
            </div>
          ))}
        </FieldsetContent>
      </FieldsetWrapper>
    )}
  </div>
);

FinalReviewStep.propTypes = {
  baseCharterParty: PropTypes.string.isRequired,
  pdfUrl: PropTypes.string,
  riderClauses: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      order: PropTypes.number,
    })
  ),
  additionalClauses: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      order: PropTypes.number,
    })
  ),
};

FinalReviewStep.defaultProps = {
  pdfUrl: '',
  riderClauses: [],
  additionalClauses: [],
};

export default FinalReviewStep;
