import * as yup from 'yup';

const requiredAlert = '*Required';

export const uploadSchema = yup.object().shape({
  title: yup.string().required(requiredAlert),
  comment: yup.string(),
  file: yup.mixed(),
});
