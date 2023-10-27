'use client';

import { useState } from 'react';

import PropTypes from 'prop-types';

import ArrowSVG from '@/assets/images/arrow.svg';
import { Button } from '@/elements';
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

  const handleClickScroll = () => {
    const elementToScroll = document.getElementById('how-it-works');
    elementToScroll?.scrollIntoView({ behavior: 'smooth' });
  };

  // const handleViewType = (typeOfView) => {
  //   switch (typeOfView) {
  //     case 'Tools':
  //       return (
  //         <AccountTools
  //           className="flex
  //       [&>*:first-child]:xlMax:w-full
  //       [&>*:nth-child(2)]:xlMax:w-full
  //       [&>*:first-child]:w-1/4
  //       [&>*:nth-child(2)]:w-3/4
  //       justify-center"
  //         />
  //       );
  //     default:
  //       return <TankerSearch />;
  //   }
  // };

  return (
    <section className="relative">
      {title && <div>{title}</div>}
      {subTitle && <div>{subTitle}</div>}
      {shortDescription && <div>{shortDescription}</div>}
      <div className="container mx-auto px-6 3md:px-14 max-w-[1258px] -mt-[205px]">
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
        <TankerSearch />
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
