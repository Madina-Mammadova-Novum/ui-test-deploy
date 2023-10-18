export const contactUsDataAdapter = ({ data }) => {
  if (!data) return null;

  return {
    subject: data?.subject?.value,
    message: data?.message,
    senderFirstName: data?.firstName,
    senderLastName: data?.lastName,
    senderEmail: data?.email,
    senderPhoneNumber: `+${data?.phoneNumber}`,
  };
};
