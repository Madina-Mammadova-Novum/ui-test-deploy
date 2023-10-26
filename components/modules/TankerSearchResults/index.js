'use client';

import React, { useState } from 'react';

import { TankerSearchResultPropTypes } from '@/lib/types';

import { searchHeaderDataAdapter } from '@/adapters/search';
import { Dropdown, ExpandableCardHeader, TextRow, Title } from '@/elements';
import { ExpandableRow } from '@/modules';
import ExpandedContent from '@/modules/TankerSearchResults/ExpandedContent';
import TankerExpandedFooter from '@/modules/TankerSearchResults/TankerExpandedFooter';
import { SearchNotFound, ToggleRows } from '@/units';

const TankerSearchResults = ({ request, params = [], directions = [], data, onChange }) => {
  const [expandExactResults, setExpandExactResults] = useState(false);
  const [expandPartialResults, setExpandPartialResults] = useState(false);

  if (!request) return null;

  const dropdownStyles = { dropdownWidth: 100, className: 'flex items-center gap-x-2.5' };

  return data?.exactResults?.length || data?.partialResults?.length ? (
    <>
      <div className="mt-8 flex">
        <Title level="2" className="mr-auto">
          Search results
        </Title>

        <Dropdown
          label="Sort tankers by:"
          options={params}
          defaultValue={params[0]}
          onChange={(option) => onChange('currentParam', option)}
          customStyles={dropdownStyles}
        />

        <Dropdown
          options={directions}
          defaultValue={directions[0]}
          onChange={(option) => onChange('currentDirection', option)}
          customStyles={dropdownStyles}
        />
      </div>

      {!!data?.exactResults.length && (
        <div className="mt-5 flex justify-between">
          <TextRow title="Exact Matches (arrival within laycan)">{`${data?.exactResults.length} ${
            data?.exactResults.length > 1 ? 'results' : 'result'
          }`}</TextRow>
          <ToggleRows onToggleClick={setExpandExactResults} />
        </div>
      )}
      <div className="flex flex-col gap-y-2.5 mt-3">
        {data?.exactResults.map((rowHeader) => (
          <ExpandableRow
            header={<ExpandableCardHeader headerData={searchHeaderDataAdapter({ data: rowHeader })} />}
            footer={
              <TankerExpandedFooter
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
            header={<ExpandableCardHeader headerData={searchHeaderDataAdapter({ data: rowHeader })} />}
            footer={
              <TankerExpandedFooter
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
