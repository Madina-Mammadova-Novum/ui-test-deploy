'use client';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { UrlPropTypes } from '@/lib/types';

import { fleetNotificationAdapter } from '@/adapters';
import { Loader, Title } from '@/elements';
import { resetDealData } from '@/store/entities/notifications/slice';
import { setToggle } from '@/store/entities/positions/slice';
import { getUserVesselsSelector } from '@/store/selectors';
import { ExpandableCard } from '@/units';
import { urlParser } from '@/utils/helpers';

const AccountPositionsDetails = ({ searchedParms }) => {
  const dispatch = useDispatch();
  const { vessels, unassignedVessel, toggle, loading } = useSelector(getUserVesselsSelector);

  const assignedResult = vessels?.find((vessel) => vessel?.fleetId === searchedParms?.id);

  const assignedData = fleetNotificationAdapter({ data: assignedResult, id: searchedParms?.tankerId });
  const unassignedData = fleetNotificationAdapter({ data: unassignedVessel, id: urlParser(searchedParms.id) });

  useEffect(() => {
    dispatch(setToggle(true));

    return () => {
      dispatch(setToggle(false));
      dispatch(resetDealData());
    };
  }, []);

  const printExpandableCard = (fleet) => {
    return <ExpandableCard key={fleet.id} data={fleet} expandAll={toggle} className="px-5 my-5 bg-white" />;
  };

  const printContent = useMemo(() => {
    if (loading) return <Loader className="h-8 w-8 absolute top-1/2 z-0" />;
    if (assignedData) return [assignedData].map(printExpandableCard);
    if (unassignedData) return [unassignedData].map(printExpandableCard);

    return <Title level="3">Notification is outdated.</Title>;
  }, [loading, assignedData, unassignedData, toggle]);

  return <div className="grow">{printContent}</div>;
};

AccountPositionsDetails.propTypes = UrlPropTypes;

export default AccountPositionsDetails;
