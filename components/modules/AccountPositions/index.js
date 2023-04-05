'use client';

import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import { getUserPositions } from '@/services';
import { ExpandableCard } from '@/units';
import { Loader } from '@/elements';

const AccountPositions = ({ containerClass }) => {
  const [userPositions, setUserPositions] = useState(null);

  const fetchData = async () => {
    const data = await getUserPositions();
    setUserPositions(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const printExpandable = (fleet) => <ExpandableCard key={fleet.id} data={fleet} />;

  return (
    <section className={containerClass}>{userPositions ? userPositions?.map(printExpandable) : <Loader />}</section>
  );
};

AccountPositions.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  containerClass: PropTypes.string,
};

export default AccountPositions;
