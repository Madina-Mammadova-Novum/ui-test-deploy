'use client';

import React, { useState } from 'react';

import { InformationRow, SimpleSelect, Title } from '@/elements';
import { ExpandableRow } from '@/modules';
import ExpandedContent from '@/modules/TankerSearch/ExpandedContent';
import { ExpandableRowHeader, SearchForm, ToggleRows } from '@/units';
import { searchRowHeaders } from '@/utils/mock';

const TankerSearch = () => {
  const [sortParams, setSortParams] = useState({
    freeParam: 'Ballast leg',
    direction: 'Ascending',
  });
  const [expandExactResults, setExpandExactResults] = useState({ value: false });
  const [expandPartialResults, setExpandPartialResults] = useState({ value: false });

  return (
    <>
      <SearchForm />

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
        <InformationRow
          keyTextProps={{ keyText: 'Exact Matches (arrival within laycan):', keyTextStyles: 'text-gray' }}
          labelProps={{ label: `${3} results` }}
        />
        <ToggleRows
          onExpandClick={() => setExpandExactResults({ value: true })}
          onCollapseClick={() => setExpandExactResults({ value: false })}
        />
      </div>
      <div className="flex flex-col gap-y-2.5 mt-3">
        {searchRowHeaders.exactResults.map((rowHeader) => (
          <ExpandableRow
            headerComponent={<ExpandableRowHeader headerData={rowHeader} />}
            expandAll={expandExactResults}
          >
            <ExpandedContent />
          </ExpandableRow>
        ))}
      </div>

      <div className="mt-5 flex justify-between">
        <InformationRow
          keyTextProps={{ keyText: 'Partial matches (arrival outside of laycan):', keyTextStyles: 'text-gray' }}
          labelProps={{ label: `${1} result` }}
        />
        <ToggleRows
          onExpandClick={() => setExpandPartialResults({ value: true })}
          onCollapseClick={() => setExpandPartialResults({ value: false })}
        />
      </div>
      <div className="flex flex-col gap-y-2.5 mt-3">
        {searchRowHeaders.partialResults.map((rowHeader) => (
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

export default TankerSearch;
