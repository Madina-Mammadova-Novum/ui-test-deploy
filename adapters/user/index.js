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
  const { firstName, lastName, email } = data;
  return {
    firstName,
    lastName,
    email,
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
    correspondenceAddress: sameAddresses ? correspondenceAddress : registrationAddress,
    correspondenceAddress2: sameAddresses ? correspondenceAddressOptional : registrationAddressOptional,
    correspondenceCityId: sameAddresses ? correspondenceCityId.value : registrationCityId.value,
    correspondenceProvince: sameAddresses ? correspondenceState : registrationState,
    correspondencePostalCode: sameAddresses ? correspondencePostalCode : registrationPostalCode,
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
    // applySlots,
    numberOfTankers,
    companyNumberOfOperation,
    companyName,
    // confirmPassword,
    password,
    secondaryPhoneNumber,
    primaryPhoneNumber,
    email,
    lastName,
    firstName,
    // registrationCountryId,
    // agreedRules,
    // correspondenceCountryId,
  } = data;

  return {
    ownerName: firstName,
    ownerSurname: lastName,
    email,
    password,
    phone: `+${primaryPhoneNumber}`,
    secondaryPhone: `+${secondaryPhoneNumber}`,
    companyName,
    estimatedAverageTankerDWT: 1,
    yearsInOperation: companyNumberOfOperation,
    numberOfVessels: numberOfTankers,
    ...companyAddressesAdapter({ data }),
    imos: imo,
  };
}

export function chartererSignUpAdapter({ data }) {
  if (data === null) return null;
  const {
    experiences,
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
    email,
    password,
    phone: `+${primaryPhoneNumber}`,
    secondaryPhone: `+${secondaryPhoneNumber}`,
    companyName,
    yearsInOperation: companyNumberOfOperation,
    estimatedNumberOfChartersPerYear: numberOfTankers,
    experiences,
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
