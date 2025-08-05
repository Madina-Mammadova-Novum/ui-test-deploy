'use client';

import { useCallback, useEffect, useState } from 'react';

import { TankerSlotsPropTypes } from '@/lib/types';

import { fileReaderAdapter } from '@/adapters/fileAdapter';
import CloseSVG from '@/assets/images/close.svg';
import PlusSVG from '@/assets/images/plusCircle.svg';
import TrashAltSVG from '@/assets/images/trashAlt.svg';
import UploadSVG from '@/assets/images/upload.svg';
import { Button, Input } from '@/elements';
import { SETTINGS } from '@/lib/constants';
import { useHookForm } from '@/utils/hooks';

const TankerSlotsDetails = ({ applyHelper = false }) => {
  const {
    register,
    unregister,
    setValue,
    clearErrors,
    watch,
    setError,
    getValues,
    formState: { errors, isSubmitting },
  } = useHookForm();

  const [slotsState, setSlotsState] = useState({
    tankersCount: 0,
    tankers: [],
  });

  const [helperText, setHelperText] = useState('');
  const [uploadingStates, setUploadingStates] = useState({});
  const isApplied = watch('applySlots');

  const { tankersCount, tankers } = slotsState;

  const handleChangeState = (key, value) =>
    setSlotsState((prevState) => ({
      ...prevState,
      [key]: value,
    }));

  const handleSlotsCount = (event) => {
    clearErrors('numberOfTankers');

    let numberOfTankers = Number(event.target.value);

    if (numberOfTankers <= 0) {
      numberOfTankers = '';
      unregister('vessels');
      setValue('applySlots', false);
      handleChangeState('tankers', []);
    }

    if (event.target.value && applyHelper) {
      setHelperText('Please click Apply');
    } else {
      setHelperText('');
    }

    setValue('numberOfTankers', numberOfTankers);
    handleChangeState('tankersCount', numberOfTankers);
  };

  const handleApplySlot = () => {
    const nextTankersCount =
      tankersCount > SETTINGS.MAX_NUMBER_OF_TANKERS ? SETTINGS.MAX_NUMBER_OF_TANKERS : tankersCount;

    // Clear apply slots errors
    clearErrors('applySlots');
    clearErrors('vessels');

    // Completely unregister the entire vessels array to avoid sparse arrays
    unregister('vessels');

    // Clear uploading states for all tankers since we're starting fresh
    setUploadingStates({});

    // Use sequential indices (0, 1, 2, 3...) instead of tanker IDs (1, 2, 3, 4...)
    const newTankers = Array.from({ length: nextTankersCount }, (_, index) => index);

    // Initialize form fields for new tankers using sequential indices
    newTankers.forEach((index) => {
      setValue(`vessels[${index}].imo`, '');
      setValue(`vessels[${index}].q88FileUrl`, '');
    });

    handleChangeState('tankers', newTankers);
  };

  const handleAddSlot = () => {
    clearErrors('applySlots');

    // Add one more tanker using sequential index
    const newIndex = tankers.length;
    const newTankers = [...tankers, newIndex];

    // Initialize form fields for the new tanker
    setValue(`vessels[${newIndex}].imo`, '');
    setValue(`vessels[${newIndex}].q88FileUrl`, '');

    handleChangeState('tankers', newTankers);
  };

  const handleRemoveSlot = (indexToRemove) => {
    // Get current form values before removing
    const currentVessels = getValues('vessels') || [];

    // Remove the tanker at the specified index
    const newTankers = tankers.filter((_, index) => index !== indexToRemove);

    // Create new vessels array by filtering out the removed index and reindexing
    const newVessels = currentVessels
      .filter((_, index) => index !== indexToRemove)
      .map((vessel) => vessel || { imo: '', q88FileUrl: '' });

    // Completely rebuild the vessels array to avoid gaps
    unregister('vessels');

    // Set the new vessels array with preserved values
    setValue('vessels', newVessels);

    clearErrors(`vessels`);

    // Update uploading states to match new indices
    const newUploadingStates = {};
    Object.keys(uploadingStates).forEach((oldIndex) => {
      const oldIndexNum = parseInt(oldIndex, 10);
      if (oldIndexNum < indexToRemove) {
        // Indices before the removed one stay the same
        newUploadingStates[oldIndexNum] = uploadingStates[oldIndex];
      } else if (oldIndexNum > indexToRemove) {
        // Indices after the removed one shift down by 1
        newUploadingStates[oldIndexNum - 1] = uploadingStates[oldIndex];
      }
      // The removed index is excluded
    });
    setUploadingStates(newUploadingStates);

    handleChangeState('tankers', newTankers);
  };

  const handleFileUpload = useCallback(
    (index, file) => {
      if (!file) return;

      setUploadingStates((prev) => ({ ...prev, [index]: true }));

      const customSetValue = (key, value) => {
        if (key === 'file' && value) {
          setValue(`vessels[${index}].q88FileUrl`, value);
          clearErrors(`vessels[${index}].q88FileUrl`);
        }
      };

      const customSetError = (key, error) => {
        if (key === 'file' && error) {
          setError(`vessels[${index}].q88FileUrl`, error);
        }
      };

      const customSetLoading = (loading) => {
        setUploadingStates((prev) => ({ ...prev, [index]: loading }));
      };

      fileReaderAdapter(file, customSetValue, customSetError, customSetLoading);
    },
    [setValue, clearErrors, setError]
  );

  const handleFileRemove = useCallback(
    (index) => {
      setValue(`vessels[${index}].q88FileUrl`, '');
      clearErrors(`vessels[${index}].q88FileUrl`);
    },
    [setValue, clearErrors]
  );

  const getFileName = (index) => {
    const fileUrl = watch(`vessels[${index}].q88FileUrl`);
    if (!fileUrl) return null;

    // Extract filename from URL (assuming it's the last part after the last slash)
    const parts = fileUrl.split('/');
    return parts[parts.length - 1] || 'Uploaded file';
  };

  useEffect(() => {
    const numberOfTankers = tankers.length > 0 ? tankers.length : null;

    setValue('numberOfTankers', numberOfTankers);
    setValue('applySlots', Boolean(numberOfTankers));

    if (isApplied) setHelperText('');

    handleChangeState('tankersCount', numberOfTankers);
  }, [tankers, setValue, isApplied]);

  return (
    <div className="grid gap-5">
      <div className="!relative flex w-full flex-wrap gap-x-4 gap-y-2">
        <Input
          {...register('numberOfTankers')}
          type="number"
          value={tankersCount}
          label="Number of tankers"
          labelBadge="*"
          customStyles="z-10 w-1/2"
          onChange={handleSlotsCount}
          error={errors.numberOfTankers?.message || errors.applySlots?.message}
          helperText={helperText}
          disabled={isSubmitting}
        />
        <Input {...register('applySlots')} disabled={isSubmitting} type="hidden" />
        <Button
          type="button"
          customStylesFromWrap="!justify-end"
          customStyles="h-[2.375rem]"
          buttonProps={{ text: 'Apply', variant: !errors.numberOfTankers ? 'primary' : 'delete', size: 'medium' }}
          onClick={handleApplySlot}
          disabled={tankersCount <= 0 || isSubmitting}
        />
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {tankers.map((_, index) => {
          const fieldName = `vessels[${index}]`;
          const imoError = errors.vessels ? errors.vessels[index]?.imo : null;
          const fileError = errors.vessels ? errors.vessels[index]?.q88FileUrl : null;
          const isUploading = uploadingStates[index];
          const fileName = getFileName(index);

          return (
            // eslint-disable-next-line react/no-array-index-key
            <div key={`vessel-form-${index}`} className="relative rounded-lg border border-gray-200 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900">Vessel #{index + 1}</h4>
                <Button
                  type="button"
                  customStyles="!p-1"
                  buttonProps={{
                    icon: { before: <TrashAltSVG viewBox="0 0 24 24" className="h-4 w-4 fill-red-500" /> },
                    variant: 'tertiary',
                    size: 'small',
                  }}
                  onClick={() => handleRemoveSlot(index)}
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-3">
                <Input
                  {...register(`${fieldName}.imo`, {
                    onChange: (e) => {
                      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 7);
                    },
                  })}
                  label="IMO Number"
                  labelBadge="*"
                  placeholder="Enter IMO"
                  error={imoError?.message}
                  disabled={isSubmitting}
                  maxLength={7}
                  type="text"
                />

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Q88 File <span className="text-red-500">*</span>
                  </label>

                  {!fileName ? (
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.xls,.xlsx"
                        onChange={(e) => handleFileUpload(index, e.target.files[0])}
                        className="hidden"
                        id={`file-upload-${index}`}
                        disabled={isSubmitting || isUploading}
                      />
                      <label
                        htmlFor={`file-upload-${index}`}
                        className={`flex w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed px-4 py-2 transition-colors ${
                          fileError
                            ? 'border-red-300 bg-red-50 hover:border-red-400'
                            : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'
                        } ${isSubmitting || isUploading ? 'cursor-not-allowed opacity-50' : ''}`}
                      >
                        <div className="flex items-center space-x-2">
                          <UploadSVG className={`h-5 w-5 ${fileError ? 'fill-red-400' : 'fill-gray-400'}`} />
                          <span className={`text-sm ${fileError ? 'text-red-600' : 'text-gray-600'}`}>
                            {isUploading ? 'Uploading...' : 'Upload Q88 File'}
                          </span>
                        </div>
                      </label>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between rounded-md border border-green-200 bg-green-50 p-3">
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="max-w-[200px] truncate text-sm font-medium text-green-700" title={fileName}>
                          {fileName}
                        </span>
                      </div>
                      <Button
                        type="button"
                        customStyles="!p-1"
                        buttonProps={{
                          icon: { before: <CloseSVG className="h-6 w-6 fill-red-500" /> },
                          variant: 'tertiary',
                          size: 'small',
                        }}
                        onClick={() => handleFileRemove(index)}
                        disabled={isSubmitting}
                      />
                    </div>
                  )}

                  {fileError && <p className="mt-1 text-xs-sm text-red-600">{fileError.message}</p>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {tankers.length > 0 && (
        <div className="mb-5 flex justify-between">
          <Button
            buttonProps={{
              text: 'Add more tankers',
              helperText: `(max ${SETTINGS.MAX_NUMBER_OF_TANKERS} tankers)`,
              variant: 'tertiary',
              size: 'small',
              icon: { before: <PlusSVG className="fill-blue" /> },
            }}
            type="button"
            customStyles="!py-0 !px-0 !text-xsm font-medium !text-blue"
            disabled={tankers?.length >= SETTINGS.MAX_NUMBER_OF_TANKERS}
            onClick={handleAddSlot}
          />
        </div>
      )}
    </div>
  );
};

TankerSlotsDetails.propTypes = TankerSlotsPropTypes;

export default TankerSlotsDetails;
