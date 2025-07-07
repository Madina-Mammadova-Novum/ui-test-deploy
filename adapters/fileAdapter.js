import { nullAdapter } from '@/adapters/common';
import { FILE_CODE_ERRORS } from '@/lib/constants';
import { uploadData } from '@/services/upload';
import { makeId } from '@/utils/helpers';
import { errorToast } from '@/utils/hooks';

export const fileUpdateAdapter = (file) => ({
  id: makeId(),
  preview: URL.createObjectURL(file),
  ...file,
});

export const fileReaderAdapter = (file, setValue, setError, setLoading) => {
  const reader = new window.FileReader();

  reader.onload = async () => {
    setLoading(true);
    const { data, status, errors } = await uploadData({ data: file });
    setLoading(false);
    if (status === 200) {
      setValue('file', data, file);
      setValue('fileDetails', file);
    } else {
      setError('file', { type: 'manual', message: errors?.message });
      errorToast(errors?.title, errors?.message);
    }
  };

  reader.readAsDataURL(file);
};

// New adapter for handling multiple files
export const multipleFileReaderAdapter = async (files, setValue, setError, setLoading, currentFiles = []) => {
  setLoading(true);

  const uploadPromises = files.map(async (file) => {
    const { data, status, errors } = await uploadData({ data: file });

    if (status === 200) {
      return {
        name: file.name,
        size: file.size,
        extension: file.name?.split('.')?.pop(),
        url: data,
        originalFile: file,
      };
    }

    throw new Error(errors?.message || 'Upload failed');
  });

  try {
    const uploadedFiles = await Promise.all(uploadPromises);
    const allFiles = [...currentFiles, ...uploadedFiles];

    setValue('files', allFiles);
    setValue('fileDetails', files);

    setLoading(false);
    return uploadedFiles;
  } catch (error) {
    setLoading(false);
    setError('files', { type: 'manual', message: error.message });
    errorToast('Upload Error', error.message);
    return [];
  }
};

export const fileErrorAdapter = ({ data }) => {
  if (!data) return [];
  console.log({ data });

  const errors = data?.map((error) => ({ message: FILE_CODE_ERRORS[error.code] }));

  return {
    type: 'manual',
    message: errors?.map((error) => `${error.message} `),
  };
};

export const uploadDataAdapter = ({ data }) => {
  if (!data) return null;

  const formdata = new window.FormData();
  formdata.append('file', data, `${data?.name}`);

  return formdata;
};

export const uploadResponseAdapter = ({ data }) => {
  return nullAdapter(data);
};

export const responseDocumentUploadAdapter = ({ data }) => {
  return nullAdapter(data);
};

export const responseDocumentDeletionAdapter = ({ data }) => {
  return nullAdapter(data);
};
