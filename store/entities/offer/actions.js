import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { OFFER } from '@/store/entities/offer/types';

/* Services */
import { sendOfferValidation } from '@/services/offer';
import { getDemurragePaymentTerms, getPaymentTerms } from '@/services/paymentTerms';
import { getVesselFreightFormats } from '@/services/vessel';
import { convertDataToOptions } from '@/utils/helpers';

export const fetchOfferOptioins = createAsyncThunk(OFFER.GET_OFFER_OPTIONS, async (tankerId) => {
  const paymentTermsData = await getPaymentTerms();
  const demurragePaymentTermsData = await getDemurragePaymentTerms();
  const freightFormatsData = await getVesselFreightFormats(tankerId);

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

  if (result?.data?.message) {
    return rejectWithValue(result?.data?.message);
  }

  return {
    ...result?.data,
  };
});
