'use client';

import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useSelector } from 'react-redux';

import * as yup from 'yup';

import { SearchFormPropTypes } from '@/lib/types';

import { FormManager } from '@/common';
import { Button, Modal } from '@/elements';
import { searchForTankerSchema } from '@/lib/schemas';
import { getSearchSelector } from '@/store/selectors';
import { FavoriteSearchForm, FavoriteSearchList, SearchFormFields } from '@/units';
import { resetObjectFields } from '@/utils/helpers';
import { useHookFormParams } from '@/utils/hooks';

const SearchForm = ({ onSubmit, onReset, isLoading = false, isAccountSearch = false }) => {
  const { prefilledSearchData } = useSelector(getSearchSelector);

  const [productState, setProductState] = useState(prefilledSearchData?.productsByIndex || [0]);
  const [isAddFavoriteOpened, setIsAddFavoriteOpened] = useState(false);
  const [isViewFavoriteSearchesOpened, setIsViewFavoriteSearchesOpened] = useState(false);

  const schema = yup.object({ ...searchForTankerSchema() });
  const methods = useHookFormParams({ schema, state: prefilledSearchData });

  const handleResetFields = () => {
    methods.reset((formValues) => {
      resetObjectFields(formValues);
      return formValues;
    });

    onReset();
    setProductState([0]);
  };

  const handleOpenModal = (e, modalType) => {
    e?.stopPropagation();

    if (modalType === 'addFavorite') {
      setIsAddFavoriteOpened(true);
      setIsViewFavoriteSearchesOpened(false);
    } else if (modalType === 'viewFavorites') {
      setIsAddFavoriteOpened(false);
      setIsViewFavoriteSearchesOpened(true);
    }
  };

  const handleCloseModal = (e) => {
    e?.stopPropagation();
    setIsAddFavoriteOpened(false);
    setIsViewFavoriteSearchesOpened(false);
  };

  const searchFormData = methods.getValues();

  const handleMarkAsFavorite = async () => {
    const isValid = await methods.trigger();

    if (isValid) {
      handleOpenModal(null, 'addFavorite');
    }
  };

  const handleViewFavoriteSearches = () => {
    handleOpenModal(null, 'viewFavorites');
  };
  return (
    <div className="relative mt-5 w-full rounded-base bg-white p-5 shadow-2xmd">
      <Modal opened={isAddFavoriteOpened} onClose={handleCloseModal}>
        <FavoriteSearchForm title="Add to Favorites" state={searchFormData} closeModal={handleCloseModal} />
      </Modal>

      <Modal opened={isViewFavoriteSearchesOpened} onClose={handleCloseModal}>
        <FavoriteSearchList />
      </Modal>

      <FormProvider {...methods}>
        <FormManager
          submitAction={(formData) => onSubmit(formData)}
          submitButton={{
            text: 'Show results',
            variant: 'secondary',
            size: 'large',
            className: '!w-max ml-auto !text-white',
            disabled: isLoading,
          }}
          className={`${isAccountSearch ? 'gap-20 sm:gap-9 md:gap-5' : 'gap-5'} flex flex-col`}
        >
          <SearchFormFields productState={productState} setProductState={setProductState} />
          {isAccountSearch && (
            <div className="absolute bottom-[4.5rem] right-5 flex flex-col items-end gap-4 sm:flex-row md:bottom-6 md:left-5 md:right-0 md:w-96">
              <Button
                buttonProps={{ text: 'Mark as Favorite', variant: 'primary', size: 'medium' }}
                onClick={handleMarkAsFavorite}
              />
              <Button
                buttonProps={{ text: 'View Favorite Searches', variant: 'primary', size: 'medium' }}
                onClick={handleViewFavoriteSearches}
              />
            </div>
          )}
          <div className="absolute bottom-5 right-40">
            <Button
              buttonProps={{ text: 'Reset all', variant: 'primary', size: 'small' }}
              onClick={handleResetFields}
            />
          </div>
        </FormManager>
      </FormProvider>
    </div>
  );
};

SearchForm.propTypes = SearchFormPropTypes;

export default SearchForm;
