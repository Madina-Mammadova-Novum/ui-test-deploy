import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { OFFER } from '@/store/entities/offer/types';

/* Services */
import { sendCounterOfferValidation, sendOfferValidation } from '@/services/offer';
import { getDemurragePaymentTerms, getPaymentTerms } from '@/services/paymentTerms';
import { getVesselFreightFormats } from '@/services/vessel';
import { convertDataToOptions } from '@/utils/helpers';

export const fetchOfferOptions = createAsyncThunk(OFFER.GET_OFFER_OPTIONS, async (tankerId, isCounterOffer = false) => {
  const paymentTermsData = await getPaymentTerms();
  const demurragePaymentTermsData = await getDemurragePaymentTerms();
  const freightFormatsData = await getVesselFreightFormats(tankerId);

  if (isCounterOffer) {
    return {
      data: {
        freightFormats: convertDataToOptions(freightFormatsData, 'id', 'value'),
      },
    };
  }

  return {
    data: {
      paymentTerms: convertDataToOptions(paymentTermsData, 'id', 'name'),
      demurragePaymentTerms: convertDataToOptions(demurragePaymentTermsData, 'id', 'name'),
      freightFormats: convertDataToOptions(freightFormatsData, 'id', 'value'),
    },
  };
});

export const fetchOfferValidation = createAsyncThunk(OFFER.GET_OFFER_VALIDATION, async (data, { rejectWithValue }) => {
  const result = await sendOfferValidation({ data });

  if (result?.error) {
    return rejectWithValue(result?.error);
  }

  return {
    ...result?.data,
  };
});

export const fetchСounterOfferValidation = createAsyncThunk(
  OFFER.GET_COUNTER_OFFER_VALIDATION,
  async (data, { rejectWithValue }) => {
    const result = await sendCounterOfferValidation(data);

    if (result?.error) {
      return rejectWithValue(result?.error);
    }

    return {
      ...result?.data,
    };
  }
);
