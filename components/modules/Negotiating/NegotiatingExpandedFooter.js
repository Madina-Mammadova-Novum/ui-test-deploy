import PropTypes from 'prop-types';

import SearchSVG from '@/assets/images/search.svg';
import { Button, NextLink } from '@/elements';
import { ROUTES } from '@/lib';
import { ExpandableRowFooter } from '@/units';

const NegotiatingExpandedFooter = ({ isCharterer }) => {
  return isCharterer ? (
    <ExpandableRowFooter>
      <NextLink href={ROUTES.ACCOUNT_SEARCH}>
        <Button
          customStyles="text-xsm ml-auto"
          buttonProps={{
            text: 'Search for Alternative Tankers',
            variant: 'secondary',
            size: 'large',
            icon: { before: <SearchSVG className="w-4 fill-white" /> },
          }}
        />
      </NextLink>
    </ExpandableRowFooter>
  ) : null;
};

NegotiatingExpandedFooter.defaultProps = {
  isCharterer: false,
};

NegotiatingExpandedFooter.propTypes = {
  isCharterer: PropTypes.bool,
};

export default NegotiatingExpandedFooter;
