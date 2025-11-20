'use client';

import { useEffect, useRef, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useSelector } from 'react-redux';

import * as yup from 'yup';

import { SearchFormPropTypes } from '@/lib/types';

import { FormManager } from '@/common';
import { Button, Modal } from '@/elements';
import { captchaSchema, searchForTankerSchema } from '@/lib/schemas';
import { getSearchSelector } from '@/store/selectors';
import { FavoriteSearchForm, FavoriteSearchList, SearchFormFields } from '@/units';
import { resetForm, shouldShowCaptcha } from '@/utils/helpers';
import { useHookFormParams } from '@/utils/hooks';

const SearchForm = ({ onSubmit, onReset, isLoading = false, isAccountSearch = false }) => {
  const { searchParams } = useSelector(getSearchSelector);

  const [productState, setProductState] = useState(searchParams?.productsByIndex || [0]);
  const [isAddFavoriteOpened, setIsAddFavoriteOpened] = useState(false);
  const [isViewFavoriteSearchesOpened, setIsViewFavoriteSearchesOpened] = useState(false);
  const captchaRef = useRef(null);

  const schema = yup.object({
    ...searchForTankerSchema(),
    ...(isAccountSearch || !shouldShowCaptcha() ? {} : captchaSchema()),
  });
  const methods = useHookFormParams({ schema, state: searchParams });

  const handleResetFields = () => {
    // Set initial values for additional discharge form fields
    methods.setValue('additionalDischargeOptions', {});
    methods.setValue('sanctionedCountries', []);
    methods.setValue('excludedCountries', []);
    methods.setValue('excludeInternationallySanctioned', false);
    methods.setValue('showAdditionalDischarge', false);

    // Reset captcha only if not account search and captcha should be shown
    if (!isAccountSearch && shouldShowCaptcha()) {
      methods.setValue('captcha', null);

      // Reset the captcha using the ref
      if (captchaRef.current) {
        captchaRef.current.reset();
      }
    }

    resetForm(methods);
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
    // Use handleSubmit to properly trigger validation and update submitCount
    await methods.handleSubmit(
      // On valid form
      () => {
        handleOpenModal(null, 'addFavorite');
      },
      // On invalid form - do nothing, errors will show
      () => {}
    )();
  };

  const handleViewFavoriteSearches = () => {
    handleOpenModal(null, 'viewFavorites');
  };

  useEffect(() => {
    if (searchParams) {
      methods.reset(searchParams);

      if (searchParams?.productsByIndex && (searchParams?.isSavedSearch || searchParams?.isAlternative))
        setProductState(searchParams?.productsByIndex);
    }
  }, [searchParams]);

  return (
    <div className="relative mt-5 w-full rounded-base bg-white px-4 py-8 shadow-2xmd md:px-5 3md:px-7 3md:py-9">
      <Modal opened={isAddFavoriteOpened} onClose={handleCloseModal}>
        <FavoriteSearchForm title="Add to Favorites" state={searchFormData} closeModal={handleCloseModal} />
      </Modal>

      <Modal
        opened={isViewFavoriteSearchesOpened}
        onClose={handleCloseModal}
        containerClass="h-full 3md:h-auto 3md:overflow-y-auto"
      >
        <FavoriteSearchList onClose={handleCloseModal} />
      </Modal>

      <FormProvider {...methods}>
        <FormManager
          submitAction={(formData) => onSubmit(formData)}
          submitButton={{
            text: 'Show results',
            variant: 'primary',
            size: 'large',
            className: '!w-max ml-auto !text-white',
            disabled: isLoading,
          }}
          className={`${isAccountSearch ? 'gap-20 md:gap-5' : 'gap-5'} flex flex-col`}
        >
          <SearchFormFields
            productState={productState}
            setProductState={setProductState}
            captchaRef={captchaRef}
            isAccountSearch={isAccountSearch}
          />
          {/* relative mt-5 w-full rounded-base bg-white px-4 py-8 shadow-2xmd md:px-5 3md:px-7 3md:py-9 */}
          {isAccountSearch && (
            <div className="absolute bottom-[5.5rem] right-5 flex flex-col items-end gap-4 md:bottom-[2.375rem] md:left-5 md:right-0 md:w-96 md:flex-row 3md:bottom-[2.625rem] 3md:left-7">
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
          <div className="absolute bottom-8 right-40 3md:bottom-9">
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
