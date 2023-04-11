'use client';

import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import { Loader, SimpleSelect } from '@/elements';
import { getUserPositions } from '@/services';
import { ExpandableCard } from '@/units';

const AccountPositions = ({ containerClass }) => {
  const options = ['ascending', 'descending'];

  const [userStore, setUserStore] = useState({
    positionOptions: options,
    positionSortType: options[0],
    userPositions: null,
  });

  /* Change handler by key-value for userStore */
  const handleChangeState = (key, value) => {
    setUserStore((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleChange = (option) => handleChangeState('positionSortType', option);

  /* fetching user positions data */
  const fetchData = async () => {
    const data = await getUserPositions();
    handleChangeState('userPositions', data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const printExpandable = (fleet) => <ExpandableCard key={fleet.id} data={fleet} />;

  const { positionOptions, positionSortType, userPositions } = userStore;

  return (
    <section className={containerClass}>
      {userPositions ? (
        <div className="flex flex-col">
          <div className="flex justify-end items-center relative -top-14 gap-x-2.5">
            <SimpleSelect
              label="Sort by open day:"
              currentItem={positionSortType}
              selectableItems={positionOptions}
              onChange={handleChange}
            />
          </div>
          {userPositions?.map(printExpandable)}
        </div>
      ) : (
        <Loader />
      )}
    </section>
  );
};

AccountPositions.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  containerClass: PropTypes.string,
};

export default AccountPositions;
