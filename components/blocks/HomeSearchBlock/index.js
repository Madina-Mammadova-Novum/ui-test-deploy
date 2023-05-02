'use client';

import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { TankerSearch } from '@/modules';
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

  // todo: temporarily until authorization functionality is completed

  const handleViewType = (typeOfView) => {
    switch (typeOfView) {
      case 'Tools':
        // todo: add Tools component when it is done
        return <div className="text-white h-32">Soon...</div>;
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
