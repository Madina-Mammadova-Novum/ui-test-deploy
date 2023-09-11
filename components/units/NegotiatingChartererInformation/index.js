'use client';

import { useEffect, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';

import { useSession } from 'next-auth/react';

import { ChartererInformationContentPropTypes } from '@/lib/types';

import { chartererInformationAdapter } from '@/adapters/vessel';
import { Loader, TextRow, Title } from '@/elements';
import { getOfferDetails } from '@/services/offer';

const NegotiatingChartererInformation = ({ offerId }) => {
  const [loading, setLoading] = useState(true);
  const [chartererInformation, setChartererInformation] = useState([]);

  const { data: session } = useSession();

  useEffect(() => {
    (async () => {
      const { status, data, error } = await getOfferDetails(offerId, session?.role);
      if (status === 200) {
        setChartererInformation(chartererInformationAdapter(data));
      } else {
        console.log(error);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="w-72 h-72">
        <Loader className="h-8 w-8 absolute top-1/2" />
      </div>
    );
  }

  return (
    <>
      <Title level={3} className="mb-5">
        Charterer Information
      </Title>
      {chartererInformation.map(({ title, description, countryCode }) => (
        <TextRow title={title}>
          <ReactCountryFlag countryCode={countryCode} svg className="!w-5 !h-3 mr-1.5" /> {description}
        </TextRow>
      ))}
    </>
  );
};
NegotiatingChartererInformation.propTypes = ChartererInformationContentPropTypes;

export default NegotiatingChartererInformation;
