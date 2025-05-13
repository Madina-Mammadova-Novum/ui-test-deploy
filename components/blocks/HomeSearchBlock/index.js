'use client';

import { useState } from 'react';

import PropTypes from 'prop-types';

import { AccountTools, TankerSearch } from '@/modules';
import { Tabs } from '@/units';

const tabs = [
  {
    value: 'search',
    label: 'Search',
  },
  { value: 'tools', label: 'Tools' },
];

export default function HomeSearchBlock({ title, subTitle, shortDescription }) {
  const [activeTab, setActiveTab] = useState('search');

  const dataByTab = {
    search: <TankerSearch />,
    tools: (
      <AccountTools className="flex justify-center [&>*:first-child]:w-1/4 [&>*:first-child]:xlMax:w-full [&>*:nth-child(2)]:w-3/4 [&>*:nth-child(2)]:xlMax:w-full" />
    ),
  };

  const handleActiveTab = ({ target }) => setActiveTab(target.value);

  return (
    <section className="relative">
      {title && <div>{title}</div>}
      {subTitle && <div>{subTitle}</div>}
      {shortDescription && <div>{shortDescription}</div>}
      <div className="-mt-[134px] mb-16 px-4 md:mb-8 md:px-8 3md:mx-auto 3md:-mt-[265px] 3md:mb-24 3md:max-w-[1152px] xl:px-0">
        <Tabs tabs={tabs} activeTab={activeTab} onClick={handleActiveTab} customStyles="-mb-3" />
        {dataByTab[activeTab]}
      </div>
    </section>
  );
}

HomeSearchBlock.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  shortDescription: PropTypes.string,
};
