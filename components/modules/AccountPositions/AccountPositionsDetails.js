'use client';

import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { UrlPropTypes } from '@/lib/types';

import { Loader, Title } from '@/elements';
import { getUserVesselsSelector } from '@/store/selectors';
import { ExpandableCard } from '@/units';

const AccountPositionsDetails = ({ searchedParms }) => {
  const { vessels, unassignedVessel, toggle, loading } = useSelector(getUserVesselsSelector);

  const searchedResult = vessels?.find((vessel) => vessel?.fleetId === searchedParms?.id);

  const updatedResult = {
    ...searchedResult,
    tankers: searchedResult?.tankers?.map((tanker) => {
      return {
        ...tanker,
        notified: tanker.id === searchedParms?.tankerId || false,
      };
    }),
  };

  const printExpandableCard = useCallback(
    (fleet) => {
      return (
        <ExpandableCard
          className="px-5 my-5 bg-white"
          key={fleet.id}
          data={fleet}
          isOpened={Boolean(searchedParms?.id)}
          expandAll={toggle}
        />
      );
    },
    [toggle]
  );

  const printContent = useMemo(() => {
    if (loading) return <Loader className="h-8 w-8 absolute top-1/2 z-0" />;
    if (updatedResult) return [updatedResult]?.map(printExpandableCard);

    return <Title level="3">Notification is outdated.</Title>;
  }, [loading, updatedResult, printExpandableCard]);

  return (
    <div className="grow">
      <ExpandableCard
        data={unassignedVessel}
        key={unassignedVessel.id}
        className="px-5 my-5 bg-white"
        expandAll={toggle}
      />
      {printContent}
    </div>
  );
};

AccountPositionsDetails.propTypes = UrlPropTypes;

export default AccountPositionsDetails;
