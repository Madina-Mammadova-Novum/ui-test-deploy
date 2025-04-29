import { arrayAdapter } from '@/adapters/common';

export const responseCargoSentOffersAdapter = ({ data }) => arrayAdapter(data);

export const responseCargoCounteroffersAdapter = ({ data }) => arrayAdapter(data);

export const responseCargoFailedOffersAdapter = ({ data }) => arrayAdapter(data);
