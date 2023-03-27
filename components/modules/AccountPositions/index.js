'use client';

import PropTypes from 'prop-types';

import { ExpandableCard } from '@/units';

const AccountPositions = ({ data, containerClass }) => {
  const printExpandable = (fleet) => <ExpandableCard key={fleet.id} data={fleet} />;

  return <div className={containerClass}>{data?.map(printExpandable)}</div>;
};

AccountPositions.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  containerClass: PropTypes.string,
};

export default AccountPositions;
