import { arrayAdapter } from '@/adapters/common';

export const responseCountdownTimerAdapter = ({ data }) => {
  return arrayAdapter(data);
};

export const responseCountdownConfigsAdapter = ({ data }) => {
  return arrayAdapter(data);
};

export const extendCountdownDataAdapter = (prevOfferDetailsState, extendMinutes = 15) => {
  const extensionTimeInMs = extendMinutes * 60 * 1000; // Convert minutes to milliseconds
  return {
    ...prevOfferDetailsState,
    allowExtension: false,
    countdownData: {
      ...prevOfferDetailsState.countdownData,
      date: prevOfferDetailsState.countdownData.date + extensionTimeInMs,
    },
  };
};
