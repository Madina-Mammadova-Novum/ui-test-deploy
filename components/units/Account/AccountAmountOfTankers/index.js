'use client';

import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { TextRow } from '@/elements';
import { getUserDataSelector } from '@/store/selectors';
import CargoesInfoModal from '@/units/CargoesInfoModal';
import ModalWindow from '@/units/ModalWindow';
import { getRoleIdentity } from '@/utils/helpers';

const AccountAmountOfTankers = ({ data, total }) => {
  const { role } = useSelector(getUserDataSelector);

  const { isCharterer, isOwner } = getRoleIdentity({ role });

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
