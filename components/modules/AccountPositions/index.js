'use client';

import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import { Loader, SimpleSelect, Title } from '@/elements';
import { getUserPositions } from '@/services';
import { ComplexPagination, ExpandableCard } from '@/units';

const AccountPositions = ({ title, containerClass }) => {
  const options = ['ascending', 'descending'];

  const [userStore, setUserStore] = useState({
    userPositions: null,
    sortOptions: options,
    sortValue: options[0],
  });

  /* Change handler by key-value for userStore */
  const handleChangeState = (key, value) => {
    setUserStore((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  /* fetching user positions data */
  const fetchData = async () => {
    const data = await getUserPositions();
    handleChangeState('userPositions', data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (option) => handleChangeState('sortValue', option);

  const printExpandable = (fleet) => <ExpandableCard key={fleet.id} data={fleet} />;

  const { userPositions, sortOptions, sortValue } = userStore;

  return (
    <section className={containerClass}>
      {userPositions ? (
        <>
          <div className="flex justify-between items-center pt-5 w-full">
            <Title level={1}>{title}</Title>
            <SimpleSelect
              label="Sort by open day:"
              currentItem={sortValue}
              selectableItems={sortOptions}
              onChange={handleChange}
            />
          </div>
          {userPositions?.map(printExpandable)}
          <ComplexPagination />
        </>
      ) : (
        <Loader />
      )}
    </section>
  );
};

AccountPositions.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({})),
  containerClass: PropTypes.string,
};

export default AccountPositions;
