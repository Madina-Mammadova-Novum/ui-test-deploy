import { useState } from 'react';

import PropTypes from 'prop-types';

import { Button, Divider, FieldsetContent, FieldsetWrapper, TextRow, Title } from '@/elements';
import { handleViewDocument } from '@/utils/helpers';
import { errorToast } from '@/utils/hooks';

const FinalReviewStep = ({ baseCharterParty = {}, riderClauses = [], additionalClauses = [] }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDocumentView = async (url) => {
    setIsLoading(true);
    try {
      await handleViewDocument(url);
    } catch (error) {
      errorToast('View Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-5 flex flex-col gap-y-5">
      <Title level="2">Third Step: Review Charter Party</Title>
      <FieldsetWrapper>
        <Title level="3">Base Charter Party</Title>
        <FieldsetContent className="mt-2.5">
          <TextRow title="Selected Charter Party" inlineVariant>
            {baseCharterParty?.name}
          </TextRow>

          <TextRow title="PDF Document" inlineVariant>
            <Button
              buttonProps={{
                text: 'View Document',
                variant: 'primary',
                size: 'small',
              }}
              customStyles="!px-1 !py-0"
              onClick={() => handleDocumentView(baseCharterParty?.url)}
              disabled={isLoading || !baseCharterParty?.url}
            />
          </TextRow>
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
                  <Button
                    buttonProps={{
                      text: 'View Document',
                      variant: 'primary',
                      size: 'small',
                    }}
                    onClick={() => handleDocumentView(url)}
                    disabled={isLoading || !url}
                    customStyles="!px-1 !py-0"
                  />
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
                  <Button
                    buttonProps={{
                      text: 'View Document',
                      variant: 'primary',
                      size: 'small',
                    }}
                    onClick={() => handleDocumentView(url)}
                    disabled={isLoading || !url}
                    customStyles="!px-1 !py-0"
                  />
                </TextRow>
                {index < additionalClauses.length - 1 && <Divider className="mt-4" />}
              </div>
            ))}
          </FieldsetContent>
        </FieldsetWrapper>
      )}
    </div>
  );
};

FinalReviewStep.propTypes = {
  baseCharterParty: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }),
  riderClauses: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
      order: PropTypes.number,
    })
  ),
  additionalClauses: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
      order: PropTypes.number,
    })
  ),
};

export default FinalReviewStep;
