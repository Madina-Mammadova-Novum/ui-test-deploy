import { createAsyncThunk } from '@reduxjs/toolkit';

/* Types */
import { OFFER } from '@/store/entities/offer/types';

/* Services */
import { getDemurragePaymentTerms, getPaymentTerms } from '@/services/paymentTerms';
import { getVesselFreightFormats } from '@/services/vessel';
import { convertDataToOptions } from '@/utils/helpers';

export const fetchOfferOptioins = createAsyncThunk(OFFER.GET_OFFER_OPTIONS, async (tankerId) => {
  const [paymentTermsData, demurragePaymentTermsData, freightFormatsData] = await Promise.all([
    getPaymentTerms(),
    getDemurragePaymentTerms(),
    getVesselFreightFormats(tankerId),
  ]);

  return {
    data: {
      paymentTerms: convertDataToOptions(paymentTermsData, 'id', 'name'),
      demurragePaymentTerms: convertDataToOptions(demurragePaymentTermsData, 'id', 'name'),
      freightFormats: convertDataToOptions(freightFormatsData, 'id', 'value'),
    },
  };
});
