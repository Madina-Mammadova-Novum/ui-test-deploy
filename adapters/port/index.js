import { makeId } from '@/utils/helpers';

export const portAdapter = ({ data = [] }) => {
  // todo: create similar structure with other adapters
  return data?.map(({ portId, name }) => ({
    id: portId ?? makeId(),
    value: name ?? '',
    label: name ?? '',
  }));
};
