'use client';

import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { UrlPropTypes } from '@/lib/types';

import { fleetNotificationAdapter } from '@/adapters';
import { Loader, Title } from '@/elements';
import { getUserVesselsSelector } from '@/store/selectors';
import { ExpandableCard } from '@/units';
import { urlParser } from '@/utils/helpers';

const AccountPositionsDetails = ({ searchedParms }) => {
  const { vessels, unassignedVessel, toggle, loading } = useSelector(getUserVesselsSelector);

  const assignedResult = vessels?.find((vessel) => vessel?.fleetId === searchedParms?.id);

  const assignedData = fleetNotificationAdapter({ data: assignedResult, id: searchedParms?.tankerId });
  const unassignedData = fleetNotificationAdapter({ data: unassignedVessel, id: urlParser(searchedParms.id) });

  const printExpandableCard = (fleet) => {
    return <ExpandableCard isOpened className="px-5 my-5 bg-white" key={fleet.id} data={fleet} expandAll={toggle} />;
  };

  const printContent = useMemo(() => {
    if (loading) return <Loader className="h-8 w-8 absolute top-1/2 z-0" />;
    if (assignedData) return [assignedData]?.map(printExpandableCard);
    if (unassignedData) return [unassignedData]?.map(printExpandableCard);

    return <Title level="3">Notification is outdated.</Title>;
  }, [loading, assignedData, unassignedData]);

  return <div className="grow">{printContent}</div>;
};

AccountPositionsDetails.propTypes = UrlPropTypes;

export default AccountPositionsDetails;
