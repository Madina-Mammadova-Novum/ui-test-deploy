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
