'use client';

import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { SimpleSelect, TextRow, Title } from '@/elements';
import { ExpandableRow } from '@/modules';
import ExpandedContent from '@/modules/TankerSearchResults/ExpandedContent';
import TankerExpandedFooter from '@/modules/TankerSearchResults/TankerExpandedFooter';
import { ExpandableRowHeader, ToggleRows } from '@/units';

const TankerSearchResults = ({ setSortParams, sortParams, searchResult }) => {
  const [expandExactResults, setExpandExactResults] = useState({ value: false });
  const [expandPartialResults, setExpandPartialResults] = useState({ value: false });

  return (
    <>
      <div className="mt-8 flex">
        <Title component="h2" className="mr-auto">
          Search results
        </Title>
        <SimpleSelect
          label="Sort tankers by:"
          selectableItems={['Ballast leg']}
          currentItem={sortParams.freeParam}
          onChange={(param) => setSortParams((prevSortParams) => ({ ...prevSortParams, freeParam: param }))}
        />
        <SimpleSelect
          selectableItems={['Ascending', 'Descending']}
          currentItem={sortParams.direction}
          onChange={(param) => setSortParams((prevSortParams) => ({ ...prevSortParams, direction: param }))}
        />
      </div>

      <div className="mt-5 flex justify-between">
        <TextRow title="Exact Matches (arrival within laycan)" subtitle={`${3} results`} />
        <ToggleRows
          onToggleClick={() => setExpandExactResults((prevValue) => ({ value: !prevValue.value }))}
          value={expandExactResults.value}
        />
      </div>
      <div className="flex flex-col gap-y-2.5 mt-3">
        {searchResult.exactResults.map((rowHeader) => (
          <ExpandableRow
            headerComponent={<ExpandableRowHeader headerData={rowHeader} />}
            footerComponent={<TankerExpandedFooter />}
            expandAll={expandExactResults}
          >
            <ExpandedContent />
          </ExpandableRow>
        ))}
      </div>

      <div className="mt-5 flex justify-between">
        <TextRow title="Partial matches (arrival outside of laycan)" subtitle={`${1} result`} />
        <ToggleRows
          onToggleClick={() => setExpandPartialResults((prevValue) => ({ value: !prevValue.value }))}
          value={expandPartialResults.value}
        />
      </div>
      <div className="flex flex-col gap-y-2.5 mt-3">
        {searchResult.partialResults.map((rowHeader) => (
          <ExpandableRow
            headerComponent={<ExpandableRowHeader headerData={rowHeader} />}
            expandAll={expandPartialResults}
          >
            <ExpandedContent />
          </ExpandableRow>
        ))}
      </div>
    </>
  );
};

TankerSearchResults.propTypes = {
  setSortParams: () => {},
  sortParams: {
    freeParam: '',
    direction: '',
  },
  searchResult: {
    exactResults: [],
    partialResults: [],
  },
};

TankerSearchResults.propTypes = {
  setSortParams: PropTypes.func,
  sortParams: PropTypes.shape({
    freeParam: PropTypes.string,
    direction: PropTypes.string,
  }),
  searchResult: PropTypes.shape({
    exactResults: PropTypes.shape([]),
    partialResults: PropTypes.shape([]),
  }),
};

export default TankerSearchResults;
