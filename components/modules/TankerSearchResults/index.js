'use client';

import { useState } from 'react';

import { TankerSearchResultPropTypes } from '@/lib/types';

import { searchHeaderDataAdapter } from '@/adapters/search';
import { ExpandableCardHeader, TextRow } from '@/elements';
import { ExpandableRow } from '@/modules';
import ExpandedContent from '@/modules/TankerSearchResults/ExpandedContent';
import TankerExpandedFooter from '@/modules/TankerSearchResults/TankerExpandedFooter';
import { SearchNotFound, ToggleRows } from '@/units';

const TankerSearchResults = ({ request, data }) => {
  const [expandExactResults, setExpandExactResults] = useState({ value: false });
  const [expandPartialResults, setExpandPartialResults] = useState({ value: false });

  if (!request) return null;

  return data?.exactResults?.length || data?.partialResults?.length ? (
    <>
      {!!data?.exactResults.length && (
        <div className="mt-5 flex justify-between flex-col sm:flex-row">
          <TextRow title="Exact Matches (arrival within laycan)">{`${data?.exactResults.length} ${
            data?.exactResults.length > 1 ? 'results' : 'result'
          }`}</TextRow>
          <ToggleRows onToggleClick={setExpandExactResults} />
        </div>
      )}
      <div className="flex flex-col gap-y-2.5 mt-3">
        {data?.exactResults.map((rowHeader) => (
          <ExpandableRow
            key={rowHeader.id}
            header={
              <ExpandableCardHeader key={rowHeader?.id} headerData={searchHeaderDataAdapter({ data: rowHeader })} />
            }
            footer={
              <TankerExpandedFooter
                key={rowHeader?.id}
                tankerId={rowHeader.id}
                tankerData={{ ballastLeg: rowHeader.ballastLeg, estimatedArrivalTime: rowHeader.estimatedArrivalTime }}
              />
            }
            expand={expandExactResults}
          >
            <ExpandedContent data={rowHeader.expandedData} />
          </ExpandableRow>
        ))}
      </div>

      {!!data?.partialResults.length && (
        <div className="mt-5 flex justify-between">
          <TextRow title="Partial matches (arrival outside of laycan)">{`${data?.partialResults.length} ${
            data?.partialResults.length > 1 ? 'results' : 'result'
          }`}</TextRow>
          <ToggleRows onToggleClick={setExpandPartialResults} />
        </div>
      )}
      <div className="flex flex-col gap-y-2.5 mt-3">
        {data?.partialResults.map((rowHeader) => (
          <ExpandableRow
            key={rowHeader?.id}
            header={
              <ExpandableCardHeader key={rowHeader?.id} headerData={searchHeaderDataAdapter({ data: rowHeader })} />
            }
            footer={
              <TankerExpandedFooter
                key={rowHeader?.id}
                tankerId={rowHeader.id}
                tankerData={{ ballastLeg: rowHeader.ballastLeg, estimatedArrivalTime: rowHeader.estimatedArrivalTime }}
              />
            }
            expand={expandPartialResults}
          >
            <ExpandedContent data={rowHeader.expandedData} />
          </ExpandableRow>
        ))}
      </div>
    </>
  ) : (
    <SearchNotFound />
  );
};

TankerSearchResults.propTypes = TankerSearchResultPropTypes;

export default TankerSearchResults;
