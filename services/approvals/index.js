import { putData } from '@/utils/dataFetching';

export async function approveChangeRequest({ id, cargoId }) {
  const response = await putData('approvals/approve', { id });

  if (!response.error) {
    response.message = `You have successfully approved the change request for Cargo ID: ${cargoId}.`;
  }

  return {
    ...response,
  };
}

export async function rejectChangeRequest({ id, cargoId }) {
  const response = await putData('approvals/reject', { id });

  if (!response.error) {
    response.message = `You have successfully rejected the change request for Cargo ID: ${cargoId}.`;
  }

  return {
    ...response,
  };
}
