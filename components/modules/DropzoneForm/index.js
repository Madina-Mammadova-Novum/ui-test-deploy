'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { DropZonePropTypes } from '@/lib/types';

import { fileErrorAdapter, fileReaderAdapter, fileUpdateAdapter } from '@/adapters/fileAdapter';
import { Input, Loader, TextArea } from '@/elements';
import { AVAILABLE_FORMATS, SETTINGS } from '@/lib/constants';
import { Dropzone, File } from '@/units';
import { updateFormats } from '@/utils/helpers';
import { useHookForm } from '@/utils/hooks';

const DropzoneForm = ({ showTextFields = true }) => {
  const {
    register,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useHookForm();

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const formats = updateFormats(AVAILABLE_FORMATS.DOCS);

  const fileErrorRef = useRef(null);

  useEffect(() => {
    if (Object.keys(errors).length === 1 && errors?.file) {
      fileErrorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [errors]);

  useEffect(() => {
    if (!watch('file')) setFiles([]);
  }, [watch('file')]);

  const resetDropzone = useCallback(() => {
    setFiles([]);
    setValue('file', null);
  }, [setValue, setError]);

  const onDrop = (acceptedFiles, rejections) => {
    if (rejections.length > 0) {
      setError('file', fileErrorAdapter({ data: rejections[0]?.errors }));
      resetDropzone();
    } else {
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
        setValue('file', newFiles);
      } else {
        resetDropzone();
        clearErrors('file');
      }
    },
    [files, resetDropzone, setValue, clearErrors]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
    accept: { files: AVAILABLE_FORMATS.DOCS },
  });

  const printFile = (file) => <File key={file.id} title={file?.path} onClick={(e) => onRemove(e, file)} />;

  const printHelpers = useMemo(() => {
    return (
      <div className="flex h-auto w-full justify-between gap-3 self-end py-2 text-xs-sm">
        <p>
          <span className="text-gray">Supports:</span> <span>{formats}</span>
        </p>
        <p className="flex gap-2 self-end whitespace-nowrap text-gray">
          Max size: <span>{SETTINGS.FILE_SIZE_RESTRICTION}MB</span>
        </p>
      </div>
    );
  }, [formats]);

  return (
    <div className="flex !min-h-[160px] flex-auto gap-5">
      {showTextFields && (
        <div className="flex flex-col gap-8">
          <Input
            {...register('title')}
            label="title"
            maxlength={46}
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
        <Dropzone areaParams={getRootProps} inputParams={getInputProps} dropzoneRef={fileErrorRef}>
          {printHelpers}
        </Dropzone>
      ) : (
        <div className="relative flex h-auto w-full flex-wrap gap-x-3 gap-y-0 rounded-md border border-dashed border-gray-darker px-3 pt-5 hover:border-blue">
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

DropzoneForm.propTypes = DropZonePropTypes;

export default DropzoneForm;
