import { arrayAdapter } from '@/adapters/common';

export const assignedTasksAdapter = ({ data }) => {
  return arrayAdapter(data);
};
