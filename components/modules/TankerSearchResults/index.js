'use client';

import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { NotFound, SimpleSelect, TextRow, Title } from '@/elements';
import { ExpandableRow } from '@/modules';
import ExpandedContent from '@/modules/TankerSearchResults/ExpandedContent';
import TankerExpandedFooter from '@/modules/TankerSearchResults/TankerExpandedFooter';
import { ExpandableRowHeader, ToggleRows } from '@/units';

const TankerSearchResults = ({ request, setSort, sort, searchResult }) => {
  const [expandExactResults, setExpandExactResults] = useState(false);
  const [expandPartialResults, setExpandPartialResults] = useState(false);

  if (!request) return null;

  return searchResult?.exactResults?.length || searchResult?.partialResults?.length ? (
    <>
      <div className="mt-8 flex">
        <Title component="h2" className="mr-auto">
          Search results
        </Title>
        <SimpleSelect
          label="Sort tankers by:"
          selectableItems={['Ballast leg']}
          currentItem={sort.freeParam}
          onChange={(param) => setSort((prevSortParams) => ({ ...prevSortParams, freeParam: param }))}
        />
        <SimpleSelect
          selectableItems={['Ascending', 'Descending']}
          currentItem={sort.direction}
          onChange={(param) => setSort((prevSortParams) => ({ ...prevSortParams, direction: param }))}
        />
      </div>

      <div className="mt-5 flex justify-between">
        <TextRow title="Exact Matches (arrival within laycan)">{`${3} results`}</TextRow>
        <ToggleRows onToggleClick={() => setExpandExactResults((prevValue) => !prevValue)} value={expandExactResults} />
      </div>
      <div className="flex flex-col gap-y-2.5 mt-3">
        {searchResult.exactResults.map((rowHeader) => (
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
          value={expandPartialResults.value}
        />
      </div>
      <div className="flex flex-col gap-y-2.5 mt-3">
        {searchResult.partialResults.map((rowHeader) => (
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

TankerSearchResults.propTypes = {
  setSort: () => {},
  sort: {
    freeParam: '',
    direction: '',
  },
  searchResult: {
    exactResults: [],
    partialResults: [],
  },
};

TankerSearchResults.propTypes = {
  setSort: PropTypes.func,
  request: PropTypes.bool.isRequired,
  sort: PropTypes.shape({
    freeParam: PropTypes.string,
    direction: PropTypes.string,
  }),
  searchResult: PropTypes.shape({
    exactResults: PropTypes.shape([]),
    partialResults: PropTypes.shape([]),
  }),
};

export default TankerSearchResults;
