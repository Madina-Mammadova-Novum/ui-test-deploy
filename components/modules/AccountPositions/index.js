'use client';

import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Loader, Title } from '@/elements';
import { getUserVesselsSelector } from '@/store/selectors';
import { ExpandableCard } from '@/units';

const AccountPositions = () => {
  const { vessels, unassignedVessel, toggle, loading } = useSelector(getUserVesselsSelector);

  const printExpandableCard = (fleet) => {
    return <ExpandableCard className="px-5 my-5 bg-white" key={fleet.id} data={fleet} expandAll={toggle} />;
  };

  const printContent = useMemo(() => {
    if (loading) return <Loader className="h-8 w-8 absolute top-1/2 z-0" />;
    if (vessels?.length)
      return (
        <>
          <ExpandableCard
            data={unassignedVessel}
            key={unassignedVessel.id}
            className="px-5 my-5 bg-white"
            expandAll={toggle}
          />
          {vessels?.map(printExpandableCard)}
        </>
      );

    return <Title level="3">No opened positions</Title>;
  }, [loading, toggle, vessels, unassignedVessel, printExpandableCard]);

  return <div className="grow">{printContent}</div>;
};

export default AccountPositions;
