import { uploadDataAdapter } from '@/adapters/fileAdapter';
import { formatErrors } from '@/utils/helpers';
// import { postFile } from '@/utils/dataFetching';

export async function uploadData({ data }) {
  const body = uploadDataAdapter({ data });

  // const response = await postFile(`account/upload`, body);

  // return {
  //   ...response,
  // };

  const res = await fetch(`${process.env.NEXT_PUBLIC_FILE_API_URL}/v1/file/upload`, {
    method: 'POST',
    body,
  });

  const result = await res.text();

  if (res.status === 200)
    return {
      data: result,
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
      title: result?.title || 'Upload failed',
      message: formatErrors(result?.errors),
    },
  };
}
