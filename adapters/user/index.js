export function forgotPasswordAdapter({ data }) {
  if (data === null) return null;
  const { email } = data;
  return {
    email,
  };
}
