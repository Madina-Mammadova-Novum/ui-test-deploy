'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';

// import { fileReaderAdapter, fileUpdateAdapter } from '@/adapters/fileAdapter';
import Dropzone from './Dropzone';
import File from './File';

import AngleDownSVG from '@/assets/images/angleDown.svg';
import UploadSVG from '@/assets/images/upload.svg';
import { Button, Input, TextArea } from '@/elements';
import { AVAILABLE_FORMATS, SETTINGS } from '@/lib/constants';
// import { options } from '@/utils/formOptions';
import { makeId, updateFormats } from '@/utils/helpers';

const UploadForm = () => {
  const [files, setFiles] = useState([]);
  const [toggle, setToggle] = useState(false);

  const contentRef = useRef(null);
  const formats = updateFormats(AVAILABLE_FORMATS.DOCS);

  const fileUpdateAdapter = (file) => ({
    id: makeId(),
    preview: URL.createObjectURL(file),
    ...file,
  });

  const fileReaderAdapter = (file, cb) => {
    const reader = new window.FileReader();
    reader.onabort = () => {
      throw new Error('aboated');
    };
    reader.onerror = () => {
      throw new Error('error');
    };
    reader.readAsDataURL(file);
    reader.onloadend = () => cb();
  };

  const {
    register,
    setValue,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isDirty },
  } = useForm();

  const handleToggle = () => setToggle((prev) => !prev);
  const resetDropzone = useCallback(() => {
    setValue('files', []);
    setFiles([]);
  }, [setValue]);

  const onDrop = (acceptedFiles, rejections) => {
    if (rejections && rejections.length > 0) {
      setError('files', {
        type: 'manual',
        message: rejections && rejections[0].errors[0].message,
      });
      resetDropzone();
    } else {
      setFiles(acceptedFiles.map(fileUpdateAdapter));
      acceptedFiles.forEach(fileReaderAdapter(setValue('files', acceptedFiles, { shouldValidate: true })));
    }
  };
  const onRemove = useCallback(
    (e, file) => {
      e.preventDefault();
      const newFiles = [...files].filter((el) => el.id !== file.id);
      if (newFiles.length > 0) {
        setFiles(newFiles);
        setValue('files', newFiles);
      } else {
        resetDropzone();
      }
    },
    [files, resetDropzone, setValue]
  );

  const onSubmit = async (data) => {
    reset();
    resetDropzone();
    return data;
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      files: AVAILABLE_FORMATS.DOCS,
    },
  });

  const printFileTemplate = useCallback(
    (file) => <File key={file.id} title={file?.path} onClick={(e) => onRemove(e, file)} />,
    [onRemove]
  );

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

  const printTextCta = useMemo(() => {
    switch (toggle) {
      case true:
        return 'Hide';
      default:
        return 'Show';
    }
  }, [toggle]);

  return (
    <div
      className="box-border transition-all pt-5 pb-3 duration-500 overflow-hidden rounded-lg border border-solid border-grey-darker px-5 py-3"
      ref={contentRef}
      style={{ height: toggle ? `${contentRef?.current?.scrollHeight}px` : '64px' }}
    >
      <div className="flex justify-between">
        <h5 className="text-sm text-black font-semibold">Upload a new file</h5>
        <button
          type="button"
          className={`flex items-center gap-1 text-black ${toggle && 'text-blue'} font-medium text-xsm`}
          onClick={handleToggle}
        >
          {printTextCta} <AngleDownSVG className={`fill-black ${toggle && 'rotate-180 fill-blue'}`} />
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-col gap-2.5 transition-all pt-5 duration-500 ${
          toggle ? 'opacity-100' : 'py-0 opacity-0'
        }`}
      >
        <div className="flex flex-auto gap-5">
          <div className="flex flex-col gap-8">
            <Input
              type="text"
              name="title"
              helperText="Max: 46 symbols"
              maxlength="46"
              label="title"
              placeholder="Enter the file title"
              error={errors?.title?.message}
              register={register}
              required
            />

            <TextArea
              type="text"
              name="comment"
              label="COMMENT (OPTIONAL)"
              placeholder="Type your Message here …"
              register={register}
            />
          </div>
          {files.length <= 0 ? (
            <Dropzone
              areaParams={getRootProps}
              inputParams={getInputProps}
              error={errors?.file?.message}
              formats={formats}
            >
              {printHelpers}
            </Dropzone>
          ) : (
            <div className="flex flex-wrap w-full h-auto gap-x-3 gap-y-0 border-dashed border hover:border-blue border-gray-darker relative rounded-md pt-5 px-3">
              {files.map(printFileTemplate)}
              {printHelpers}
            </div>
          )}
        </div>

        <Button
          type="submit"
          customStyles="flex self-end"
          buttonProps={{
            text: 'Upload file',
            variant: 'secondary',
            size: 'large',
            icon: { before: <UploadSVG className="fill-white" /> },
          }}
          disabled={!isDirty}
        />
      </form>
    </div>
  );
};

UploadForm.propTypes = {};

export default UploadForm;
