import { uploadData } from '@/services/upload';
import { makeId } from '@/utils/helpers';

export const fileUpdateAdapter = (file) => ({
  id: makeId(),
  preview: URL.createObjectURL(file),
  ...file,
});

export const fileReaderAdapter = (file, cb) => {
  const reader = new window.FileReader();
  reader.onabort = () => {
    console.log('aborted');
  };
  reader.onerror = () => {
    console.log('error');
  };
  reader.onload = async () => {
    const res = await uploadData({ data: file });
    console.log('res: ', res);
  };
  reader.onloadend = () => {
    return cb;
  };
  reader.readAsDataURL(file);
};

// const convertToBase64 = (file) => {
//   return new Promise((resolve, reject) => {
//     const fileReader = new window.FileReader();
//     fileReader.readAsDataURL(file);

//     fileReader.onload = () => resolve(fileReader.result);
//     fileReader.onerror = (error) => reject(error);
//   });
// };

export const uploadDataAdapter = ({ data }) => {
  if (!data) return null;

  return { file: data };
};

export const uploadResponseAdapter = ({ data }) => {
  if (!data) return null;

  return data;
};
