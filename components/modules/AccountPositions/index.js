'use client';

import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Loader, Title } from '@/elements';
import { getUserVesselsSelector } from '@/store/selectors';
import { ExpandableCard } from '@/units';

const AccountPositions = () => {
  const { vessels = [], unassignedVessel, toggle, loading } = useSelector(getUserVesselsSelector);

  const printExpandableCard = (fleet) => {
    return <ExpandableCard className="bg-white" key={fleet.id} data={fleet} expandAll={toggle} />;
  };

  const printContent = useMemo(() => {
    if (loading) return <Loader className="h-8 w-8 absolute top-1/2 z-0" />;
    if (vessels?.length > 0) return vessels.map(printExpandableCard);

    return <Title level="3">No opened positions</Title>;
  }, [loading, vessels, toggle]);

  return (
    <div className="grow">
      {unassignedVessel?.tankers?.length > 0 && (
        <ExpandableCard data={unassignedVessel} className="bg-white" expandAll={toggle} />
      )}
      {printContent}
    </div>
  );
};

export default AccountPositions;
