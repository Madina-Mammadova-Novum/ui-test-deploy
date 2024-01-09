import { apiErrorAdapter, apiOptionsAdapter, apiSuccessAdapter } from '@/adapters';
import { responseAdapter } from '@/adapters/response';
import { api } from '@/lib/axios';

export const apiHandler = async (options) => {
  try {
    const response = await api.request(apiOptionsAdapter(options));

    return apiSuccessAdapter(response.status, response.data);
  } catch (error) {
    return apiErrorAdapter(error.response.status, error.response.statusText, error.message);
  }
};

export const responseHandler = async ({ req, res, dataAdapter, ...rest }) => {
  const response = await apiHandler({ body: req.body, options: req.options, ...rest });
  const data = await dataAdapter({ data: response.data });

  return res.status(response.status).json({ ...response, ...responseAdapter(data) });
};
