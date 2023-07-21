import { uploadDataAdapter } from '@/adapters/fileAdapter';
// import { postFile } from '@/utils/dataFetching';

export async function uploadData({ data }) {
  const body = uploadDataAdapter({ data });

  // const response = await postFile(`account/upload`, body);

  // return {
  //   ...response,
  // };

  const res = await fetch('https://shiplink-api.azurewebsites.net/v1/file/upload', {
    method: 'POST',
    body,
  });

  if (res.status === 200) return { data: await res.text(), status: res.status, error: null };

  return { data: null, status: res.status, error: 'Failed' };
}
