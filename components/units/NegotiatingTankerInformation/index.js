'use client';

import { useEffect, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useSelector } from 'react-redux';

import { NegotiatingTankerInformationPropTypes } from '@/lib/types';

import { tankerInformationAdapter } from '@/adapters/vessel';
import { Divider, FieldsetContent, Loader, TextRow, Title } from '@/elements';
import { getOfferDetails } from '@/services/offer';
import { getUserDataSelector } from '@/store/selectors';

const NegotiatingTankerInformation = ({ offerId }) => {
  const [loading, setLoading] = useState(true);
  const [tankerInformation, setTankerInformation] = useState({});

  const { role } = useSelector(getUserDataSelector);

  const { ownerInfo = [], tankerInfo = [] } = tankerInformation;

  useEffect(() => {
    (async () => {
      const { status, data, error } = await getOfferDetails(offerId, role);
      if (status === 200) {
        setTankerInformation(tankerInformationAdapter(data));
      } else {
        console.error(error);
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
    <div className="w-[610px]">
      <Title level={2}>Tanker Information</Title>

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
