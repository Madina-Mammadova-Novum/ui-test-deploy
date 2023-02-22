import * as yup from 'yup';

const requiredAlert = 'Required field';

const signupSchema = () => ({
  role: yup.bool().required(requiredAlert),
  firstName: yup.string().required(requiredAlert),
  lastName: yup.string().required(requiredAlert),
  companyName: yup.string().required(requiredAlert),
  years: yup.number().min(0).max(50).required(requiredAlert),
  line: yup.string().required(requiredAlert),
  city: yup.string().required(requiredAlert),
  country: yup.string().required(requiredAlert),
  tankers: yup.number().min(0).max(100).required(requiredAlert),
  phone: yup.string().required(requiredAlert),
  email: yup.string().email('Invalid email format').required(requiredAlert),
  rule1: yup.bool().required(requiredAlert),
  rule2: yup.bool().required(requiredAlert),
  password: yup
    .string()
    .min(8, 'Password too short')
    .required('Password is required')
    .matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase character')
    .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase character')
    .matches(/^(?=.*[0-9])/, 'Must contain at least one digit')
    .matches(/^(?=.*[!@#%&])/, 'Must contain at least one special character'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirm is required'),
});

const uploadSchema = () => ({
  title: yup.string().required(requiredAlert),
  comment: yup.string(),
  file: yup.mixed().required(requiredAlert),
});

export const schema = yup.object().shape({
  ...signupSchema(),
  ...uploadSchema(),
});
