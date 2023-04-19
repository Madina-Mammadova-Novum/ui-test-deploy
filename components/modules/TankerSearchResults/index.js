'use client';

import React, { useState } from 'react';

import { TankerSearchResultPropTypes } from '@/lib/types';

import { Dropdown, NotFound, TextRow, Title } from '@/elements';
import { ExpandableRow } from '@/modules';
import ExpandedContent from '@/modules/TankerSearchResults/ExpandedContent';
import TankerExpandedFooter from '@/modules/TankerSearchResults/TankerExpandedFooter';
import { ExpandableRowHeader, ToggleRows } from '@/units';

const TankerSearchResults = ({ request, params = [], directions = [], data, onChange }) => {
  const [expandExactResults, setExpandExactResults] = useState(false);
  const [expandPartialResults, setExpandPartialResults] = useState(false);

  if (!request) return null;

  const dropdownStyles = { dropdownWidth: 100, className: 'flex items-center gap-x-2.5' };

  return data?.exactResults?.length || data?.partialResults?.length ? (
    <>
      <div className="mt-8 flex">
        <Title level={2} className="mr-auto">
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

      <div className="mt-5 flex justify-between">
        <TextRow title="Exact Matches (arrival within laycan)">{`${3} results`}</TextRow>
        <ToggleRows onToggleClick={() => setExpandExactResults((prevValue) => !prevValue)} value={expandExactResults} />
      </div>
      <div className="flex flex-col gap-y-2.5 mt-3">
        {data?.exactResults.map((rowHeader) => (
          <ExpandableRow
            header={<ExpandableRowHeader headerData={rowHeader} />}
            footer={<TankerExpandedFooter />}
            expand={expandExactResults}
          >
            <ExpandedContent />
          </ExpandableRow>
        ))}
      </div>

      <div className="mt-5 flex justify-between">
        <TextRow title="Partial matches (arrival outside of laycan)">{`${1} result`}</TextRow>
        <ToggleRows
          onToggleClick={() => setExpandPartialResults((prevValue) => !prevValue)}
          value={expandPartialResults?.value}
        />
      </div>
      <div className="flex flex-col gap-y-2.5 mt-3">
        {data?.partialResults.map((rowHeader) => (
          <ExpandableRow
            header={<ExpandableRowHeader headerData={rowHeader} />}
            footer={<TankerExpandedFooter />}
            expand={expandPartialResults}
          >
            <ExpandedContent />
          </ExpandableRow>
        ))}
      </div>
    </>
  ) : (
    <NotFound />
  );
};

TankerSearchResults.propTypes = TankerSearchResultPropTypes;

export default TankerSearchResults;
