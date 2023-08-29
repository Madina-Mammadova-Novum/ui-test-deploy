'use client';

import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { NegotiatingExpandedFooterPropTypes } from '@/lib/types';

import { prefilledSearchDataAdapter } from '@/adapters/negotiating';
import SearchSVG from '@/assets/images/search.svg';
import { Button } from '@/elements';
import { ROUTES } from '@/lib';
import { getOfferDetails } from '@/services/offer';
import { setPrefilledSearchData } from '@/store/entities/search/slice';
import { negotiatingSelector } from '@/store/selectors';
import { ExpandableRowFooter } from '@/units';

const NegotiatingExpandedFooter = ({ isCharterer = false, cargoId }) => {
  const { data: session } = useSession();
  const { negotiatingOffers } = useSelector(negotiatingSelector);

  const {
    incoming = [],
    sent = [],
    failed = [],
  } = useMemo(() => negotiatingOffers[cargoId] || {}, [negotiatingOffers[cargoId]]);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleSearchForAlternatives = async () => {
    const offerId = [...incoming, ...sent, ...failed][0]?.id;
    const { status, data, error } = await getOfferDetails(offerId, session?.role);
    if (status === 200) {
      dispatch(setPrefilledSearchData(prefilledSearchDataAdapter({ data })));
      router.push(ROUTES.ACCOUNT_SEARCH);
    } else {
      console.log(error);
    }
  };
  return (
    <ExpandableRowFooter>
      {isCharterer && (
        <Button
          customStyles="text-xsm ml-auto"
          buttonProps={{
            text: 'Search for Alternative Tankers',
            variant: 'secondary',
            size: 'large',
            icon: { before: <SearchSVG className="fill-white" viewBox="0 0 24 24" /> },
          }}
          onClick={handleSearchForAlternatives}
        />
      )}
    </ExpandableRowFooter>
  );
};

NegotiatingExpandedFooter.propTypes = NegotiatingExpandedFooterPropTypes;

export default NegotiatingExpandedFooter;
