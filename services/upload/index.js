import { uploadDataAdapter } from '@/adapters/fileAdapter';
import { postFile } from '@/utils/dataFetching';

export async function uploadData({ data }) {
  const { file } = uploadDataAdapter({ data });

  const response = await postFile(`account/upload`, file);

  return {
    ...response,
  };
}
