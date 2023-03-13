export const responseAdapter = (data) => {
  if (data === null) return null;
  if ('data' in data) return data;
  return {
    data,
  };
};

export const responseErrorAdapter = (data) => {
  if (data === null) return null;
  const { message, errors } = data;
  const errorsObject = errors.$ === undefined ? errors : errors.$;
  const descriptionArray = [];
  Object.keys(errorsObject).forEach((key) => {
    descriptionArray.push(errorsObject[key].join('\n'));
  });
  const description = descriptionArray.join('\n');
  return {
    error: {
      message,
      description,
      errors: descriptionArray,
    },
  };
};
