'use client';

import { use, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';

import { DynamicLoader } from '@/elements';
import { NotFound } from '@/modules';
import { getOfferDetails } from '@/services/offer';
import { getCookieFromBrowser, notificationPathGenerator } from '@/utils/helpers';

const DealRedirectPage = (props) => {
  const params = use(props.params);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const { id } = params;

  const role = getCookieFromBrowser('session-user-role');

  const getOfferDetail = async () => {
    const { data, error } = await getOfferDetails(id, role);

    if (error) {
      return setIsLoading(false);
    }

    const route = notificationPathGenerator({ data, role });

    if (route) {
      router.push(route);
    }

    return data;
  };

  useEffect(() => {
    getOfferDetail();
  }, []);

  return (
    <>
      {isLoading ? (
        <section className="relative flex min-h-screen items-center justify-center">
          <DynamicLoader />
        </section>
      ) : (
        <NotFound
          message={role ? 'Deal is not found' : 'Login Required'}
          messageDetail={
            role
              ? 'It seems that we can’t find the deal you’re looking for.'
              : 'You need to be logged in to view this deal.'
          }
        />
      )}
      <div />
    </>
  );
};

DealRedirectPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default DealRedirectPage;
