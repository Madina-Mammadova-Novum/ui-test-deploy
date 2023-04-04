import React, { useState } from 'react';
import PropTypes from 'prop-types'
import SearchSVG from '@/assets/images/search.svg';
import { Button, NextLink, Table, Tabs } from '@/elements';
import {
  expandedNegotiatingRowTabs,
  negotiatingCounterofferTableHeader,
  negotiatingCounterofferTableRow,
  negotiatingFailedTableHeader,
  negotiatingFailedTableRow,
  negotiatingIncomingTableHeader,
  negotiatingIncomingTableRow,
} from '@/utils/mock';


const NegotiatingExpandedData = ({ isCharterer }) => {
  const [currentTab, setCurrentTab] = useState(expandedNegotiatingRowTabs[0].value);
  return (
    <div className={isCharterer && 'pb-3'}>
      <Tabs
        onClick={setCurrentTab}
        defaultTab={expandedNegotiatingRowTabs[0].value}
        activeTab={currentTab}
        tabs={expandedNegotiatingRowTabs}
        customStyles="my-3 mx-auto"
      />
      {currentTab === 'incoming' && (
        <Table headerData={negotiatingIncomingTableHeader} rows={negotiatingIncomingTableRow} />
      )}
      {currentTab === 'counteroffers' && (
        <Table headerData={negotiatingCounterofferTableHeader} rows={negotiatingCounterofferTableRow} />
      )}
      {currentTab === 'failed' && <Table headerData={negotiatingFailedTableHeader} rows={negotiatingFailedTableRow} />}

      {isCharterer && (
        <NextLink href="/search">
          <Button
            customStyles="text-xsm ml-auto"
            buttonProps={{
              text: 'Search for Alternative Tankers',
              variant: 'secondary',
              size: 'large',
              icon: <SearchSVG className="w-4 fill-white" />,
            }}
          />
        </NextLink>
      )}
    </div>
  );
};

NegotiatingExpandedData.defaultProps = {
  isCharterer: false
}

NegotiatingExpandedData.propTypes = {
  isCharterer: PropTypes.bool
}

export default NegotiatingExpandedData;
