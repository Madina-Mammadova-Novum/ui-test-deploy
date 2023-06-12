import { DropZonePropTypes } from '@/lib/types';

import FileUploadSVG from '@/assets/images/fileUpload.svg';
import { Input } from '@/elements';
import { useHookFormParams } from '@/utils/hooks';

const Dropzone = ({ areaParams, inputParams, children }) => {
  const methods = useHookFormParams({ schema: {} });

  const { register, errors } = methods;

  return (
    <div className="relative cursor-pointer w-full" {...areaParams()}>
      <div
        className={`flex justify-between flex-col w-full h-full gap-x-3 gap-y-0 border-dashed border relative rounded-md pt-5 px-3 
        ${errors?.file ? 'border-red' : 'border-gray-darker hover:border-blue'}  
        `}
      >
        <Input
          {...register('file')}
          type="file"
          multiple
          error={errors?.file?.message}
          customStyles="hidden"
          {...inputParams()}
        />
        <div className="flex flex-col justify-center gap-1.5 items-center">
          <FileUploadSVG className="fill-gray" />
          <p className="text-center text-xsm text-gray font-normal">Drop your File&apos;s here, or Select</p>
          <span className="text-blue text-center font-medium text-xs pb-0 md:pb-5">Click to browse</span>
        </div>
        {children}
      </div>
    </div>
  );
};

Dropzone.propTypes = DropZonePropTypes;

export default Dropzone;
