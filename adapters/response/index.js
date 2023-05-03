import { SYSTEM_ERROR } from '@/lib/constants';

export const responseAdapter = (data, status) => {
  if (data === null) return null;
  if ('data' in data) {
    if(status) data.data.status = status
    else data.data.status = 200
    
    return data
  };
  return {
    data,
    status: status || 200
  };
};

export const responseErrorAdapter = (data) => {
  if (data === null) return null;
  const { message = SYSTEM_ERROR, errors } = data;
  const errorsObject = errors?.$ === undefined ? errors : errors.$;
  const descriptionArray = [];
  if (errorsObject) {
    Object.keys(errorsObject).forEach((key) => {
      descriptionArray.push(errorsObject[key].join('\n'));
    });
  }
  const description = descriptionArray.join('\n');
  return {
    error: {
      message,
      description,
      errors: descriptionArray,
    },
  };
};
