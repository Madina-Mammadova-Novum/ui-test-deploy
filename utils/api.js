import {
  apiErrorAdapter,
  apiOptionsAdapter,
  apiSuccessAdapter,
  errorResponseAdapter,
  successResponseAdapter,
} from '@/adapters/api';
import { responseAdapter } from '@/adapters/response';
import { api } from '@/lib/axios';

export const apiHandler = async (options) => {
  try {
    const response = await api.request(apiOptionsAdapter(options));
    return apiSuccessAdapter(successResponseAdapter(response));
  } catch (error) {
    return apiErrorAdapter(errorResponseAdapter(error));
  }
};

export const responseHandler = async ({ req, res, dataAdapter, ...rest }) => {
  const response = await apiHandler({
    body: req.body,
    options: { ...req?.options, headers: { ...req?.options?.headers, 'X-Forwarded-For': '172.211.210.40' } },
    ...rest,
  });

  const data = await dataAdapter({ data: response.data });

  return res.status(response.status).json({ ...response, ...responseAdapter(data) });
};
