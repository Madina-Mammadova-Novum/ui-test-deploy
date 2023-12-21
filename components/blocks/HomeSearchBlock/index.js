'use client';

import { useState } from 'react';

import PropTypes from 'prop-types';

import ArrowSVG from '@/assets/images/arrow.svg';
import { Button } from '@/elements';
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
      <AccountTools className="flex [&>*:first-child]:xlMax:w-full [&>*:nth-child(2)]:xlMax:w-full [&>*:first-child]:w-1/4 [&>*:nth-child(2)]:w-3/4 justify-center" />
    ),
  };

  const handleActiveTab = ({ target }) => setActiveTab(target.value);

  const handleClickScroll = () => {
    const elementToScroll = document.getElementById('how-it-works');
    elementToScroll?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative">
      {title && <div>{title}</div>}
      {subTitle && <div>{subTitle}</div>}
      {shortDescription && <div>{shortDescription}</div>}
      <div className="container mx-auto h- px-6 3md:px-14 max-w-[1258px] -mt-[205px]">
        <Button
          buttonProps={{
            text: 'How it works',
            variant: 'primary',
            size: 'large',
            icon: { after: <ArrowSVG viewBox="0 0 24 24" className="fill-white w-5 h-5 -rotate-90" /> },
          }}
          customStyles="!bg-transparent !p-0 font-medium self-baseline mb-2"
          onClick={handleClickScroll}
        />
        <Tabs tabs={tabs} activeTab={activeTab} onClick={handleActiveTab} customStyles="mb-1" />
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
