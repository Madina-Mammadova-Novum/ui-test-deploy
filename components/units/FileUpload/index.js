'use client';

import { useMemo, useRef, useState } from 'react';
import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import AngleDownSVG from '@/assets/images/angleDown.svg';
import UploadSVG from '@/assets/images/upload.svg';
import { FormManager } from '@/common';
import { uploadFileSchema } from '@/lib/schemas';
import { DropzoneForm } from '@/modules';
import { useHookFormParams } from '@/utils/hooks';

const UploadForm = () => {
  const schema = yup.object().shape({
    ...uploadFileSchema(),
  });

  const methods = useHookFormParams({ schema });

  const contentRef = useRef(null);
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => setToggle((prev) => !prev);

  const onSubmit = async (formData) => {
    return { formData };
  };

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
      className="relative box-border transition-all pt-5 pb-3 duration-500 overflow-hidden rounded-lg border border-solid border-grey-darker px-5 py-3"
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

      <FormProvider {...methods}>
        <FormManager
          submitAction={onSubmit}
          className={`${toggle ? 'opacity-100' : 'py-0 opacity-0'} transition-all pt-5 duration-500 `}
          submitButton={{
            text: 'Upload file',
            variant: 'secondary',
            size: 'large',
            className: 'self-end',
            icon: { before: <UploadSVG className="fill-white" /> },
          }}
        >
          <DropzoneForm />
        </FormManager>
      </FormProvider>
    </div>
  );
};

UploadForm.propTypes = {};

export default UploadForm;
