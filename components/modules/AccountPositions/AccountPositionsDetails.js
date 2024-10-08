'use client';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { UrlPropTypes } from '@/lib/types';

import { fleetNotificationAdapter } from '@/adapters';
import { Loader, Title } from '@/elements';
import { setToggle } from '@/store/entities/positions/slice';
import { getUserVesselsSelector } from '@/store/selectors';
import { ExpandableCard } from '@/units';
import { urlParser } from '@/utils/helpers';

const AccountPositionsDetails = ({ searchedParams }) => {
  const dispatch = useDispatch();
  const { vessels, unassignedVessel, toggle, loading } = useSelector(getUserVesselsSelector);

  const assignedResult = vessels?.find((vessel) => vessel?.fleetId === searchedParams?.id);

  const assignedData = fleetNotificationAdapter({ data: assignedResult, id: searchedParams?.tankerId });
  const unassignedData = fleetNotificationAdapter({ data: unassignedVessel, id: urlParser(searchedParams.id) });

  useEffect(() => {
    dispatch(setToggle(true));
  }, []);

  const printExpandableCard = (fleet) => {
    return <ExpandableCard key={fleet.id} data={fleet} expandAll={toggle} className="my-5 bg-white px-5" />;
  };

  const printContent = useMemo(() => {
    if (loading) return <Loader className="absolute top-1/2 z-0 h-8 w-8" />;
    if (assignedData) return [assignedData].map(printExpandableCard);
    if (unassignedData) return [unassignedData].map(printExpandableCard);

    return <Title level="3">Notification is outdated.</Title>;
  }, [loading, assignedData, unassignedData, toggle]);

  return <div className="grow">{printContent}</div>;
};

AccountPositionsDetails.propTypes = UrlPropTypes;

export default AccountPositionsDetails;
