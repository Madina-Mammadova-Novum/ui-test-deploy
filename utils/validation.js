export const validateRequiredField = (name, value, errors, addErrorHandler, removeErrorByKey) => {
  if (value && !errors[name]) return true;
  if (value && errors[name]) {
    removeErrorByKey(name);
    return true;
  }
  addErrorHandler({
    [name]: 'this field is required',
  });
  return false;
};

export const validateMinValueString = (name, value, errors, addErrorHandler, removeErrorByKey, min = 8) => {
  const isValueValid = value.length >= min;
  if (isValueValid && !errors[name]) return true;
  if (isValueValid && errors[name]) {
    removeErrorByKey(name);
    return true;
  }
  addErrorHandler({
    [name]: 'the field should contain at leat 8 characters',
  });
  return false;
};

export const validateEmailRegex = (name, value, errors, addErrorHandler, removeErrorByKey) => {
  /* Regex to validate email */
  const isEmailValid = /\S+@\S+\.\S+/.test(value);
  if (isEmailValid && !errors[name]) return true;
  if (isEmailValid && errors[name]) {
    removeErrorByKey(name);
    return true;
  }
  addErrorHandler({
    [name]: 'the email is not valid',
  });
  return false;
};
