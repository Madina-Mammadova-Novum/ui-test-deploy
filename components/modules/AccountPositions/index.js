'use client';

import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import { Dropdown, Loader, Title } from '@/elements';
import { NAVIGATION_PARAMS } from '@/lib/constants';
import { getUserPositions } from '@/services';
import { ComplexPagination, ExpandableCard } from '@/units';

const AccountPositions = ({ title, containerClass }) => {
  const [userStore, setUserStore] = useState({
    userPositions: null,
    sortOptions: NAVIGATION_PARAMS.DATA_SORT_OPTIONS,
    sortValue: NAVIGATION_PARAMS.DATA_SORT_OPTIONS[0],
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

  const dropdownStyles = { dropdownWidth: 150, className: 'flex items-center gap-x-5' };

  return (
    <section className={containerClass}>
      {userPositions ? (
        <>
          <div className="flex justify-between items-center pt-5 w-full">
            <Title level={1}>{title}</Title>
            <Dropdown
              label="Sort by open day:"
              options={sortOptions}
              defaultValue={sortValue}
              onChange={handleChange}
              config={{ sync: true }}
              customStyles={dropdownStyles}
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
