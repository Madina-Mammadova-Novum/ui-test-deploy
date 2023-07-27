import { uploadDataAdapter } from '@/adapters/fileAdapter';
import { formatErrors } from '@/utils/helpers';
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

  const result = await res.json();

  if (res.status === 200)
    return {
      data: await res.text(),
      status: res.status,
      errors: {
        title: null,
        message: null,
      },
    };

  return {
    data: null,
    status: res.status,
    errors: {
      title: result?.title,
      message: formatErrors(result?.errors),
    },
  };
}
