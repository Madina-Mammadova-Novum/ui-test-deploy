'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { UisFavorite, UisObjectGroup, UisSchedule } from '@iconscout/react-unicons-solid';
import classNames from 'classnames';

import PaginationComponent from '../PaginationComponent';

import { FavoriteSearchListPropTypes } from '@/lib/types';

import { prefilledSaveSearchDataAdapter } from '@/adapters/negotiating';
import ArrowSVG from '@/assets/images/arrow.svg';
import BellSVG from '@/assets/images/bell.svg';
import { Button, Loader, TextWithLabel, Title } from '@/elements';
import { deleteSavedSearch, getSavedSearchDetail, getSavedSearches, updateSavedSearch } from '@/services/savedSearch';
import { setSearchParams } from '@/store/entities/search/slice';
import { ConfirmModal, Notes } from '@/units';
import { transformDate } from '@/utils/date';
import { calculateAmountOfPages } from '@/utils/helpers';
import { errorToast, successToast, useFilters } from '@/utils/hooks';

const FavoriteSearchList = ({ onClose }) => {
  const dispatch = useDispatch();

  const [savedSearches, setSavedSearches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recordsTotals, setRecordsTotals] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({});

  const { currentPage, handlePageChange, handleSelectedPageChange, perPage } = useFilters({
    itemsPerPage: 4, // Increased to show 4 items (2x2 grid on 3MD)
    initialPage: 1,
    data: savedSearches,
    sortValue: 'asc',
  });

  const fetchSearches = async (skip, pageSize) => {
    setIsLoading(true);

    const {
      data: searchResponse,
      status,
      error,
      recordsTotal,
    } = await getSavedSearches({
      skip,
      pageSize,
    });

    if (status === 200) {
      setSavedSearches([...searchResponse]);
      const totalPages = calculateAmountOfPages(recordsTotal, perPage);
      setRecordsTotals(totalPages || 0);
    } else if (error) {
      errorToast(error?.title, error?.message);
    }
    setIsLoading(false);
  };

  const openModal = (config) => {
    setModalConfig(config);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalConfig({});
  };

  const deleteSearchHandler = async (searchId) => {
    setIsLoading(true);

    const { message, status, error } = await deleteSavedSearch({
      searchId,
    });

    if (status === 204) {
      if (recordsTotals > 2) {
        handleSelectedPageChange({ value: 1 });
        if (currentPage) fetchSearches(1, perPage);
      } else {
        fetchSearches(1, perPage);
      }

      successToast(message);
    } else if (error) {
      errorToast(error?.title, error?.message);
    }
    setIsLoading(false);
  };

  const searchUseHandler = async (searchId) => {
    setIsLoading(true);

    const { data, status, error } = await getSavedSearchDetail({
      searchId,
    });

    if (status === 200) {
      dispatch(setSearchParams(prefilledSaveSearchDataAdapter({ data, isSavedSearch: true, savedSearchId: searchId })));
      onClose();
    } else if (error) {
      errorToast(error?.title, error?.message);
    }
    setIsLoading(false);
  };

  const updateSearchHandler = async (searchId, index) => {
    setIsLoading(true);

    const selectedSearch = { ...savedSearches[index] };
    const nextSavedSearch = { ...selectedSearch, isNotification: !selectedSearch.isNotification };

    const { message, messageDescription, status, error } = await updateSavedSearch({
      searchId,
      data: nextSavedSearch,
    });

    if (status === 200) {
      if (recordsTotals > 2) {
        handleSelectedPageChange({ value: 1 });
        if (currentPage) fetchSearches(1, perPage);
      } else {
        fetchSearches(1, perPage);
      }

      successToast(message, messageDescription);
    } else if (error) {
      errorToast(error?.title, error?.message);
    }
    setIsLoading(false);
  };

  const renderSearchCard = (search, index) => {
    const { name, id, laycanStart, laycanEnd, status, isNotification, loadTerminal, dischargeTerminal, cargoType } =
      search;
    const isDisabled = status !== 'Active';

    return (
      <div
        key={id}
        className={classNames(
          'rounded-md border bg-white p-3 shadow-sm transition-all duration-200',
          isDisabled && 'bg-gray-50 opacity-75'
        )}
      >
        {/* Header - more compact */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {name && (
              <Title level="4" className="truncate text-sm font-semibold text-black">
                {name}
              </Title>
            )}
            {isDisabled && (
              <span className="whitespace-nowrap rounded-full bg-gray-200 px-1.5 py-0.5 text-xs text-gray-600">
                Inactive
              </span>
            )}
          </div>
          <Button
            customStyles="p-1 flex-shrink-0"
            buttonProps={{
              icon: {
                before: <BellSVG size="16" className={isNotification ? 'fill-blue' : 'fill-gray'} />,
              },
              variant: 'tertiary',
              size: 'small',
            }}
            onClick={() =>
              openModal({
                message: isNotification
                  ? 'Are you sure you want to stop receiving notifications for this search?'
                  : 'Are you sure you want to start receiving notifications for this search?',
                onConfirm: () => updateSearchHandler(id, index),
                variant: 'primary',
                confirmText: isNotification ? 'Stop Notifications' : 'Start Notifications',
              })
            }
            disabled={isLoading || isDisabled}
          />
        </div>

        {/* Route Display - responsive design */}
        <div className="mb-3">
          {/* 3MD screens: Horizontal layout */}
          <div className="hidden 3md:block">
            <div className="flex items-center">
              {/* Load Port */}
              <div className="flex-1 rounded-md border-l-4 border-blue-500 bg-blue-50 px-2 py-1.5">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium uppercase tracking-wide text-blue-700">LOAD</span>
                  <div className="h-1 w-1 rounded-full bg-blue-400" />
                </div>
                <div className="mt-0.5">
                  <div className="truncate text-xs font-semibold text-gray-900">{loadTerminal.port.name}</div>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <TextWithLabel
                      customStyles=""
                      textGroupStyle="text-xs font-medium"
                      text={loadTerminal.port.locode}
                      countryCode={loadTerminal.port.country?.codeISO2 || loadTerminal.port.locode.slice(0, 2)}
                    />
                  </div>
                </div>
              </div>

              {/* Connection Arrow */}
              <div className="flex items-center justify-center px-2">
                <div className="flex items-center">
                  <div className="h-0.5 w-4 bg-gradient-to-r from-blue-400 to-green-400" />
                  <div className="mx-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-green-500">
                    <ArrowSVG size="10" className="-rotate-90 fill-white" />
                  </div>
                  <div className="h-0.5 w-4 bg-gradient-to-r from-green-400 to-green-500" />
                </div>
              </div>

              {/* Discharge Port */}
              <div className="flex-1 rounded-md border-l-4 border-green-500 bg-green-50 px-2 py-1.5">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium uppercase tracking-wide text-green-700">DISCHARGE</span>
                  <div className="h-1 w-1 rounded-full bg-green-400" />
                </div>
                <div className="mt-0.5">
                  <div className="truncate text-xs font-semibold text-gray-900">{dischargeTerminal.port.name}</div>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <TextWithLabel
                      customStyles=""
                      textGroupStyle="text-xs font-medium"
                      text={dischargeTerminal.port.locode}
                      countryCode={
                        dischargeTerminal.port.country?.codeISO2 || dischargeTerminal.port.locode.slice(0, 2)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tablet/Mobile: Vertical layout */}
          <div className="3md:hidden">
            <div className="space-y-2">
              {/* Load Port */}
              <div className="rounded-md border-l-4 border-blue-500 bg-blue-50 px-3 py-2">
                <div className="mb-1 flex items-center gap-1">
                  <span className="text-xs font-medium uppercase tracking-wide text-blue-700">LOAD</span>
                  <div className="h-1 w-1 rounded-full bg-blue-400" />
                </div>
                <div className="text-sm font-semibold text-gray-900">{loadTerminal.port.name}</div>
                <div className="mt-1 flex items-center gap-1 text-xs text-gray-600">
                  <TextWithLabel
                    customStyles=""
                    textGroupStyle="text-xs font-medium"
                    text={loadTerminal.port.locode}
                    countryCode={loadTerminal.port.country?.codeISO2 || loadTerminal.port.locode.slice(0, 2)}
                  />
                </div>
              </div>

              {/* Connection Indicator - pointing down */}
              <div className="flex justify-center">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-b from-blue-500 to-green-500">
                  <ArrowSVG size="10" className="fill-white" />
                </div>
              </div>

              {/* Discharge Port */}
              <div className="rounded-md border-l-4 border-green-500 bg-green-50 px-3 py-2">
                <div className="mb-1 flex items-center gap-1">
                  <span className="text-xs font-medium uppercase tracking-wide text-green-700">DISCHARGE</span>
                  <div className="h-1 w-1 rounded-full bg-green-400" />
                </div>
                <div className="text-sm font-semibold text-gray-900">{dischargeTerminal.port.name}</div>
                <div className="mt-1 flex items-center gap-1 text-xs text-gray-600">
                  <TextWithLabel
                    customStyles=""
                    textGroupStyle="text-xs font-medium"
                    text={dischargeTerminal.port.locode}
                    countryCode={dischargeTerminal.port.country?.codeISO2 || dischargeTerminal.port.locode.slice(0, 2)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Voyage Details */}
        <div className="mb-3 flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 rounded-md bg-gray-50 px-2 py-1">
            <UisSchedule size="12" color="#6B7280" />
            <span className="font-medium text-gray-700">
              {transformDate(laycanStart, 'MMM dd')} - {transformDate(laycanEnd, 'MMM dd')}
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-orange-50 px-2 py-1">
            <UisObjectGroup size="12" color="#EA580C" />
            <span className="truncate font-medium text-orange-700">{cargoType.name}</span>
          </div>
        </div>

        {/* Actions - more compact */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            buttonProps={{
              text: 'Use Search',
              variant: 'primary',
              size: 'medium',
            }}
            customStyles="flex-1 !py-1.5 !text-xs"
            onClick={() => searchUseHandler(id)}
            disabled={isLoading || isDisabled}
          />
          <Button
            buttonProps={{
              text: 'Delete',
              variant: 'delete',
              size: 'medium',
            }}
            customStyles="flex-1 !py-1.5 !text-xs"
            onClick={() =>
              openModal({
                message: 'Are you sure you want to delete this search?',
                onConfirm: () => deleteSearchHandler(id),
                variant: 'delete',
                confirmText: 'Delete Search',
              })
            }
            disabled={isLoading}
          />
        </div>
      </div>
    );
  };

  useEffect(() => {
    fetchSearches(currentPage, perPage);
  }, [currentPage, perPage]);

  return (
    <div className="flex h-full w-full flex-col 3md:h-auto 3md:w-[800px]">
      {/* Header - more compact */}
      <div className="mb-4 flex flex-shrink-0 items-center gap-2">
        <UisFavorite size="20" color="#072d46" />
        <Title level="2" className="text-base font-bold text-black">
          Favorite Searches
        </Title>
      </div>

      {/* Content - responsive grid with calculated height */}
      <div className="flex-1 overflow-y-auto pr-2 3md:max-h-[500px] 3md:min-h-[300px] 3md:flex-initial">
        {isLoading ? (
          <div className="flex h-full w-[300px] items-center justify-center 3md:h-[300px] 3md:w-full">
            <Loader className="size-6" />
          </div>
        ) : savedSearches.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 3md:grid-cols-2 3md:gap-3">{savedSearches.map(renderSearchCard)}</div>
        ) : (
          <div className="flex h-full items-center justify-center 3md:h-[300px]">
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <UisFavorite size="32" color="#828C9C" className="mb-3 opacity-50" />
              <Notes
                title="No Favorite Searches Found"
                subtitle="You currently have no favorite searches. Once you mark searches as favorites, they will appear here."
              />
            </div>
          </div>
        )}
      </div>

      {/* Pagination - more compact and always at bottom */}
      {!isLoading && savedSearches.length > 0 && recordsTotals > 1 && (
        <div className="mt-4 flex flex-shrink-0 justify-center border-t border-gray-100 pt-4">
          <PaginationComponent currentPage={currentPage} pageCount={recordsTotals} onPageChange={handlePageChange} />
        </div>
      )}

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={modalConfig.onConfirm}
        onClose={closeModal}
        message={modalConfig.message}
        variant={modalConfig.variant}
        confirmText={modalConfig.confirmText}
        okButtonProps={modalConfig.okButtonProps}
        cancelButtonProps={modalConfig.cancelButtonProps}
      />
    </div>
  );
};

FavoriteSearchList.propTypes = FavoriteSearchListPropTypes;

export default FavoriteSearchList;
