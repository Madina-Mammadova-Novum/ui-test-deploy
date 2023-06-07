'use client';

import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { AccountTools, TankerSearch } from '@/modules';
import { Tabs } from '@/units';

const HomeSearchBlock = ({ title, subTitle, shortDescription }) => {
  const tabs = [
    {
      value: 'Search',
      label: 'Search',
    },
    {
      value: 'Tools',
      label: 'Tools',
    },
  ];

  const [activeTab, setActiveTab] = useState('Search');

  const handleActiveTab = (event) => {
    const { value } = event.target;
    setActiveTab(value);
  };

  const handleViewType = (typeOfView) => {
    switch (typeOfView) {
      case 'Tools':
        return <AccountTools className='flex 
        [&>*:first-child]:xlMax:w-full
        [&>*:nth-child(2)]:xlMax:w-full 
        [&>*:first-child]:w-1/4 
        [&>*:nth-child(2)]:w-3/4 
        justify-center' />;
      default:
        return <TankerSearch />;
    }
  };

  return (
    <section className="relative">
      {title && <div>{title}</div>}
      {subTitle && <div>{subTitle}</div>}
      {shortDescription && <div>{shortDescription}</div>}
      <div className="container mx-auto px-[54px] max-w-[1258px] -mt-[175px]">
        <Tabs tabs={tabs} activeTab={activeTab} onClick={handleActiveTab} customStyles="mb-1" />
        {handleViewType(activeTab)}
      </div>
    </section>
  );
};

HomeSearchBlock.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  shortDescription: PropTypes.string,
};

export default HomeSearchBlock;
