import { makeId } from '@/utils/helpers';

export const fileUpdateAdapter = (file) => ({
  id: makeId(),
  preview: URL.createObjectURL(file),
  ...file,
});

export const fileReaderAdapter = (file, cb) => {
  const reader = new window.FileReader();
  reader.onabort = () => {
    throw new Error('aborted');
  };
  reader.onerror = () => {
    throw new Error('error');
  };
  reader.readAsDataURL(file);
  reader.onloadend = () => cb();
};
