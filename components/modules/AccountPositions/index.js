'use client';

import PropTypes from 'prop-types';

import { getUserPositions } from '@/services';
import { ExpandableCard } from '@/units';

const AccountPositions = async ({ containerClass }) => {
  const data = await getUserPositions();
  const printExpandable = (fleet) => <ExpandableCard key={fleet.id} data={fleet} />;

  return <section className={containerClass}>{data?.map(printExpandable)}</section>;
};

AccountPositions.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  containerClass: PropTypes.string,
};

export default AccountPositions;
