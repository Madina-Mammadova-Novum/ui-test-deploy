'use client';

import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import { Dropdown, Label, Loader } from '@/elements';
import { getUserPositions } from '@/services';
import { ExpandableCard } from '@/units';

const AccountPositions = ({ containerClass }) => {
  const [userPositions, setUserPositions] = useState(null);
  const [positionSortType, setPositionSortType] = useState('');

  const positionsSortOptions = [
    {
      value: 'ascending',
      label: 'ascending',
    },
    {
      value: 'descending',
      label: 'descending',
    },
  ];

  const fetchData = async () => {
    const data = await getUserPositions();
    setUserPositions(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (option) => setPositionSortType(option);

  const printExpandable = (fleet) => <ExpandableCard key={fleet.id} data={fleet} />;

  return (
    <section className={containerClass}>
      {userPositions ? (
        <div className="flex flex-col">
          <div className="flex justify-end items-center relative -top-14 gap-x-2.5">
            <Label className="text-xs-sm">Sort by open day:</Label>
            <Dropdown value={positionSortType} options={positionsSortOptions} onChange={handleChange} useForm={false} />
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
