'use client';

import { useEffect, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useSelector } from 'react-redux';

import { NegotiatingTankerInformationPropTypes } from '@/lib/types';

import { tankerInformationAdapter } from '@/adapters/vessel';
import { Divider, FieldsetContent, Loader, TextRow, Title } from '@/elements';
import { getOfferDetails } from '@/services/offer';
import { getUserDataSelector } from '@/store/selectors';
import { errorToast } from '@/utils/hooks';

const NegotiatingTankerInformation = ({ offerId }) => {
  const [loading, setLoading] = useState(true);

  const [tankerInformation, setTankerInformation] = useState({
    ownerInfo: [],
    tankerInfo: [],
  });

  const { role } = useSelector(getUserDataSelector);

  const { ownerInfo, tankerInfo } = tankerInformation;

  const fetchTankerInfo = async () => {
    const { data, error } = await getOfferDetails(offerId, role);

    if (data) {
      setTankerInformation(tankerInformationAdapter(data));
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
      <div className="w-72 h-72">
        <Loader className="h-8 w-8 absolute top-3/4" />
      </div>
    );
  }

  return (
    <div className="w-[610px] mx-5">
      <Title level="2">Tanker Information</Title>

      <FieldsetContent label="About the Vessel Owner" className="mt-3">
        {ownerInfo.map(({ title, description }) => (
          <TextRow title={title}>{description}</TextRow>
        ))}
      </FieldsetContent>

      <Divider className="my-3" />

      {!!tankerInfo.length && (
        <FieldsetContent label="About the Tanker">
          <div className="text-xs flex gap-x-5">
            <div className="w-full">
              {tankerInfo.slice(0, 9).map(({ title, description, countryCode }) => (
                <TextRow title={title}>
                  <ReactCountryFlag countryCode={countryCode} style={{ marginRight: '3px' }} />
                  {description}
                </TextRow>
              ))}
            </div>

            <div className="w-full">
              {tankerInfo.slice(9).map(({ title, description, countryCode }) => (
                <TextRow title={title} className={`${countryCode && 'flex flex-col'}`}>
                  <ReactCountryFlag countryCode={countryCode} style={{ marginRight: '3px' }} />
                  {description}
                </TextRow>
              ))}
            </div>
          </div>
        </FieldsetContent>
      )}
    </div>
  );
};

NegotiatingTankerInformation.propTypes = NegotiatingTankerInformationPropTypes;

export default NegotiatingTankerInformation;
