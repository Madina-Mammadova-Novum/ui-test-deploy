import React, { useMemo } from 'react';

import { useSession } from 'next-auth/react';

import { VoyageDetailsTabContentPropTypes } from '@/lib/types';

import { IconComponent, TextRow, Title } from '@/elements';
import { ROLES } from '@/lib';
import VoyageChartererTabContent from '@/units/VoyageDetailsTabContent/VoyageChartererTabContent';

const VoyageDetailsTabContent = ({ data = {} }) => {
  const { data: session } = useSession();

  const printRoleBasedSection = useMemo(() => {
    if (session?.role === ROLES.OWNER) {
      return null;
    }
    if (session?.role === ROLES.CHARTERER) {
      return <VoyageChartererTabContent />;
    }
    return null;
  }, [session?.role]);

  const printPairDates = (detail) => <TextRow title={detail.key}>{detail.label}</TextRow>;

  return (
    <div>
      <div className="flex justify-between">
        <Title level={3}>Voyage details</Title>
        <div className="flex relative">{printRoleBasedSection}</div>
      </div>

      <div className="text-xsm mt-2.5">
        <Title level={5} className="uppercase text-[12px] text-gray font-semibold">
          dates
        </Title>
        {data.dates.map((pair) => (
          <div className="mt-2.5">{pair.map(printPairDates)}</div>
        ))}

        <hr className="my-4" />

        <Title level={5} className="uppercase text-[12px] text-gray font-semibold">
          ports
        </Title>

        {data.ports.map((pair) => (
          <div className="mt-2.5">
            {pair.map((detail) => (
              <TextRow title={detail.key}>
                <IconComponent icon={detail.countryFlag} />
                {detail.label}
              </TextRow>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

VoyageDetailsTabContent.propTypes = VoyageDetailsTabContentPropTypes;

export default VoyageDetailsTabContent;
