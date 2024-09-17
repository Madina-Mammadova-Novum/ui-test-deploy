'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useRouter } from 'next/navigation';

import { UrlPropTypes } from '@/lib/types';

import { prefilledSaveSearchDataAdapter } from '@/adapters/negotiating';
import { DynamicLoader } from '@/elements';
import TankerSearch from '@/modules/TankerSearch';
import { getSavedSearchDetail } from '@/services/savedSearch';
import { setPrefilledSearchData } from '@/store/entities/search/slice';

export default function Page({ params }) {
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const { searchId } = params;
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchId) {
      const fetchSavedSearch = async () => {
        const { data, status, error } = await getSavedSearchDetail({ searchId });
        if (status === 200) {
          const prefilledData = prefilledSaveSearchDataAdapter({ data, isSavedSearch: true });
          dispatch(setPrefilledSearchData(prefilledData));
        } else if (error) {
          console.error('Error fetching saved search:', error);
          router.push('/account/search');
        }

        setIsLoading(false);
      };
      fetchSavedSearch();
    }
  }, [searchId, dispatch]);

  if (isLoading) return <DynamicLoader />;

  return <TankerSearch isAccountSearch />;
}

Page.propTypes = UrlPropTypes;
