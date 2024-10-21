'use client';

import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { DynamicLoader, Title } from '@/elements';
import { getUserVesselsSelector } from '@/store/selectors';
import { ExpandableCard } from '@/units';

const AccountPositions = () => {
  const { vessels = [], unassignedVessel, toggle, loading } = useSelector(getUserVesselsSelector);

  const printExpandableCard = (fleet) => {
    return <ExpandableCard className="bg-white" key={fleet.fleetId} data={fleet} expandAll={toggle} />;
  };

  const printContent = useMemo(() => {
    if (loading) return <DynamicLoader />;
    if (vessels?.length > 0) return vessels.map(printExpandableCard);

    if (unassignedVessel?.tankers?.length === 0) return <Title level="3">No opened positions</Title>;

    return null;
  }, [loading, vessels, toggle]);

  return (
    <div className="grow">
      {unassignedVessel?.tankers?.length > 0 && !loading && (
        <ExpandableCard data={unassignedVessel} className="bg-white" expandAll={toggle} />
      )}
      {printContent}
    </div>
  );
};

export default AccountPositions;
