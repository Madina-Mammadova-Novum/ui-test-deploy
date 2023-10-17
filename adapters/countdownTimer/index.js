import { FIFTEEN_MINUTES_IN_MS } from '@/lib/constants';

export const responseCountdownTimerAdapter = ({ data }) => {
  if (!data) return [];
  return data;
};

export const extendCountdownDataAdapter = (prevOfferDetailsState) => ({
  ...prevOfferDetailsState,
  allowExtension: false,
  countdownData: {
    ...prevOfferDetailsState.countdownData,
    date: prevOfferDetailsState.countdownData.date + FIFTEEN_MINUTES_IN_MS,
  },
});
