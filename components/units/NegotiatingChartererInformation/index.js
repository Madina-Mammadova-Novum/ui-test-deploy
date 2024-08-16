'use client';

import { useEffect, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useSelector } from 'react-redux';

import { ChartererInformationContentPropTypes } from '@/lib/types';

import { chartererInformationAdapter } from '@/adapters/vessel';
import { Loader, TextRow, Title } from '@/elements';
import { getOfferDetails } from '@/services/offer';
import { getUserDataSelector } from '@/store/selectors';
import { errorToast } from '@/utils/hooks';

const NegotiatingChartererInformation = ({ offerId }) => {
  const [loading, setLoading] = useState(true);
  const [chartererInformation, setChartererInformation] = useState([]);

  const { role } = useSelector(getUserDataSelector);

  const fetchTankerInfo = async () => {
    const { data, error } = await getOfferDetails(offerId, role);

    if (data) {
      setChartererInformation(chartererInformationAdapter(data));
    } else {
      errorToast(error.title, error.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchTankerInfo();
  }, []);

  if (loading) {
    return (
      <div className="h-72 w-72">
        <Loader className="absolute top-3/4 h-8 w-8" />
      </div>
    );
  }

  return (
    <>
      <Title level="3" className="mb-5">
        Charterer Information
      </Title>
      {chartererInformation?.map(({ title, description, countryCode }) => (
        <TextRow title={title}>
          <ReactCountryFlag countryCode={countryCode} svg className="mr-1.5 !h-3 !w-5" /> {description}
        </TextRow>
      ))}
    </>
  );
};
NegotiatingChartererInformation.propTypes = ChartererInformationContentPropTypes;

export default NegotiatingChartererInformation;
