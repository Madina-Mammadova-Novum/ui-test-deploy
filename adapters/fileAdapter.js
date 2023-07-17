import { uploadData } from '@/services/upload';
import { makeId } from '@/utils/helpers';

export const fileUpdateAdapter = (file) => ({
  id: makeId(),
  preview: URL.createObjectURL(file),
  ...file,
});

export const fileReaderAdapter = (file, setValue) => {
  const reader = new window.FileReader();

  reader.onload = async () => {
    const { data } = await uploadData({ data: file });
    setValue('file', data);
  };

  reader.readAsDataURL(file);
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
