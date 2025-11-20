'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';

import { TankerSearchResultPropTypes } from '@/lib/types';

import { searchHeaderDataAdapter } from '@/adapters/search';
import { Button, ExpandableCardHeader, Modal, TextRow } from '@/elements';
import { ExpandableRow } from '@/modules';
import ExpandedContent from '@/modules/TankerSearchResults/ExpandedContent';
import TankerExpandedFooter from '@/modules/TankerSearchResults/TankerExpandedFooter';
import { getSearchSelector } from '@/store/selectors';
import { FavoriteSearchForm, SearchNotFound, ToggleRows } from '@/units';
import { useHookFormParams } from '@/utils/hooks';

const TankerSearchResults = ({ request, data, isAccountSearch = false }) => {
  const { searchParams } = useSelector(getSearchSelector);

  const [expandExactResults, setExpandExactResults] = useState({ value: null });
  const [expandPartialResults, setExpandPartialResults] = useState({ value: null });
  const [isAddFavoriteOpened, setIsAddFavoriteOpened] = useState(false);

  const methods = useHookFormParams({ state: searchParams });

  const searchFormData = methods.getValues();

  const handleOpenModal = (e) => {
    e?.stopPropagation();

    setIsAddFavoriteOpened(true);
  };

  const handleCloseModal = (e) => {
    e?.stopPropagation();
    setIsAddFavoriteOpened(false);
  };

  if (!request) return null;

  return data?.exactResults?.length || data?.partialResults?.length ? (
    <>
      {!!data?.exactResults.length && (
        <div className="mt-5 flex flex-col justify-between sm:flex-row">
          <TextRow title="Exact Matches (arrival within laycan)">{`${data?.exactResults.length} ${
            data?.exactResults.length > 1 ? 'results' : 'result'
          }`}</TextRow>
          <ToggleRows onToggleClick={setExpandExactResults} expandAll={expandExactResults.value} />
        </div>
      )}
      <div className="mt-3 flex flex-col gap-y-2.5">
        {data?.exactResults.map((rowHeader, index) => {
          const shouldExpand = expandExactResults.value !== null ? expandExactResults.value : index === 0;

          return (
            <ExpandableRow
              key={rowHeader.id}
              header={
                <ExpandableCardHeader key={rowHeader?.id} headerData={searchHeaderDataAdapter({ data: rowHeader })} />
              }
              footer={
                <TankerExpandedFooter
                  key={rowHeader?.id}
                  tankerId={rowHeader.id}
                  tankerData={{
                    ballastLeg: rowHeader.ballastLeg,
                    estimatedArrivalTime: rowHeader.estimatedArrivalTime,
                  }}
                  products={rowHeader.products}
                />
              }
              expand={shouldExpand}
            >
              <ExpandedContent data={rowHeader.expandedData} />
            </ExpandableRow>
          );
        })}
      </div>

      {!!data?.partialResults.length && (
        <div className="mt-5 flex justify-between">
          <TextRow title="Partial matches (arrival outside of laycan)">{`${data?.partialResults.length} ${
            data?.partialResults.length > 1 ? 'results' : 'result'
          }`}</TextRow>
          <ToggleRows onToggleClick={setExpandPartialResults} expandAll={expandPartialResults.value} />
        </div>
      )}
      <div className="mt-3 flex flex-col gap-y-2.5">
        {data?.partialResults.map((rowHeader, index) => {
          const shouldExpand = expandPartialResults.value !== null ? expandPartialResults.value : index === 0;

          return (
            <ExpandableRow
              key={rowHeader?.id}
              header={
                <ExpandableCardHeader key={rowHeader?.id} headerData={searchHeaderDataAdapter({ data: rowHeader })} />
              }
              footer={
                <TankerExpandedFooter
                  key={rowHeader?.id}
                  tankerId={rowHeader.id}
                  tankerData={{
                    ballastLeg: rowHeader.ballastLeg,
                    estimatedArrivalTime: rowHeader.estimatedArrivalTime,
                  }}
                  products={rowHeader.products}
                />
              }
              expand={shouldExpand}
            >
              <ExpandedContent data={rowHeader.expandedData} />
            </ExpandableRow>
          );
        })}
      </div>
    </>
  ) : (
    <div>
      <SearchNotFound isAccountSearch={isAccountSearch} />
      {isAccountSearch && (
        <>
          <Button
            buttonProps={{ text: 'Notify Me When Available', variant: 'secondary', size: 'large' }}
            customStylesFromWrap="mb-4"
            onClick={handleOpenModal}
          />
          <Modal opened={isAddFavoriteOpened} onClose={handleCloseModal}>
            <FavoriteSearchForm
              title="Enable Notifications and Save this Search"
              message="Would you like to be notified when a tanker becomes available and save this search to your favorite group?"
              state={searchFormData}
              closeModal={handleCloseModal}
            />
          </Modal>
        </>
      )}
    </div>
  );
};

TankerSearchResults.propTypes = TankerSearchResultPropTypes;

export default TankerSearchResults;
