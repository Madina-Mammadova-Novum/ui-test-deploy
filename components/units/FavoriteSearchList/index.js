'use client';

import React, { useEffect, useState } from 'react';

import { UisAngleDoubleRight, UisFavorite, UisObjectGroup, UisSchedule } from '@iconscout/react-unicons-solid';

import PaginationComponent from '../PaginationComponent';

import BellSVG from '@/assets/images/bell.svg';
import { Button, Loader, TextWithLabel, Title } from '@/elements';
import { getSavedSearches } from '@/services/savedSearch';
import { Notes } from '@/units';
import { transformDate } from '@/utils/date';
import { calculateAmountOfPages } from '@/utils/helpers';
import { errorToast, useFilters } from '@/utils/hooks';

const FavoriteSearchList = () => {
  const [savedSearches, setSavedSearches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recordsTotals, setRecordsTotals] = useState(0);

  const { currentPage, handlePageChange, perPage } = useFilters({
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
      recordsFiltered,
      recordsTotal,
    } = await getSavedSearches({
      skip,
      pageSize,
    });

    if (status === 200) {
      setSavedSearches([...searchResponse]);
      const totalPages = calculateAmountOfPages(recordsTotal, recordsFiltered);
      setRecordsTotals(totalPages || 0);
      setIsLoading(false);
    } else if (error) {
      setIsLoading(false);
      errorToast(error?.title, error?.message);
    }
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
          className="spinner-border text-primary flex h-[36rem] w-[22.1875rem] items-center justify-center"
          role="status"
        >
          <Loader className="size-16" />
        </div>
      )}

      {!isLoading &&
        (savedSearches.length > 0 ? (
          savedSearches?.map(({ name, dischargePort, loadPort, cargoTypeName, laycanStart, laycanEnd }) => (
            <div className="flex w-full flex-col items-center justify-center rounded-lg border p-4 shadow-xmd">
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
                    text={loadPort.locode}
                    countryCode={loadPort.countryCodeISO2}
                  />
                  <UisAngleDoubleRight size="60" color="#072d46" />
                  <TextWithLabel
                    customStyles="!max-w-[6.625rem] !w-full"
                    textGroupStyle="!text-base"
                    text={dischargePort.locode}
                    countryCode={dischargePort.countryCodeISO2}
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
                    {cargoTypeName}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button
                  customStyles="px-1 py-6 lg:px-3.5 lg:py-2.5"
                  buttonProps={{ text: 'Use Search', size: 'medium', variant: 'primary' }}
                />
                <Button
                  customStyles="px-1 py-6 lg:px-3.5 lg:py-2.5"
                  buttonProps={{ text: 'Delete Search', size: 'medium', variant: 'delete' }}
                />
                <Button
                  customStyles="px-1 py-6 lg:px-3.5 lg:py-2.5"
                  buttonProps={{
                    icon: { before: <BellSVG size="30" /> },
                    size: 'medium',
                    variant: 'tertiary',
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <div
            className="spinner-border text-primary flex h-[36rem] w-[22.1875rem] items-center justify-center"
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

export default FavoriteSearchList;
