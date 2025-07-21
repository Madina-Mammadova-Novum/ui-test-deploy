import { arrayAdapter } from '@/adapters/common';
import { FIFTEEN_MINUTES_IN_MS } from '@/lib/constants';

export const responseCountdownTimerAdapter = ({ data }) => {
  return arrayAdapter(data);
};

export const responseCountdownConfigsAdapter = ({ data }) => {
  return arrayAdapter(data);
};

export const extendCountdownDataAdapter = (prevOfferDetailsState) => ({
  ...prevOfferDetailsState,
  allowExtension: false,
  countdownData: {
    ...prevOfferDetailsState.countdownData,
    date: prevOfferDetailsState.countdownData.date + FIFTEEN_MINUTES_IN_MS,
  },
});
