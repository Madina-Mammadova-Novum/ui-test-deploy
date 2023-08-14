'use client';

import { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { DropZonePropTypes } from '@/lib/types';

import { fileReaderAdapter, fileUpdateAdapter } from '@/adapters/fileAdapter';
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
    formState: { errors },
  } = useHookForm();

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const formats = updateFormats(AVAILABLE_FORMATS.DOCS);

  const resetDropzone = useCallback(() => {
    setValue('file', null);
    setFiles([]);
  }, [setValue]);

  const onDrop = (acceptedFiles, rejections) => {
    if (rejections && rejections.length > 0) {
      setError('file', {
        type: 'manual',
        message: rejections && rejections[0].errors[0].message,
      });
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
      }
    },
    [files, resetDropzone, setValue]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: { files: AVAILABLE_FORMATS.DOCS },
  });

  const printFile = (file) => <File key={file.id} title={file?.path} onClick={(e) => onRemove(e, file)} />;

  const printHelpers = useMemo(() => {
    return (
      <div className="flex gap-3 h-auto self-end w-full justify-between py-2 text-xs-sm">
        <p>
          <span className="text-gray">Supports:</span> <span>{formats}</span>
        </p>
        <p className="flex gap-2 text-gray whitespace-nowrap self-end">
          Max size: <span>{SETTINGS.FILE_SIZE_RESTRICTION}MB</span>
        </p>
      </div>
    );
  }, [formats]);

  return (
    <div className="flex flex-auto gap-5 !min-h-[160px]">
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

          <TextArea {...register('comment')} label="comment (optional)" placeholder="Type your Message here …" />
        </div>
      )}
      {!files.length ? (
        <Dropzone areaParams={getRootProps} inputParams={getInputProps}>
          {printHelpers}
        </Dropzone>
      ) : (
        <div className="flex flex-wrap w-full h-auto gap-x-3 gap-y-0 border-dashed border hover:border-blue border-gray-darker relative rounded-md pt-5 px-3">
          {loading && (
            <div className="absolute top-0 right-0 left-0 bottom-0 bg-gray-light opacity-50">
              <Loader className="h-8 w-8 absolute top-[40%] left-[48%]" />
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
