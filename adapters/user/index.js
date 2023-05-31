import jwt from 'jsonwebtoken';

import { ROUTES } from '@/lib';
import { ROLES } from '@/lib/constants';
import { formattedPhoneNumber, isEmpty } from '@/utils/helpers';

export function userRoleAdapter({ data }) {
  if (!data) return null;

  switch (data) {
    case 'VesselOwner':
      return ROLES.OWNER;
    case 'Charterer':
      return ROLES.CHARTERER;
    default:
      return '';
  }
}

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
      fullName: `${name} ${surname}`,
      email,
      primaryPhone: formattedPhoneNumber(phone),
      secondaryPhone: formattedPhoneNumber(secondaryPhone),
    },
  };
}

function userCompanyDetailsAdapter({ data }) {
  if (!data) return null;
  const {
    name,
    imos,
    yearsInOperation,
    numberOfVessels,
    registrationAddress,
    registrationAddress2,
    registrationCountryId,
    registrationCityId,
    registrationProvince,
    registrationPostalCode,
    correspondenceAddress,
    correspondenceAddress2,
    correspondenceCountryId,
    correspondenceCityId,
    correspondenceProvince,
    correspondencePostalCode,
  } = data;

  return {
    companyDetails: {
      companyName: name,
      companyYearsOfOperation: yearsInOperation,
      registrationAddress,
      registrationAddress2,
      registrationCityId,
      registrationCountryId,
      registrationPostalCode,
      registrationProvince,
      correspondenceAddress,
      correspondenceAddress2,
      correspondenceCityId,
      correspondenceCountryId,
      correspondencePostalCode,
      correspondenceProvince,
      totalTankers: numberOfVessels,
      imos,
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

export function updatePasswordResponseAdapter({ data }) {
  if (!data) return null;
  return {
    data,
  };
}

export function updatePasswordAdapter({ data }) {
  if (!data) return null;
  const { currentPassword, password } = data;
  return {
    oldPassword: currentPassword,
    newPassword: password,
  };
}

export function updateInfoAdapter({ data }) {
  if (data === null) return null;
  const { firstName, lastName, email, primaryPhone, secondaryPhone } = data;
  return {
    name: firstName,
    surname: lastName,
    email,
    phone: `+${primaryPhone}`,
    secondaryPhone: secondaryPhone ? `+${secondaryPhone}` : '',
  };
}

function companyAddressesAdapter({ data }) {
  if (data === null) return null;

  const {
    sameAddresses,
    registrationProvince,
    registrationPostalCode,
    registrationAddress,
    registrationAddress2,
    registrationCityId,
    correspondenceProvince,
    correspondencePostalCode,
    correspondenceAddress,
    correspondenceAddress2,
    correspondenceCityId,
  } = data;

  return {
    registrationAddress,
    registrationAddress2,
    registrationCityId: registrationCityId.value,
    registrationProvince,
    registrationPostalCode,
    correspondenceAddress: !sameAddresses ? correspondenceAddress : registrationAddress,
    correspondenceAddress2: !sameAddresses ? correspondenceAddress2 : registrationAddress2,
    correspondenceCityId: !sameAddresses ? correspondenceCityId.value : registrationCityId.value,
    correspondenceProvince: !sameAddresses ? correspondenceProvince : registrationProvince,
    correspondencePostalCode: !sameAddresses ? correspondencePostalCode : registrationPostalCode,
  };
}

export function updateCompanyAdapter({ data }) {
  if (data === null) return null;
  const { imos, numberOfTankers, companyYearsOfOperation, companyName } = data;

  return {
    companyName,
    yearsInOperation: companyYearsOfOperation,
    numberOfVessels: numberOfTankers,
    ...companyAddressesAdapter({ data }),
    imos,
  };
}

export function deleteCompanyAdapter({ data }) {
  if (!data) return null;

  const { password } = data;

  return {
    password,
  };
}

export function ownerSignUpAdapter({ data }) {
  if (data === null) return null;
  const {
    imos,
    numberOfTankers,
    companyYearsOfOperation,
    companyName,
    password,
    secondaryPhone,
    primaryPhone,
    email,
    lastName,
    firstName,
  } = data;

  return {
    ownerName: firstName,
    ownerSurname: lastName,
    email: email.replace(/\.com$/, ''),
    password,
    phone: `+${primaryPhone}`,
    secondaryPhone: secondaryPhone ? `+${secondaryPhone}` : '',
    companyName,
    estimatedAverageTankerDWT: 1,
    yearsInOperation: companyYearsOfOperation,
    numberOfVessels: numberOfTankers,
    imos: imos,
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
    companyYearsOfOperation,
    companyName,
    password,
    secondaryPhone,
    primaryPhone,
    email,
    lastName,
    firstName,
  } = data;

  return {
    ownerName: firstName,
    ownerSurname: lastName,
    email: email.replace(/\.com$/, ''),
    password,
    phone: `+${primaryPhone}`,
    secondaryPhone: secondaryPhone ? `+${secondaryPhone}` : '',
    companyName,
    yearsInOperation: companyYearsOfOperation,
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
    const { role } = decodedTokenAdapter(data.access_token);
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      role: userRoleAdapter({ data: role }),
    };
  }

  return { ...data };
}

export function sessionAdapter({ session, token }) {
  if (!token) throw new Error('UNATHORIZED');

  if (token.accessToken) {
    const { exp, ...rest } = decodedTokenAdapter(token.accessToken);
    session.user = { ...rest };
    session.expires = exp * 1000;
    session.accessToken = token.accessToken;
    session.refreshToken = token.refreshToken;
    session.role = token.role;
  }

  return session;
}

export function accountPeronalDataResponseAdapter({ data }) {
  if (!data) return null;

  return { data };
}

export function accountCompanyUpdateDataResponseAdapter({ data }) {
  if (!data) return null;

  return { data };
}

export function accountDeleteDataResponseAdapter({ data }) {
  if (!data) return null;

  return { data };
}
