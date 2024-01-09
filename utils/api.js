import { apiErrorAdapter, apiOptionsAdapter, apiSuccessAdapter } from '@/adapters';
import { responseAdapter } from '@/adapters/response';
import { api } from '@/lib/axios';

export const apiHandler = async (options) => {
  try {
    const response = await api.request(apiOptionsAdapter(options));

    return apiSuccessAdapter({ status: response.status, successResponse: response.data });
  } catch (error) {
    return apiErrorAdapter({ status: error.response.status, errorResponse: error.response.data });
  }
};

export const responseHandler = async ({ req, res, dataAdapter, ...rest }) => {
  const response = await apiHandler({ body: req.body, options: req.options, ...rest });
  const data = await dataAdapter({ data: response.data });

  return res.status(response.status).json({ ...response, ...responseAdapter(data) });
};
