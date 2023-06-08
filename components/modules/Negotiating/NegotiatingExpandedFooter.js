import { NegotiatingExpandedFooterPropTypes } from '@/lib/types';

import SearchSVG from '@/assets/images/search.svg';
import { Button, NextLink } from '@/elements';
import { ROUTES } from '@/lib';
import { ExpandableRowFooter, Tabs } from '@/units';

const NegotiatingExpandedFooter = ({ isCharterer = false, setCurrentTab, currentTab, tabs }) => {
  return isCharterer ? (
    <ExpandableRowFooter>
      <Tabs
        onClick={({ target }) => setCurrentTab(target.value)}
        activeTab={currentTab}
        tabs={tabs}
        customStyles="my-3 mr-[-50%] mx-auto absolute left-1/2 top-[7%] translate-(x/y)-1/2 custom-container "
      />
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

NegotiatingExpandedFooter.propTypes = NegotiatingExpandedFooterPropTypes;

export default NegotiatingExpandedFooter;
