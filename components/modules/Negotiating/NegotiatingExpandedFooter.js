import { NegotiatingExpandedFooterPropTypes } from '@/lib/types';

import SearchSVG from '@/assets/images/search.svg';
import { Button, NextLink } from '@/elements';
import { ROUTES } from '@/lib';
import { ExpandableRowFooter } from '@/units';

const NegotiatingExpandedFooter = ({ isCharterer = false }) => {
  return isCharterer ? (
    <ExpandableRowFooter>
      <NextLink href={ROUTES.ACCOUNT_SEARCH}>
        <Button
          customStyles="text-xsm ml-auto"
          buttonProps={{
            text: 'Search for Alternative Tankers',
            variant: 'secondary',
            size: 'large',
            icon: { before: <SearchSVG className="w-4 h-4 fill-white" viewBox="0 0 24 24" /> },
          }}
        />
      </NextLink>
    </ExpandableRowFooter>
  ) : null;
};

NegotiatingExpandedFooter.propTypes = NegotiatingExpandedFooterPropTypes;

export default NegotiatingExpandedFooter;
