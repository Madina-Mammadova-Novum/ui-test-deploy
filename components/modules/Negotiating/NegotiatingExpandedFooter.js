'use client';

import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/navigation';

import { NegotiatingExpandedFooterPropTypes } from '@/lib/types';

import { prefilledSearchDataAdapter } from '@/adapters/negotiating';
import SearchSVG from '@/assets/images/search.svg';
import { Button } from '@/elements';
import { ROUTES } from '@/lib';
import { getOfferDetails } from '@/services/offer';
import { setSearchParams } from '@/store/entities/search/slice';
import { getNegotiatingDataSelector } from '@/store/selectors';
import { ExpandableRowFooter } from '@/units';
import { errorToast } from '@/utils/hooks';

const NegotiatingExpandedFooter = ({ isCharterer = false, cargoId }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { offerById, role } = useSelector(getNegotiatingDataSelector);
  const { incoming, sent, failed } = offerById[cargoId];

  const handleSearchForAlternatives = async () => {
    const offerId = [...incoming, ...sent, ...failed][0]?.id;
    const { data, errors } = await getOfferDetails(offerId, role);

    if (!errors) {
      dispatch(setSearchParams(prefilledSearchDataAdapter({ data, isAlternative: true })));
      router.push(ROUTES.ACCOUNT_SEARCH);
    } else {
      errorToast(errors?.title, errors?.message);
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
