'use client';

import { useEffect, useState } from 'react';

import { Dropdown, Loader, Title } from '@/elements';
import { NAVIGATION_PARAMS } from '@/lib/constants';
import { getUserPositions } from '@/services';
import { ComplexPagination, ExpandableCard, ToggleRows } from '@/units';

const AccountPositions = () => {
  const [toggle, setToggle] = useState(false);

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

  const { userPositions, sortOptions, sortValue } = userStore;

  const printExpandableCard = (fleet) => <ExpandableCard key={fleet.id} data={fleet} expandAll={{ value: toggle }} />;

  const dropdownStyles = { dropdownWidth: 120, className: 'flex items-center gap-x-5' };

  return (
    <section className="flex flex-col gap-y-5">
      {userPositions ? (
        <>
          <div className="flex justify-between items-center pt-5 w-full">
            <Title level={1}>My positions</Title>
            <div className="flex gap-x-5">
              <ToggleRows value={toggle} onToggleClick={() => setToggle((prevState) => !prevState)} />
              <Dropdown
                label="Sort by open day:"
                options={sortOptions}
                defaultValue={sortValue}
                customStyles={dropdownStyles}
                onChange={handleChange}
              />
            </div>
          </div>

          {userPositions?.map(printExpandableCard)}
          <ComplexPagination />
        </>
      ) : (
        <Loader className="h-8 w-8 absolute top-1/2 left-1/2" />
      )}
    </section>
  );
};

export default AccountPositions;
