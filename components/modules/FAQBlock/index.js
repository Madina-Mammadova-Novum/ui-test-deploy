'use client';

import { useState } from 'react';

import PropTypes from 'prop-types';

import { Title } from "@/elements";
import { Accordion, TabsVertical } from '@/units';

const FAQBlock = ( ) => {
  const tabs = [
    {
      value: 'Search',
      label: 'Search',
    },
    {
      value: 'Offers',
      label: 'Offers',
    },
    {
      value: 'General',
      label: 'General',
    },
  ];

  const [activeTab, setActiveTab] = useState('Search');

  const handleActiveTab = (event) => {
    const { value } = event.target;
    setActiveTab(value);
  };


  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const id = 1;

  return (
    <div>
      <Title className="py-5" level={1}>FAQ</Title>
      <div className="shadow-xmd rounded-base bg-white flex gap-20 px-5">
        <TabsVertical tabs={tabs} activeTab={activeTab} onClick={handleActiveTab} customStyles="pt-5"/>
        <div className="divide-y divide-gray-darker grow">
          <Accordion
            key={`id-${id}`}
            open={open === id}
            onClick={() => handleOpen(id)}
            isFullWidth
            items={[
              {
                headerContent: "question",
                bodyContent: "parse(answer)",
              },
            ]}
          />
          <Accordion
            key={`id-${id}`}
            open={open === id}
            onClick={() => handleOpen(id)}
            isFullWidth
            items={[
              {
                headerContent: "question",
                bodyContent: "parse(answer)",
              },
            ]}
          />
        </div>

      </div>
    </div>
  );
};

FAQBlock.propTypes = {
  title: PropTypes.string,
};

export default FAQBlock;
