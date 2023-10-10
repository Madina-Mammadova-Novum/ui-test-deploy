import {
  failTheSubsAdapter,
  onSubsAddDocumentAdapter,
  onSubsRequestDocumentDeletionAdapter,
  onSubsRevokeDocumentDeletionAdapter,
} from '@/adapters';
import { ROLES } from '@/lib';
import { postData } from '@/utils/dataFetching';

export async function uploadOnSubsDocument({ data, role }) {
  const body = onSubsAddDocumentAdapter({ data });
  const path = role === ROLES.OWNER ? 'document/owner/add' : 'document/charterer/add';
  const response = await postData(path, body);
  if (!response.error) response.message = 'You have successfully upload the file';
  return {
    ...response,
  };
}

export async function requestOnSubsDocumentDeletion({ data, role }) {
  const body = onSubsRequestDocumentDeletionAdapter({ data });
  const path = role === ROLES.OWNER ? 'document/owner/delete' : 'document/charterer/delete';
  const response = await postData(path, body);
  if (!response.error) response.message = 'You have successfully submitted a request to delete a file';
  return {
    ...response,
  };
}

export async function revokeOnSubsDocumentDeletion({ data, role }) {
  const body = onSubsRevokeDocumentDeletionAdapter({ data });
  const path = role === ROLES.OWNER ? 'document/owner/revoke' : 'document/charterer/revoke';
  const response = await postData(path, body);
  if (!response.error) response.message = 'You have successfully canceled your request to delete a file';
  return {
    ...response,
  };
}

export async function failTheSubs({ data, role }) {
  const body = failTheSubsAdapter({ data });
  const path = role === ROLES.OWNER ? 'account/on-subs/owner/fail' : 'account/on-subs/charterer/fail';
  const response = await postData(path, body);
  if (!response.error) response.message = 'You have successfully failed the Subs';
  return {
    ...response,
  };
}
