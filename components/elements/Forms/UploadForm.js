import { useEffect, useMemo, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';

// import PropTypes from 'prop-types';

import { ArrowIcon } from '@/assets/Icons';
import { Button, Dropzone, File, Input, TextArea } from '@/elements';
import { options } from '@/utils/formOptions';

const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [toggle, setToggle] = useState(false);

  const contentRef = useRef(null);

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(options.upload);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => setValue('file', files[0]),
  });

  useEffect(() => {
    setSelectedFile(acceptedFiles[0]);
  }, [acceptedFiles]);

  const setClear = (callback) => {
    setValue('file', []);
    setSelectedFile(null);
    callback();
  };

  const handleToggle = () => setToggle((prev) => !prev);

  const onSubmit = async (data) => {
    setClear(reset);

    return { data };
  };

  const setTextCta = useMemo(() => {
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
        <button type="button" className="flex items-center gap-2 text-blue font-medium text-xsm" onClick={handleToggle}>
          {setTextCta} <ArrowIcon fill="blue" className={`${toggle && 'rotate-180'}`} />
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
          {!selectedFile ? (
            <Dropzone areaParams={getRootProps} inputParams={getInputProps} />
          ) : (
            <div className="w-full h-auto border-dashed border hover:border-blue border-gray-darker relative rounded-md p-5">
              <File title={selectedFile?.path} onClick={setClear} />
            </div>
          )}
        </div>

        <Button
          type="submit"
          customStyles="flex self-end"
          buttonProps={{ text: 'Upload', variant: 'secondary', size: 'large' }}
        />
      </form>
    </div>
  );
};

UploadForm.propTypes = {};

export default UploadForm;
