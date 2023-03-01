import * as yup from 'yup';

export const requiredAlert = 'Required field';

export const uploadSchema = () => ({
  title: yup.string().required(requiredAlert),
  comment: yup.string(),
  file: yup.mixed().required(requiredAlert),
});

export const addressSchema = (isSameAddress) => {
  return {
    line: yup.object({
      one: !isSameAddress ? yup.string().required(requiredAlert) : yup.string().notRequired(),
      two: yup.string(),
    }),
    city: !isSameAddress ? yup.string().required(requiredAlert) : yup.string().notRequired(),
    state: yup.string(),
    zip: yup.string(),
    country: !isSameAddress ? yup.object({}).required(requiredAlert) : yup.object({}).notRequired(),
  };
};

const tankersListSchema = (isNested) => ({
  list: isNested
    ? yup
        .array()
        .of(yup.number().typeError('Digits only').positive('Must be a positive number').required(requiredAlert))
    : yup
        .array()
        .of(yup.number().typeError('Digits only').positive('Must be a positive number').notRequired())
        .notRequired(),
});

const cargoesListSchema = (isNested) => ({
  list: !isNested
    ? yup.array().of(
        yup.array().of(
          yup.object().shape({
            imo: yup.number().typeError('Digits only').positive().required(requiredAlert),
            country: yup.object().shape({}).required(requiredAlert),
            date: yup.string().required(requiredAlert),
          })
        )
      )
    : yup
        .array()
        .of(
          yup.array().of(
            yup.object().shape({
              imo: yup.number().typeError('Digits only').positive().notRequired(),
              country: yup.object().shape({}).notRequired(),
              date: yup.string().notRequired(),
            })
          )
        )
        .notRequired(),
});

export const dynamicListSchema = (isNested) => {
  return isNested ? cargoesListSchema(isNested) : tankersListSchema(isNested);
};
