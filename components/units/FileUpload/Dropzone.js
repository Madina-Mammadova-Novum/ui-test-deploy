import { DropZonePropTypes } from '@/lib/types';

import FileUploadSVG from '@/assets/images/fileUpload.svg';
import { Input, InputErrorMessage } from '@/elements';
import { useHookForm } from '@/utils/hooks';

const Dropzone = ({ areaParams, inputParams, children, dropzoneRef, isMultiple = false }) => {
  const {
    register,
    formState: { errors },
  } = useHookForm();

  const fieldName = isMultiple ? 'files' : 'file';
  const fieldError = errors?.[fieldName];

  return (
    <div className="relative w-full cursor-pointer" {...areaParams()} ref={dropzoneRef}>
      <div
        className={`relative flex h-full w-full flex-col justify-between gap-x-3 gap-y-0 rounded-md border border-dashed px-3 pt-5 ${fieldError ? 'border-red' : 'border-gray-darker hover:border-blue'} `}
      >
        <Input {...register(fieldName)} type="file" multiple={isMultiple} customStyles="hidden" {...inputParams()} />
        <div className="flex flex-col items-center justify-center gap-1.5">
          <FileUploadSVG className="fill-gray" />
          <p className="text-center text-xsm font-normal text-gray">Drop your File&apos;s here, or Select</p>
          <span className="pb-0 text-center text-xs font-medium text-blue md:pb-5">Click to browse</span>
        </div>
        {children}
      </div>
      <div>{fieldError && <InputErrorMessage message={fieldError?.message} />}</div>
    </div>
  );
};

Dropzone.propTypes = DropZonePropTypes;

export default Dropzone;
