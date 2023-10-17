import {
  failTheSubsAdapter,
  onSubsAddDocumentAdapter,
  onSubsRequestDocumentDeletionAdapter,
  onSubsRevokeDocumentDeletionAdapter,
} from '@/adapters';
import { ROLES } from '@/lib';
import { postData } from '@/utils/dataFetching';

export async function uploadDocument({ data, role }) {
  const body = onSubsAddDocumentAdapter({ data });
  const path = role === ROLES.OWNER ? 'document/owner/add' : 'document/charterer/add';
  const response = await postData(path, body);
  if (!response.error) response.message = 'Your file has been uploaded';
  return {
    ...response,
  };
}

export async function requestDocumentDeletion({ data, role }) {
  const body = onSubsRequestDocumentDeletionAdapter({ data });
  const path = role === ROLES.OWNER ? 'document/owner/delete' : 'document/charterer/delete';
  const response = await postData(path, body);
  if (!response.error) response.message = 'You have requested to delete a file';
  return {
    ...response,
  };
}

export async function revokeDocumentDeletion({ data, role }) {
  const body = onSubsRevokeDocumentDeletionAdapter({ data });
  const path = role === ROLES.OWNER ? 'document/owner/revoke' : 'document/charterer/revoke';
  const response = await postData(path, body);
  if (!response.error) response.message = 'You have canceled to delete a file';
  return {
    ...response,
  };
}

export async function failTheSubs({ data }) {
  const body = failTheSubsAdapter({ data });
  const path = 'account/on-subs/fail';
  const response = await postData(path, body);
  if (!response.error) response.message = 'You have successfully failed the Subs';
  return {
    ...response,
  };
}
