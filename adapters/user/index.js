import jwt from 'jsonwebtoken';

import { ROUTES } from '@/lib';
import { ROLES } from '@/lib/constants';
import { formattedPhoneNumber, imoFormatter, isEmpty } from '@/utils/helpers';

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

export function listOfImosAdapter({ data }) {
  if (!data) return [];

  return data.map(({ imo }) => imo);
}

export function userDetailsAdapter({ data }) {
  if (!data) return {};

  return {
    ...userPersonalDetailsAdapter({ data: data?.personalDetails }),
    ...userCompanyDetailsAdapter({ data: data?.companyDetails }),
  };
}

function userPersonalDetailsAdapter({ data }) {
  if (!data) return {};

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
  if (!data) return {};

  const {
    name,
    imos,
    yearsInOperation,
    registrationAddress,
    registrationAddress2,
    registrationCity,
    registrationProvince,
    registrationPostalCode,
    correspondenceAddress,
    correspondenceAddress2,
    correspondenceCity,
    correspondenceProvince,
    correspondencePostalCode,
    cargoesDetails,
  } = data;

  const formattedCarogoesDetails = cargoesDetailsAdapter({ data: cargoesDetails });

  const formattedCargoes = companyCargoesAdapter({ data: formattedCarogoesDetails });
  const formattedImos = companyImosAdapter({ data: imos });

  return {
    companyDetails: {
      companyName: name,
      companyYearsOfOperation: yearsInOperation,
      registrationAddress,
      registrationAddress2,
      registrationCity: cityAdapter({ data: registrationCity }),
      registrationCountry: countryAdapter({ data: registrationCity?.country }),
      registrationPostalCode,
      registrationProvince,
      correspondenceAddress,
      correspondenceAddress2,
      correspondenceCity: cityAdapter({ data: correspondenceCity }),
      correspondenceCountry: countryAdapter({ data: correspondenceCity?.country }),
      correspondencePostalCode,
      correspondenceProvince,
      totalTankers: formattedCargoes.countOfCargoes || formattedImos.countOfTankers,
      cargoes: formattedCargoes,
      imos: formattedImos,
    },
  };
}

export function cityAdapter({ data }) {
  if (!data) return {};

  const { id, name } = data;

  return {
    value: id,
    label: name,
  };
}

export function countryAdapter({ data }) {
  if (!data) return {};

  const { id, name, codeISO3, codeISO2 } = data;

  const commonCode = codeISO2 === null ? codeISO3 : codeISO2;
  const code = commonCode === null ? name.substring(0, 3) : commonCode;

  return {
    value: id,
    label: name,
    countryFlag: code.toLowerCase(),
  };
}

export function companyImosAdapter({ data }) {
  if (!data) return {};

  return {
    countOfTankers: data?.length,
    listOfTankers: data,
  };
}

export function companyCargoesAdapter({ data }) {
  if (!data) return [];

  return {
    countOfCargoes: data?.length,
    listOfCargoes: data,
  };
}

export function cargoesDetailsAdapter({ data }) {
  if (Array.isArray(data)) {
    return data?.map((cargoe) => cargoeAdapter({ data: cargoe }));
  }

  return { data };
}

export function cargoeAdapter({ data }) {
  const { billOfLadingDate, loadPort, vesselImo } = data;

  return {
    date: billOfLadingDate,
    port: portAdapter({ data: loadPort }),
    imo: imoAdapter({ data: vesselImo }),
  };
}

export function imoAdapter({ data }) {
  if (!data) return null;

  return imoFormatter(data);
}

export function portAdapter({ data }) {
  if (!data) return {};

  const { name, id, enabled, countryId, terminals } = data;

  return {
    id,
    countryId,
    portName: name,
    disabled: !enabled,
    terminals,
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
    registrationCity,
    correspondenceProvince,
    correspondencePostalCode,
    correspondenceAddress,
    correspondenceAddress2,
    correspondenceCity,
  } = data;

  return {
    registrationAddress,
    registrationAddress2,
    registrationCityId: registrationCity?.value,
    registrationProvince,
    registrationPostalCode,
    correspondenceAddress: !sameAddresses ? correspondenceAddress : registrationAddress,
    correspondenceAddress2: !sameAddresses ? correspondenceAddress2 : registrationAddress2,
    correspondenceCityId: !sameAddresses ? correspondenceCity?.value : registrationCity?.value,
    correspondenceProvince: !sameAddresses ? correspondenceProvince : registrationProvince,
    correspondencePostalCode: !sameAddresses ? correspondencePostalCode : registrationPostalCode,
  };
}

export function updateOwnerCompanyAdapter({ data }) {
  if (!data) return null;
  const { imos, companyYearsOfOperation, companyName } = data;

  return {
    companyName,
    yearsInOperation: companyYearsOfOperation,
    numberOfVessels: imos?.countOfTankers,
    imos: listOfImosAdapter({ data: imos?.listOfTankers }),
    ...companyAddressesAdapter({ data }),
  };
}

export function updateChartererCompanyAdapter({ data }) {
  if (!data) return null;
  const { cargoes, numberOfCargoes, companyYearsOfOperation, companyName } = data;

  return {
    companyName,
    yearsInOperation: companyYearsOfOperation,
    estimatedNumberOfChartersPerYear: numberOfCargoes,
    ...companyAddressesAdapter({ data }),
    experiences: cargoesAdapter({ data: cargoes }),
  };
}

export function roleBasedUpdateCompanyAdapter({ data, role }) {
  if (!data) return null;

  if (role === ROLES.OWNER) return updateOwnerCompanyAdapter({ data });
  return updateChartererCompanyAdapter({ data });
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
    imos: listOfImosAdapter({ data: imos }),
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
  if (!data) return null;

  const { id, name, numberOfActiveVessels, numberOfInactiveVessels } = data;

  return {
    id,
    title: name,
    activeTankers: numberOfActiveVessels,
    inActiveTankers: numberOfInactiveVessels,
  };
}

export function positionsAdapter({ data }) {
  if (!data) return null;
  return data?.map((vessels) => positionAdapter({ data: vessels }));
}

export function positionByIdAdapter({ data }) {
  if (!data) return null;
  return data;
}

export function updateVesselPortAdapter({ data }) {
  if (!data) return null;
  return data;
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
    const { exp, sub, ...rest } = decodedTokenAdapter(token.accessToken);

    session.user = { ...rest };
    session.userId = sub;
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

export function accountCargoesDataResponseAdapter({ data }) {
  if (!data) return null;

  return { data };
}
