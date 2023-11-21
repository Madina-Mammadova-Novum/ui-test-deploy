import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { negotiatingExpandedContentPropTypes } from '@/lib/types';

import { counteroffersTabDataByRole, failedTabDataByRole, offerTabDataByRole } from '@/adapters/negotiating';
import { Table } from '@/elements';
import { getNegotiatingDataSelector } from '@/store/selectors';
import { Tabs } from '@/units';
import { getRoleIdentity } from '@/utils/helpers';
import {
  chartererNegotiatingCounterofferTableHeader,
  chartererNegotiatingFailedTableHeader,
  negotiatingIncomingTableHeader,
  negotiatingSentOffersTableHeader,
  ownerNegotiatingCounterofferTableHeader,
  ownerNegotiatingFailedTableHeader,
} from '@/utils/mock';

const NegotiatingExpandedContent = ({ data, tab, tabs }) => {
  const [currentTab, setCurrentTab] = useState(tab || tabs?.[0]?.value);
  const { offerById, role } = useSelector(getNegotiatingDataSelector);

  const { isOwner } = getRoleIdentity({ role });

  const { incoming = [], sent = [], failed = [] } = offerById[data.id];

  const tabContent = useMemo(() => {
    return {
      counteroffers: (
        <Table
          headerData={isOwner ? ownerNegotiatingCounterofferTableHeader : chartererNegotiatingCounterofferTableHeader}
          rows={counteroffersTabDataByRole({ data: sent, role, parentId: data.id })}
          noDataMessage="No data provided"
        />
      ),
      failed: (
        <Table
          headerData={isOwner ? ownerNegotiatingFailedTableHeader : chartererNegotiatingFailedTableHeader}
          rows={failedTabDataByRole({ data: failed, role })}
          noDataMessage="No data provided"
        />
      ),
      incoming: (
        <Table
          headerData={isOwner ? negotiatingIncomingTableHeader : negotiatingSentOffersTableHeader}
          rows={offerTabDataByRole({ data: incoming, role, parentId: data.id })}
          noDataMessage="No data provided"
        />
      ),
    }[currentTab];
  }, [currentTab]);

  return (
    <>
      <Tabs
        onClick={({ target }) => setCurrentTab(target.value)}
        activeTab={currentTab}
        tabs={tabs}
        customStyles="my-3 mr-[-50%] mx-auto absolute left-1/2 top-[7%] translate-(x/y)-1/2 custom-container "
      />
      <div className="mb-3 table-scroll">{tabContent}</div>
    </>
  );
};

NegotiatingExpandedContent.propTypes = negotiatingExpandedContentPropTypes;

export default NegotiatingExpandedContent;
