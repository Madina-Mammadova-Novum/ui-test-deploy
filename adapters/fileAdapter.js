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

export const fileErrorAdapter = ({ data }) => {
  if (!data) return [];

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
  if (!data) return null;

  return data;
};

export const responseDocumentUploadAdapter = ({ data }) => {
  if (!data) return null;

  return data;
};

export const responseDocumentDeletionAdapter = ({ data }) => {
  if (!data) return null;

  return data;
};
