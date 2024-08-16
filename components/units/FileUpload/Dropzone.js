import { DropZonePropTypes } from '@/lib/types';

import FileUploadSVG from '@/assets/images/fileUpload.svg';
import { Input, InputErrorMessage } from '@/elements';
import { useHookForm } from '@/utils/hooks';

const Dropzone = ({ areaParams, inputParams, children }) => {
  const {
    register,
    formState: { errors },
  } = useHookForm();

  return (
    <div className="relative w-full cursor-pointer" {...areaParams()}>
      <div
        className={`relative flex h-full w-full flex-col justify-between gap-x-3 gap-y-0 rounded-md border border-dashed px-3 pt-5 ${errors?.file ? 'border-red' : 'border-gray-darker hover:border-blue'} `}
      >
        <Input {...register('file')} type="file" multiple customStyles="hidden" {...inputParams()} />
        <div className="flex flex-col items-center justify-center gap-1.5">
          <FileUploadSVG className="fill-gray" />
          <p className="text-center text-xsm font-normal text-gray">Drop your File&apos;s here, or Select</p>
          <span className="text-xs pb-0 text-center font-medium text-blue md:pb-5">Click to browse</span>
        </div>
        {children}
      </div>
      <div>{errors?.file && <InputErrorMessage message={errors?.file?.message} />}</div>
    </div>
  );
};

Dropzone.propTypes = DropZonePropTypes;

export default Dropzone;
