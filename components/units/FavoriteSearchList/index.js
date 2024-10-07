'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { UisAngleDoubleRight, UisFavorite, UisObjectGroup, UisSchedule } from '@iconscout/react-unicons-solid';
import classnames from 'classnames';

import PaginationComponent from '../PaginationComponent';

import { FavoriteSearchListPropTypes } from '@/lib/types';

import { prefilledSaveSearchDataAdapter } from '@/adapters/negotiating';
import BellSVG from '@/assets/images/bell.svg';
import { Button, Loader, TextWithLabel, Title } from '@/elements';
import { deleteSavedSearch, getSavedSearchDetail, getSavedSearches, updateSavedSearch } from '@/services/savedSearch';
import { setPrefilledSearchData, setSearchParams } from '@/store/entities/search/slice';
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
    itemsPerPage: 2,
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
      dispatch(
        setPrefilledSearchData(prefilledSaveSearchDataAdapter({ data, isSavedSearch: true, savedSearchId: searchId }))
      );
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

  useEffect(() => {
    fetchSearches(currentPage, perPage);
  }, [currentPage, perPage]);

  return (
    <div className="relative flex flex-col gap-2 pb-12 lg:gap-4 lg:pb-16">
      <Title level="2" className="mb-2 flex items-center gap-2 text-sm font-bold capitalize text-black lg:text-lg">
        <UisFavorite size="24" color="#072d46" />
        Favorite Searches
      </Title>

      {isLoading && (
        <div
          className="spinner-border text-primary flex h-[33rem] w-[22.3rem] items-center justify-center"
          role="status"
        >
          <Loader className="size-16" />
        </div>
      )}

      {!isLoading &&
        (savedSearches.length > 0 ? (
          savedSearches?.map(
            (
              { name, id, laycanStart, laycanEnd, status, isNotification, loadTerminal, dischargeTerminal, cargoType },
              index
            ) => (
              <div
                key={id}
                className={classnames(
                  'flex w-full flex-col items-center justify-center rounded-lg border p-4 shadow-xmd',
                  status !== 'Active' && 'bg-gray-darker'
                )}
              >
                {name && (
                  <Title level="2" className="text-sm font-bold capitalize text-black">
                    {name}
                  </Title>
                )}
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center gap-2">
                    <TextWithLabel
                      customStyles="!max-w-[6.625rem] !w-full"
                      textGroupStyle="!text-base"
                      text={loadTerminal.port.locode}
                      countryCode={loadTerminal.port.country?.codeISO2 || loadTerminal.port.locode.slice(0, 2)}
                    />
                    <UisAngleDoubleRight size="60" color="#072d46" />
                    <TextWithLabel
                      customStyles="!max-w-[6.625rem] !w-full"
                      textGroupStyle="!text-base"
                      text={dischargeTerminal.port.locode}
                      countryCode={
                        dischargeTerminal.port.country?.codeISO2 || dischargeTerminal.port.locode.slice(0, 2)
                      }
                    />
                  </div>

                  <div className="flex items-center gap-4 text-xsm font-bold text-black lg:text-sm">
                    <span>{transformDate(laycanStart, 'MMM dd, yyyy')}</span>
                    <UisSchedule size="24" color="#072d46" />

                    <span>{transformDate(laycanEnd, 'MMM dd, yyyy')}</span>
                  </div>

                  <div className="mt-2 flex gap-1">
                    <span className="flex items-center justify-center gap-2 rounded-full border border-solid border-black p-3 text-xsm font-bold text-black">
                      <UisObjectGroup size="24" color="#072d46" />
                      {cargoType.name}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button
                    customStyles="px-1 py-6 lg:px-3.5 lg:py-2.5"
                    buttonProps={{ text: 'Use Search', size: 'medium', variant: 'primary' }}
                    onClick={() => searchUseHandler(id)}
                    disabled={isLoading}
                  />
                  <Button
                    customStyles="px-1 py-6 lg:px-3.5 lg:py-2.5"
                    buttonProps={{ text: 'Delete Search', size: 'medium', variant: 'delete' }}
                    onClick={() =>
                      openModal({
                        message: 'Are you sure you want to delete this search?',
                        onConfirm: () => deleteSearchHandler(id),
                      })
                    }
                    disabled={isLoading}
                  />
                  <Button
                    customStyles="px-1 py-6 lg:px-3.5 lg:py-2.5"
                    buttonProps={{
                      icon: { before: <BellSVG size="30" className={isNotification ? 'fill-blue' : 'fill-black'} /> },
                      size: 'medium',
                      variant: isNotification ? 'primary' : 'tertiary',
                    }}
                    onClick={() =>
                      openModal({
                        message: isNotification
                          ? 'Are you sure you want to stop receiving notifications for this search?'
                          : 'Are you sure you want to start receiving notifications for this search?',
                        onConfirm: () => updateSearchHandler(id, index),
                      })
                    }
                    disabled={isLoading}
                  />

                  <ConfirmModal
                    isOpen={isModalOpen}
                    onConfirm={modalConfig.onConfirm}
                    onClose={closeModal}
                    message={modalConfig.message}
                    okButtonProps={modalConfig.okButtonProps}
                    cancelButtonProps={modalConfig.cancelButtonProps}
                  />
                </div>
              </div>
            )
          )
        ) : (
          <div
            className="spinner-border text-primary flex h-[33rem] w-[22.3rem] items-center justify-center"
            role="status"
          >
            <Notes
              title="No Favorite Searches Found"
              subtitle="You currently have no favorite searches. Once you mark searches as favorites, they will appear here."
            />
          </div>
        ))}
      {savedSearches.length > 0 && (
        <div className="3sm:translate-x-[unset] 3sm:position-unset absolute bottom-0 left-[50%] flex translate-x-[-50%] items-center">
          <PaginationComponent currentPage={currentPage} pageCount={recordsTotals} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  );
};

FavoriteSearchList.propTypes = FavoriteSearchListPropTypes;

export default FavoriteSearchList;
