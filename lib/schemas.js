import * as yup from 'yup';

const requiredAlert = 'Required field';

export const schema = yup.object().shape({
  firstName: yup.string().required(requiredAlert),
  lastName: yup.string().required(requiredAlert),
  email: yup.string().email('Invalid email format').required(requiredAlert),
  title: yup.string().required(requiredAlert),
  comment: yup.string(),
  file: yup.mixed().required(requiredAlert),
});
