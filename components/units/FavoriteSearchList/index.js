'use client';

import React, { useEffect, useState } from 'react';

import { UisAngleDoubleRight, UisFavorite, UisObjectGroup, UisSchedule } from '@iconscout/react-unicons-solid';

import PaginationComponent from '../PaginationComponent';

import { Button, Loader, TextWithLabel, Title } from '@/elements';
import { getSavedSearches } from '@/services/savedSearch';
import { transformDate } from '@/utils/date';
import { errorToast } from '@/utils/hooks';

const FavoriteSearchList = () => {
  const [savedSearches, setSavedSearches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const initFetch = async () => {
    setIsLoading(true);
    const { data, status, error } = await getSavedSearches({});

    if (status === 200) {
      setIsLoading(false);
      setSavedSearches([...data]);
    }

    setIsLoading(false);

    if (error) {
      errorToast(error?.title, error?.message);
    }
  };
  useEffect(() => {
    initFetch();
  }, []);
  return (
    <div className="relative flex flex-col gap-4 pb-16">
      <Title level="2" className="mb-2 flex items-center gap-2 text-lg font-bold capitalize text-black">
        <UisFavorite size="24" color="#072d46" />
        Favorite Searches
      </Title>

      {isLoading && (
        <div className="spinner-border text-primary" role="status">
          <Loader className="size-10" />
        </div>
      )}
      {!isLoading &&
        savedSearches.map(({ name, dischargePort, loadPort, cargoTypeName, laycanStart, laycanEnd }) => (
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
                <UisAngleDoubleRight size="75" color="#072d46" />
                <TextWithLabel
                  customStyles="!max-w-[6.625rem] !w-full"
                  textGroupStyle="!text-base"
                  text={dischargePort.locode}
                  countryCode={dischargePort.countryCodeISO2}
                />
              </div>

              <div className="flex items-center gap-4">
                <span>{transformDate(laycanStart, 'MMM dd, yyyy')}</span>
                <UisSchedule size="30" color="#072d46" />

                <span>{transformDate(laycanEnd, 'MMM dd, yyyy')}</span>
              </div>

              <div className="mt-2 flex gap-1">
                <span className="flex items-center justify-center gap-2 rounded-full border border-solid border-black p-3 text-black">
                  <UisObjectGroup size="30" color="#072d46" />
                  {cargoTypeName}
                </span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Button buttonProps={{ text: 'Run', size: 'medium', variant: 'primary' }} />
              <Button buttonProps={{ text: 'Delete Search', size: 'medium', variant: 'delete' }} />
            </div>
          </div>
        ))}

      <div className="3sm:translate-x-[unset] 3sm:position-unset absolute bottom-0 left-[50%] flex translate-x-[-50%] items-center">
        <PaginationComponent currentPage={1} pageCount={5} />
      </div>
    </div>
  );
};

export default FavoriteSearchList;
