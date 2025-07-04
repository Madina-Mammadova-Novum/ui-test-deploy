'use client';

import { useCallback, useState } from 'react';

import PropTypes from 'prop-types';

import { fileReaderAdapter } from '@/adapters/fileAdapter';
import CloseSVG from '@/assets/images/close.svg';
import UploadSVG from '@/assets/images/upload.svg';
import { Button, Label } from '@/elements';

const Q88FileUpload = ({ setValue, clearErrors, setError, watch, error, disabled = false, name = 'file' }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = useCallback(
    (file) => {
      if (!file) return;

      setIsUploading(true);

      const customSetValue = (key, value) => {
        if (key === 'file' && value) {
          setValue(name, value);
          clearErrors(name);
        }
      };

      const customSetError = (key, errorObj) => {
        if (key === 'file' && errorObj) {
          setError(name, errorObj);
        }
      };

      const customSetLoading = (loading) => {
        setIsUploading(loading);
      };

      fileReaderAdapter(file, customSetValue, customSetError, customSetLoading);
    },
    [setValue, clearErrors, setError, name]
  );

  const handleFileRemove = useCallback(() => {
    setValue(name, '');
    clearErrors(name);
  }, [setValue, clearErrors, name]);

  const getFileName = () => {
    const fileUrl = watch(name);
    if (!fileUrl) return null;

    // Extract filename from URL (assuming it's the last part after the last slash)
    const parts = fileUrl.split('/');
    return parts[parts.length - 1] || 'Uploaded file';
  };

  const fileName = getFileName();

  return (
    <div>
      <Label name={name} className="mb-0.5 flex flex-wrap items-center gap-1 whitespace-nowrap text-left text-xs-sm">
        Q88 File <span className="text-gray">*</span>
      </Label>

      {!fileName ? (
        <div className="relative">
          <input
            type="file"
            accept=".pdf,.doc,.docx,.xls,.xlsx"
            onChange={(e) => handleFileUpload(e.target.files[0])}
            className="hidden"
            id="q88-file-upload"
            disabled={disabled || isUploading}
          />
          <label
            htmlFor="q88-file-upload"
            className={`flex w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed px-4 py-2 transition-colors ${
              error
                ? 'border-red-300 bg-red-50 hover:border-red-400'
                : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'
            } ${disabled || isUploading ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            <div className="flex items-center space-x-2">
              <UploadSVG className={`h-5 w-5 ${error ? 'fill-red-400' : 'fill-gray-400'}`} />
              <span className={`text-sm ${error ? 'text-red-600' : 'text-gray-600'}`}>
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
            onClick={handleFileRemove}
            disabled={disabled}
          />
        </div>
      )}

      {error && <p className="mt-1 text-xs-sm text-red-600">{error}</p>}
    </div>
  );
};

Q88FileUpload.propTypes = {
  setValue: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
};

export default Q88FileUpload;
