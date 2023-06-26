'use client';

import { useMemo } from 'react';

import { useSession } from 'next-auth/react';

import { TextRow } from '@/elements';
import { ROLES } from '@/lib';
import CargoesInfoModal from '@/units/CargoesInfoModal';
import ModalWindow from '@/units/ModalWindow';

const AccountAmountOfTankers = ({ data, total }) => {
  const { data: session } = useSession();

  const isCharterer = session?.role === ROLES.CHARTERER;
  const isOwner = session?.role === ROLES.OWNER;

  const printRoleBasedInfoInfo = useMemo(() => {
    if (isCharterer) {
      return (
        <TextRow title="Number of cargoes chartered during the last 6 months ">
          {total} cargoes{' '}
          <ModalWindow
            buttonProps={{
              text: 'See expiriences',
              variant: 'default',
              size: 'medium',
              className: 'normal-case text-blue text-xsm font-normal cursor-pointer !p-0',
            }}
          >
            <CargoesInfoModal data={data} />
          </ModalWindow>
        </TextRow>
      );
    }
    if (isOwner) return <TextRow title="Number of tankers">{total} tankers</TextRow>;
    return null;
  }, [data, isCharterer, isOwner, total]);

  return printRoleBasedInfoInfo;
};

AccountAmountOfTankers.propTypes = {};

export default AccountAmountOfTankers;
