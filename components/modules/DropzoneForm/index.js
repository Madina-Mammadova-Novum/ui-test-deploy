'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { DropzoneFormPropTypes } from '@/lib/types';

import {
  fileErrorAdapter,
  fileReaderAdapter,
  fileUpdateAdapter,
  multipleFileReaderAdapter,
} from '@/adapters/fileAdapter';
import { Input, Loader, TextArea } from '@/elements';
import { AVAILABLE_FORMATS, SETTINGS } from '@/lib/constants';
import { Dropzone, File } from '@/units';
import { updateFormats } from '@/utils/helpers';
import { useHookForm } from '@/utils/hooks';

const DropzoneForm = ({ showTextFields = true, dropzoneProps = {} }) => {
  const {
    register,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useHookForm();

  // Merge default dropzone props with passed props
  const defaultDropzoneProps = {
    multiple: false,
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
    accept: { files: AVAILABLE_FORMATS.DOCS },
  };

  const finalDropzoneProps = { ...defaultDropzoneProps, ...dropzoneProps };
  const isMultiple = finalDropzoneProps.multiple;

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const formats = updateFormats(AVAILABLE_FORMATS.DOCS);

  const fileErrorRef = useRef(null);

  useEffect(() => {
    const errorField = isMultiple ? 'files' : 'file';
    if (Object.keys(errors).length === 1 && errors?.[errorField]) {
      fileErrorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [errors, isMultiple]);

  // Watch for specific form field values and reset local state when form is reset
  const watchedFiles = watch('files');
  const watchedFile = watch('file');

  useEffect(() => {
    const fieldValue = isMultiple ? watchedFiles : watchedFile;

    // Reset local files state when form field is empty/null/undefined
    if (!fieldValue || (Array.isArray(fieldValue) && fieldValue.length === 0)) {
      setFiles([]);
    }
  }, [watchedFiles, watchedFile, isMultiple]);

  const resetDropzone = useCallback(() => {
    setFiles([]);
    if (isMultiple) {
      setValue('files', []);
      clearErrors('files');
    } else {
      setValue('file', null);
      clearErrors('file');
    }
  }, [setValue, clearErrors, isMultiple]);

  const onDrop = async (acceptedFiles, rejections) => {
    if (rejections.length > 0) {
      const errorField = isMultiple ? 'files' : 'file';
      setError(errorField, fileErrorAdapter({ data: rejections[0]?.errors }));
      resetDropzone();
    } else if (isMultiple) {
      // Handle multiple files
      const currentFiles = watch('files') || [];
      const updatedFiles = acceptedFiles.map(fileUpdateAdapter);
      setFiles([...files, ...updatedFiles]);

      await multipleFileReaderAdapter(acceptedFiles, setValue, setError, setLoading, currentFiles);
    } else {
      // Handle single file (original behavior)
      setFiles(acceptedFiles.map(fileUpdateAdapter));
      fileReaderAdapter(acceptedFiles[0], setValue, setError, setLoading);
    }
  };

  const onRemove = useCallback(
    (e, file) => {
      e.preventDefault();
      const newFiles = [...files].filter((el) => el.id !== file.id);

      if (newFiles.length > 0) {
        setFiles(newFiles);

        if (isMultiple) {
          const currentUploadedFiles = watch('files') || [];
          const updatedUploadedFiles = currentUploadedFiles.filter(
            (uploadedFile) => uploadedFile.originalFile?.name !== file.name
          );
          setValue('files', updatedUploadedFiles);
        } else {
          setValue('file', newFiles);
        }
      } else {
        resetDropzone();
        const errorField = isMultiple ? 'files' : 'file';
        clearErrors(errorField);
      }
    },
    [files, resetDropzone, setValue, clearErrors, isMultiple, watch]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    ...finalDropzoneProps,
  });

  const printFile = (file) => <File key={file.id} title={file?.path} onClick={(e) => onRemove(e, file)} />;

  const printHelpers = useMemo(() => {
    const maxFilesText = isMultiple ? ` | Max files: ${finalDropzoneProps.maxFiles}` : '';

    return (
      <div className="flex h-auto w-full justify-between gap-3 self-end py-2 text-xs-sm">
        <p>
          <span className="text-gray">Supports:</span> <span>{formats}</span>
        </p>
        <p className="flex gap-2 self-end whitespace-nowrap text-gray">
          Max size:{' '}
          <span>
            {SETTINGS.FILE_SIZE_RESTRICTION}MB{maxFilesText}
          </span>
        </p>
      </div>
    );
  }, [formats, isMultiple, finalDropzoneProps.maxFiles]);

  return (
    <div className="flex !min-h-[160px] flex-auto gap-5">
      {showTextFields && (
        <div className="flex flex-col gap-8">
          <Input
            {...register('title')}
            label="title"
            maxLength={46}
            helperText="Max: 46 symbols"
            placeholder="Enter the file title"
            error={errors?.title?.message}
          />

          <TextArea
            {...register('comment')}
            label="comment (optional)"
            placeholder="Type your Message here …"
            error={errors?.comment?.message}
          />
        </div>
      )}
      {!files.length ? (
        <Dropzone
          areaParams={getRootProps}
          inputParams={getInputProps}
          dropzoneRef={fileErrorRef}
          isMultiple={isMultiple}
        >
          {printHelpers}
        </Dropzone>
      ) : (
        <div className="relative flex h-auto w-full flex-wrap gap-x-3 gap-y-1 rounded-md border border-dashed border-gray-darker px-3 pt-5 hover:border-blue xl:gap-y-0">
          {loading && (
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-gray-light opacity-50">
              <Loader className="absolute left-[48%] top-[40%] h-8 w-8" />
            </div>
          )}
          {files.map(printFile)}
          {printHelpers}
        </div>
      )}
    </div>
  );
};

DropzoneForm.propTypes = DropzoneFormPropTypes;

export default DropzoneForm;
