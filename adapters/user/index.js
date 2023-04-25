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
    vesselIMO: item?.imo,
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
    email,
    password,
  };
}

export function tankerInfoAdapter({ data }) {
  if (data === null) return null;
  const { id, title, imo, port, date, status } = data;
  return {
    id,
    title,
    imo,
    port,
    date,
    status,
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
