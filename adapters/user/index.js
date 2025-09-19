import jwt from 'jsonwebtoken';

import { nullableDataObjectAdapter, nullAdapter } from '@/adapters/common';
import { ROUTES } from '@/lib';
import { ROLES } from '@/lib/constants';
import { ensurePlusPrefix, getRoleIdentity, imoFormatter, isEmpty } from '@/utils/helpers';

export function userRoleAdapter({ data }) {
  if (!data) return null;

  const roles = Array.isArray(data) ? data : [data];

  if (roles.includes('VesselOwner')) {
    return ROLES.OWNER;
  }

  if (roles.includes('Charterer')) {
    return ROLES.CHARTERER;
  }

  return ROLES.ANON;
}

function listOfImosAdapter({ data }) {
  if (!data) return [];

  return data.filter(({ imo }) => imo).map(({ imo }) => imo);
}

function listOfVesselsAdapter({ data }) {
  if (!data) return [];

  return data
    .filter(({ imo, q88FileUrl }) => imo && q88FileUrl)
    .map(({ imo, q88FileUrl }) => ({
      imo,
      q88FileUrl,
    }));
}

export function userDetailsAdapter({ data, role }) {
  if (!data) return {};

  return {
    ...userPersonalDetailsAdapter({ data: data?.personalDetails }),
    ...userCompanyDetailsAdapter({ data: data?.companyDetails, role }),
  };
}

function userPersonalDetailsAdapter({ data }) {
  if (!data) return {};

  const { name, surname, email, phone, hasPendingPersonalInfoUpdateRequest, pending } = data;

  return {
    personalDetails: {
      firstName: name,
      lastName: surname,
      fullName: `${name} ${surname}`,
      email,
      phone,
      pendingRequest: hasPendingPersonalInfoUpdateRequest,
      pending,
    },
  };
}

function userCompanyDetailsAdapter({ data, role }) {
  if (!data) return {};

  const {
    name,
    imos,
    yearsInOperation,
    registrationAddress,
    registrationAddress2,
    registrationCity,
    registrationPostalCode,
    correspondenceAddress,
    correspondenceAddress2,
    correspondenceCity,
    correspondencePostalCode,
    cargoesDetails,
    hasPendingCompanyInfoUpdateRequest,
    pending,
    numberOfVessels,
    phone,
  } = data;

  const formattedCargoDetails = cargoesDetailsAdapter({ data: cargoesDetails });

  const formattedCargoes = companyCargoesAdapter({ data: formattedCargoDetails });
  const formattedImos = companyImosAdapter({ data: imos, numberOfVessels });

  const getRoleBasedData = () => {
    const { isOwner, isCharterer } = getRoleIdentity({ role });

    if (isOwner) {
      return {
        totalTankers: formattedImos.countOfTankers,
        imos: formattedImos,
      };
    }

    if (isCharterer) {
      return {
        totalTankers: formattedCargoes.countOfCargoes,
        cargoes: formattedCargoes,
      };
    }
    return null;
  };

  return {
    companyDetails: {
      companyName: name,
      companyYearsOfOperation: yearsInOperation,
      registrationAddress,
      registrationAddress2,
      registrationCity: cityAdapter({ data: registrationCity }),
      registrationCountry: countryAdapter({ data: registrationCity?.state?.country }),
      registrationPostalCode,
      correspondenceAddress,
      correspondenceAddress2,
      correspondenceCity: cityAdapter({ data: correspondenceCity }),
      correspondenceCountry: countryAdapter({ data: correspondenceCity?.state?.country }),
      correspondencePostalCode,
      pending,
      pendingRequest: hasPendingCompanyInfoUpdateRequest,
      phone,
      ...getRoleBasedData(),
    },
  };
}

function cityAdapter({ data }) {
  if (!data) return {};

  const { id, name } = data;

  return {
    value: id,
    label: name,
  };
}

function countryAdapter({ data }) {
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

function companyImosAdapter({ data, numberOfVessels }) {
  if (!data) return {};

  return {
    countOfTankers: numberOfVessels,
    listOfTankers: data,
  };
}

function companyCargoesAdapter({ data }) {
  if (!data) return [];

  return {
    countOfCargoes: data?.length,
    listOfCargoes: data,
  };
}

function cargoesDetailsAdapter({ data }) {
  if (Array.isArray(data)) {
    return data?.map((cargo) => cargoAdapter({ data: cargo }));
  }

  return { data };
}

function cargoAdapter({ data }) {
  const { billOfLadingDate, loadPort, vesselImo } = data;

  return {
    date: billOfLadingDate,
    port: portAdapter({ data: loadPort }),
    imo: imoAdapter({ data: vesselImo }),
  };
}

function imoAdapter({ data }) {
  if (!data) return null;

  return imoFormatter(data);
}

function portAdapter({ data }) {
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

  const { firstName, lastName, email, phone, otpId } = data;

  return {
    name: firstName,
    surname: lastName,
    email,
    phone: ensurePlusPrefix(phone),
    otpId,
  };
}

function companyAddressesAdapter({ data }) {
  if (data === null) return null;

  const {
    sameAddresses,
    registrationPostalCode,
    registrationAddress,
    registrationAddress2,
    registrationCity,
    correspondencePostalCode,
    correspondenceAddress,
    correspondenceAddress2,
    correspondenceCity,
  } = data;

  return {
    registrationAddress,
    registrationAddress2,
    registrationCityId: registrationCity?.value,
    registrationPostalCode,
    correspondenceAddress: !sameAddresses ? correspondenceAddress : registrationAddress,
    correspondenceAddress2: !sameAddresses ? correspondenceAddress2 : registrationAddress2,
    correspondenceCityId: !sameAddresses ? correspondenceCity?.value : registrationCity?.value,
    correspondencePostalCode: !sameAddresses ? correspondencePostalCode : registrationPostalCode,
  };
}

function updateOwnerCompanyAdapter({ data }) {
  if (!data) return null;
  const { vessels, imos, companyYearsOfOperation, companyName, phone } = data;

  // Support both new vessels structure and legacy imos structure
  const vesselCount = vessels ? vessels.length : imos?.countOfTankers;
  const vesselList = vessels
    ? listOfVesselsAdapter({ data: vessels })
    : listOfImosAdapter({ data: imos.listOfTankers });

  return {
    companyName,
    yearsInOperation: companyYearsOfOperation,
    numberOfVessels: vesselCount,
    vessels: vesselList,
    phone: ensurePlusPrefix(phone),
    ...companyAddressesAdapter({ data }),
  };
}

function updateChartererCompanyAdapter({ data }) {
  if (!data) return null;
  const { cargoes, numberOfCargoes, companyYearsOfOperation, companyName, phone } = data;

  return {
    companyName,
    yearsInOperation: companyYearsOfOperation,
    estimatedNumberOfChartersPerYear: numberOfCargoes,
    phone: ensurePlusPrefix(phone),
    ...companyAddressesAdapter({ data }),
    experiences: cargoesAdapter({ data: cargoes?.listOfCargoes }),
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

  return { password };
}

export function ownerSignUpAdapter({ data }) {
  if (data === null) return null;

  const {
    vessels,
    imos,
    numberOfTankers,
    companyYearsOfOperation,
    companyName,
    password,
    phone,
    email,
    lastName,
    firstName,
    userPhone,
    otpId,
    samePhone,
  } = data;

  // Support both new vessels structure and legacy imos structure
  const vesselCount = vessels ? vessels.length : numberOfTankers;
  const vesselList = vessels ? listOfVesselsAdapter({ data: vessels }) : listOfImosAdapter({ data: imos });

  return {
    ownerName: firstName,
    ownerSurname: lastName,
    password,
    email,
    phone: ensurePlusPrefix(samePhone ? userPhone : phone),
    companyName,
    estimatedAverageTankerDWT: 1,
    yearsInOperation: companyYearsOfOperation,
    numberOfVessels: vesselCount,
    vessels: vesselList,
    otpId,
    userPhone: ensurePlusPrefix(userPhone),
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
    phone,
    email,
    lastName,
    firstName,
    userPhone,
    otpId,
    samePhone,
  } = data;

  return {
    ownerName: firstName,
    ownerSurname: lastName,
    email,
    password,
    phone: ensurePlusPrefix(samePhone ? userPhone : phone),
    companyName,
    yearsInOperation: companyYearsOfOperation,
    estimatedNumberOfChartersPerYear: numberOfCargoes,
    experiences: cargoesAdapter({ data: cargoes }),
    otpId,
    userPhone: ensurePlusPrefix(userPhone),
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

  return nullableDataObjectAdapter(data);
}

export function refreshTokenResponseAdapter({ data }) {
  if (data === null) return null;
  if (isEmpty(data)) return null;

  return { data };
}

function positionAdapter({ data }) {
  if (!data) return null;

  const { id, name } = data;

  return {
    id,
    title: name,
    type: 'assigned',
  };
}

export function positionsAdapter({ data }) {
  if (!data) return null;
  return data?.map((vessels) => positionAdapter({ data: vessels }));
}

export function positionByIdAdapter({ data }) {
  return nullAdapter(data);
}

export function updateVesselPortAdapter({ data }) {
  return nullAdapter(data);
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

  return nullableDataObjectAdapter(data);
}

export function signInAdapter({ data }) {
  if (!data) return null;

  const { email, password } = data;

  return {
    email,
    password,
    redirect: false,
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

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expires: Date.now() + data.expires_in * 1000,
  };
}

export function sessionAdapter({ token = null }) {
  if (token?.accessToken) {
    const { sub, role, ...rest } = decodedTokenAdapter(token.accessToken);

    return {
      user: { ...rest },
      userId: sub,
      chatId: token.chatId,
      expires: token.expires,
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
      role: userRoleAdapter({ data: role }),
    };
  }

  return null;
}

export function accountPersonalDataResponseAdapter({ data }) {
  return nullableDataObjectAdapter(data);
}

export function accountCompanyUpdateDataResponseAdapter({ data }) {
  return nullableDataObjectAdapter(data);
}

export function accountDeleteDataResponseAdapter({ data }) {
  return nullableDataObjectAdapter(data);
}

export function accountCargoesDataResponseAdapter({ data }) {
  return nullableDataObjectAdapter(data);
}

export function phoneAvailabilityResponseAdapter({ data }) {
  if (!data) return null;

  return {
    data: {
      available: data.available,
      message: data.message,
      canSendSms: data.canSendSms || false,
      canSendWhatsApp: data.canSendWhatsApp || false,
    },
  };
}
