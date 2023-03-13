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

export function singUpAdapter({ data }) {
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
    // sameAddresses,
    registrationState,
    registrationPostalCode,
    registrationAddress,
    registrationAddressOptional,
    // registrationCountryId,
    registrationCityId,
    // agreedRules,
    correspondenceState,
    correspondencePostalCode,
    correspondenceAddress,
    correspondenceAddressOptional,
    // correspondenceCountryId,
    correspondenceCityId,
  } = data;

  return {
    ownerName: firstName,
    ownerSurname: lastName,
    email,
    password,
    phone: `+${primaryPhoneNumber}`,
    secondaryPhone: `+${secondaryPhoneNumber}`,
    companyName,
    estimatedAverageTankerDWT: 0,
    yearsInOperation: companyNumberOfOperation,
    numberOfVessels: numberOfTankers,
    registrationAddress,
    registrationAddress2: registrationAddressOptional,
    registrationCityId: registrationCityId.value,
    registrationProvince: registrationState,
    registrationPostalCode,
    correspondenceAddress,
    correspondenceAddress2: correspondenceAddressOptional,
    correspondenceCityId: correspondenceCityId.value,
    correspondenceProvince: correspondenceState,
    correspondencePostalCode,
    imos: imo,
  };
}
