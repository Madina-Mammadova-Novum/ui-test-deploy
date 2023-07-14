import { uploadResponseAdapter } from '@/adapters/fileAdapter';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';

export default async function handler(req, res) {
  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/file/upload`),
    dataAdapter: uploadResponseAdapter,
    requestMethod: 'POST',
    options: {
      headers: {
        'Content-Type': `multipart/form-data; boundary=None;`,
      },
    },
  });
}
