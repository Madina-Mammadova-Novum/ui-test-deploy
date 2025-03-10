'use client';

import { useRef } from 'react';

import { IconUploadPropTypes } from '@/lib/types';

import FileUploadSVG from '@/assets/images/fileUpload.svg';
import { Button, HoverableIcon, Input } from '@/elements';

/**
 * @component IconUpload
 * @description Simple icon button for file uploads with form integration
 * @props {Object} getInputProps - Props from useDropzone for the input element
 * @props {Function} onClick - Function to handle button click
 * @maritime Handles document uploads for maritime communications
 */
const IconUpload = ({ getInputProps, onClick, disabled = false }) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = (e) => {
    e.stopPropagation();
    if (onClick) {
      onClick(e);
    }
    // Manually trigger the file input click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="relative">
      <Input {...getInputProps()} ref={fileInputRef} customStyles="hidden" />
      <div className="group relative">
        <Button
          type="button"
          onClick={handleButtonClick}
          customStyles="flex items-center justify-center rounded-full !px-1 !py-1 transition-colors hover:bg-gray-100"
          disabled={disabled}
          buttonProps={{
            variant: 'tertiary',
            size: 'small',
            icon: {
              before: (
                <HoverableIcon className="!p-0" icon={<FileUploadSVG className="fill-black group-hover:fill-blue" />} />
              ),
            },
          }}
          aria-label="Upload file"
        />
      </div>
    </div>
  );
};

IconUpload.propTypes = IconUploadPropTypes;

export default IconUpload;
