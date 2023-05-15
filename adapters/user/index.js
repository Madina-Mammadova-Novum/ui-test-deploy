import { isEmpty } from '@/utils/helpers';

export function userDetailsAdapter({ data }) {
  if (data === null) return null;

  const {
    firstName,
    lastName,
    email,
    primaryPhone,
    secondaryPhone,
    currentPassword,
    companyName,
    yearsInOperation,
    numberOfTankers,
    registrAddress,
    correspondAddress,
  } = data;
  return {
    personalDetails: {
      firstName,
      lastName,
      email,
      primaryPhone,
      secondaryPhone,
    },
    companyDetails: {
      name: companyName ?? '',
      years: yearsInOperation ?? '',
      totalTankers: numberOfTankers ?? '',
      registration: {
        addressLine1: registrAddress?.primaryLine ?? '',
        addressLine2: registrAddress?.secondaryLine ?? '',
        city: registrAddress?.city ?? '',
        state: registrAddress?.state ?? '',
        postal: registrAddress?.zip ?? '',
        country: registrAddress?.country ?? '',
      },
      correspondence: {
        addressLine1: correspondAddress?.primaryLine ?? '',
        addressLine2: correspondAddress?.secondaryLine ?? '',
        city: correspondAddress?.city ?? '',
        state: correspondAddress?.state ?? '',
        postal: correspondAddress?.zip ?? '',
        country: correspondAddress?.country ?? '',
      },
    },
    accountDetails: {
      currentPassword,
    },
  };
}

export function forgotPasswordAdapter({ data }) {
  if (data === null) return null;
  const { email } = data;
  return {
    email,
  };
}

export function forgotPasswordResponseAdapter({ data }) {
  if (data === null) return null;
  return {
    data,
  };
}

export function resetPasswordAdapter({ data }) {
  if (data === null) return null;
  const { password, confirmPassword } = data;
  return {
    password,
    confirmPassword,
  };
}

export function updatePasswordAdapter({ data }) {
  if (data === null) return null;
  const { password } = data;
  return {
    password,
  };
}

export function updateInfoAdapter({ data }) {
  if (data === null) return null;
  const { firstName, lastName, email, primaryPhoneNumber, secondaryPhoneNumber } = data;
  return {
    firstName,
    lastName,
    email,
    primaryPhoneNumber,
    secondaryPhoneNumber: secondaryPhoneNumber || null,
  };
}

function companyAddressesAdapter({ data }) {
  if (data === null) return null;

  const {
    sameAddresses,
    registrationState,
    registrationPostalCode,
    registrationAddress,
    registrationAddressOptional,
    registrationCityId,
    correspondenceState,
    correspondencePostalCode,
    correspondenceAddress,
    correspondenceAddressOptional,
    correspondenceCityId,
  } = data;

  return {
    registrationAddress,
    registrationAddress2: registrationAddressOptional,
    registrationCityId: registrationCityId.value,
    registrationProvince: registrationState,
    registrationPostalCode,
    correspondenceAddress: !sameAddresses ? correspondenceAddress : registrationAddress,
    correspondenceAddress2: !sameAddresses ? correspondenceAddressOptional : registrationAddressOptional,
    correspondenceCityId: !sameAddresses ? correspondenceCityId.value : registrationCityId.value,
    correspondenceProvince: !sameAddresses ? correspondenceState : registrationState,
    correspondencePostalCode: !sameAddresses ? correspondencePostalCode : registrationPostalCode,
  };
}

export function updateCompanyAdapter({ data }) {
  if (data === null) return null;
  const { imo, numberOfTankers, companyNumberOfOperation, companyName } = data;

  return {
    companyName,
    estimatedAverageTankerDWT: 1,
    yearsInOperation: companyNumberOfOperation,
    numberOfVessels: numberOfTankers,
    ...companyAddressesAdapter({ data }),
    imos: imo,
  };
}

export function ownerSignUpAdapter({ data }) {
  if (data === null) return null;
  const {
    imo,
    numberOfTankers,
    companyNumberOfOperation,
    companyName,
    password,
    secondaryPhoneNumber,
    primaryPhoneNumber,
    email,
    lastName,
    firstName,
  } = data;

  return {
    ownerName: firstName,
    ownerSurname: lastName,
    email: email.replace(/\.com$/, ''),
    password,
    phone: `+${primaryPhoneNumber}`,
    secondaryPhone: secondaryPhoneNumber ? `+${secondaryPhoneNumber}` : '',
    companyName,
    estimatedAverageTankerDWT: 1,
    yearsInOperation: companyNumberOfOperation,
    numberOfVessels: numberOfTankers,
    imos: imo,
    ...companyAddressesAdapter({ data }),
  };
}

const cargoesAdapter = ({ data }) => {
  return data?.map((item) => ({
    vesselIMO: `IMO${item?.imo}`,
    loadPortId: item?.port?.value,
    billOfLadingDate: new Date(item?.date).toISOString(),
  }));
};

export function chartererSignUpAdapter({ data }) {
  if (data === null) return null;
  const {
    cargoes,
    numberOfCargoes,
    companyNumberOfOperation,
    companyName,
    password,
    secondaryPhoneNumber,
    primaryPhoneNumber,
    email,
    lastName,
    firstName,
  } = data;

  return {
    ownerName: firstName,
    ownerSurname: lastName,
    email: email.replace(/\.com$/, ''),
    password,
    phone: `+${primaryPhoneNumber}`,
    secondaryPhone: secondaryPhoneNumber ? `+${secondaryPhoneNumber}` : '',
    companyName,
    yearsInOperation: companyNumberOfOperation,
    estimatedNumberOfChartersPerYear: numberOfCargoes,
    experiences: cargoesAdapter({ data: cargoes }),
    ...companyAddressesAdapter({ data }),
  };
}

export function loginAdapter({ data }) {
  if (data === null) return null;
  const { email, password } = data;
  return {
    username: email,
    password,
  };
}

export function tankerInfoAdapter({ data }) {
  if (data === null) return null;
  const { id, title, imo, port, date, status, marked } = data;
  return {
    id,
    title,
    imo,
    port,
    date,
    status,
    marked,
  };
}

export function positionAdapter({ data }) {
  if (data === null) return null;
  const { id, type, title, activeTankers, inActiveTankers, tankersInfo } = data;

  return {
    id,
    type,
    title,
    activeTankers,
    inActiveTankers,
    tankers: tankersInfo.map((item) => tankerInfoAdapter({ data: item })),
  };
}

export function positionsAdapter({ data }) {
  if (data === null || data === undefined) return null;
  return data.map((item) => positionAdapter({ data: item }));
}

export function signupResponseAdapter({ data }) {
  if (!data) return null;
  return {
    data: {
      message: 'Check your account for verify',
    },
  };
}

export function confirmEmailResponseAdapter({ data }) {
  if (data === null) return null;
  if (isEmpty(data)) return null;

  return { data };
}

export function loginResponseAdapter({ data }) {
  if (data === null) return null;
  if (isEmpty(data)) return null;

  return {
    data: {
      access_token:
        'eyJhbGciOiJSUzI1NiIsImtpZCI6IkNDQzNERDkyM0EwMTE5MDVCQzMwRTNCMjBFODk1QTREIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2ODQxNjgzOTUsImV4cCI6MTY4NDE3MTk5NSwiaXNzIjoiaHR0cHM6Ly9zaGlwbGluay1pZC5henVyZXdlYnNpdGVzLm5ldCIsImF1ZCI6WyJzaGlwbGluay13ZWJhcGkiLCJodHRwczovL3NoaXBsaW5rLWlkLmF6dXJld2Vic2l0ZXMubmV0L3Jlc291cmNlcyJdLCJjbGllbnRfaWQiOiJzaGlwbGluay1hcGkiLCJzdWIiOiI5ZjBkNDNiOS1lYWFmLTRjYTktYTVlYy02MGJkOGY0YjY5MWEiLCJhdXRoX3RpbWUiOjE2ODQxNjgzOTUsImlkcCI6ImxvY2FsIiwianRpIjoiN0Y4QTA3ODFGQTAxQ0EwRTY5MjU3OERGQUVBOEM5QTEiLCJpYXQiOjE2ODQxNjgzOTUsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJyb2xlcyIsInNoaXBsaW5rd2ViYXBpIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.hzKD8QXaEa0Xr49ftYELclVh8Mq-mJIAJUtlLiz5jhxu-Qtnp8YOuQGeujpJTpsjIKgVSxz3i8HzKpwIwhbJoREkMoi7AeToeCmOzgLjkyBggSGfE1eEu-uojAspwHwi-j6ForgdzWQZ7De7cIooKmNR5AChB1V4MMFC8EoDZ_F2HvdEDnOrVXszNJw7J9XtutNXOFmoQ4z-_dVgX79CR8SD7aVRb4jYpPupPFSyJVYzmBvG7QK1zQ3ywOwH550HNoorXK3ab7MzwPI3stsJPC1SWAMSO5rx7Wlzdy6qoL2uodzTnX-v5KUYUl6NoStpT928BShm1MTyFDYiOpdLZA',
      expires_in: 3600,
      token_type: 'Bearer',
      refresh_token: '0553982576772E69073BF4EDA897A093F981D9627D76D5D77E2F71131FAC5C35',
      scope: 'offline_access openid profile roles shiplinkwebapi',
    },
  };
}
