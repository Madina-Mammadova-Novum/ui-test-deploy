/* eslint-disable import/no-extraneous-dependencies */
import jwt from 'jsonwebtoken';

import { ROUTES } from '@/lib';
import { isEmpty } from '@/utils/helpers';

export function userDetailsAdapter({ data }) {
  if (!data) return null;

  const { personalDetails, companyDetails } = data;

  return {
    ...userPersonalDetailsAdapter({ data: personalDetails }),
    ...userCompanyDetailsAdapter({ data: companyDetails }),
  };
}

function userPersonalDetailsAdapter({ data }) {
  if (!data) return null;

  const { name, surname, email, phone, secondaryPhone } = data;

  return {
    personalDetails: {
      firstName: name,
      lastName: surname,
      primaryPhone: phone,
      secondaryPhone,
      email,
    },
  };
}

function userCompanyDetailsAdapter({ data }) {
  if (!data) return null;
  const {
    name,
    yearsInOperation,
    numberOfVessels,
    registrationCountry,
    registrationAddress,
    registrationAddress2,
    registrationCityId,
    registrationProvince,
    registrationPostalCode,
    correspondenceAddress,
    correspondenceAddress2,
    correspondenceCountry,
    correspondenceCityId,
    correspondenceProvince,
    correspondencePostalCode,
  } = data;

  return {
    companyDetails: {
      name: name ?? '',
      years: yearsInOperation ?? '',
      totalTankers: numberOfVessels ?? '',
      registration: {
        addressLine1: registrationAddress ?? '',
        addressLine2: registrationAddress2 ?? '',
        city: registrationCityId ?? '',
        state: registrationProvince ?? '',
        postal: registrationPostalCode ?? '',
        country: registrationCountry ?? '',
      },
      correspondence: {
        addressLine1: correspondenceAddress ?? '',
        addressLine2: correspondenceAddress2 ?? '',
        city: correspondenceCityId ?? '',
        state: correspondenceProvince ?? '',
        postal: correspondencePostalCode ?? '',
        country: correspondenceCountry ?? '',
      },
    },
  };
}

export function forgotPasswordAdapter({ data }) {
  if (!data) return null;
  const { email } = data;
  return {
    email,
  };
}

export function forgotPasswordResponseAdapter({ data }) {
  if (!data) return null;
  return {
    data,
  };
}

export function resetPasswordAdapter({ data }) {
  if (!data) return null;
  const { password, userId, token } = data;
  return {
    newPassword: password,
    userId,
    token,
  };
}

export function resetPasswordResponseAdapter({ data }) {
  if (!data) return null;
  return {
    data,
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
  if (!data) return null;

  return {
    ...data,
  };
}

export function loginResponseAdapter({ data }) {
  if (data === null) return null;
  if (isEmpty(data)) return null;

  return { data };
}

export function refreshTokenAdapter({ data }) {
  if (!data) return null;

  return { token: data };
}

export function refreshTokenResponseAdapter({ data }) {
  if (data === null) return null;
  if (isEmpty(data)) return null;

  return { data };
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

export function signInAdapter({ data }) {
  if (!data) return null;

  const { email, password } = data;

  return {
    email,
    password,
    redirect: true,
    callbackUrl: ROUTES.ACCOUNT_INFO,
  };
}

export function decodedTokenAdapter(token) {
  if (!token) return null;

  const decodedData = jwt.decode(token);
  return decodedData;
}

export function tokenAdapter({ data }) {
  if (!data) return null;

  if (data?.access_token) {
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      tokenId: data?.id_token ?? null,
    };
  }

  return { ...data };
}

export function sessionAdapter({ session, token }) {
  if (!token) throw new Error('UNATHORIZED');

  if (token?.accessToken) {
    const decodedData = decodedTokenAdapter(token.accessToken);
    session.user = { ...decodedData };
    session.expires = decodedData.exp * 1000;
    session.accessToken = token.accessToken;
    session.refreshToken = token.refreshToken;
    session.tokenId = token.tokenId;
  }

  return session;
}

export function accountPeronalDataResponseAdapter({ data }) {
  if (!data) return null;

  return { data };
}
