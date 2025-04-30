import { objectAdapter } from '@/adapters/common';

export const requestDeactivateAccountAdapter = ({ data }) => objectAdapter(data);

export const responseDeactivateAccountAdapter = ({ data }) => objectAdapter(data);
