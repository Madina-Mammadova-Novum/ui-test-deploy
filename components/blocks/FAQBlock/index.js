'use client';

import { useState } from 'react';

import parse from 'html-react-parser';

import { FAQBlockPropTypes } from '@/lib/types';

import { Accordion, AccordionCTA, TabsAsLinks } from '@/units';

const FAQBlock = ({ title, subTitle, shortDescription, items, categories, category, cta }) => {
  const [open, setOpen] = useState(null);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const tabs = categories.map((item) => {
    return {
      label: item.title,
      path: item.slug,
      value: item.id,
    };
  });

  return (
    <section className="relative z-10 -mt-[175px]">
      <div className="container mx-auto px-[54px] max-w-[1258px]">
        {title && <div>{title}</div>}
        {subTitle && <div>{subTitle}</div>}
        {shortDescription && <div>{shortDescription}</div>}
        <TabsAsLinks tabs={tabs} activeTab={category.id} />
        <div className="relative rounded-base pt-1.5 px-5 pb-5 bg-white divide-y divide-gray-darker mt-1">
          {items &&
            items.map(({ id, answer, question }) => (
              <Accordion
                key={`id-${id}`}
                open={open === id}
                onClick={() => handleOpen(id)}
                isFullWidth
                items={[
                  {
                    headerContent: question,
                    bodyContent: parse(answer),
                  },
                ]}
              />
            ))}
          <div className="text-black pt-5">
            {cta && <AccordionCTA shortDescription={cta.shortDescription} title={cta.title} buttons={cta.buttons} />}
          </div>
          <div className="rounded-base  h-[calc(100%_-_135px)] w-full absolute shadow-xmd bottom-0 left-0 -z-10" />
        </div>
      </div>
    </section>
  );
};

FAQBlock.propTypes = FAQBlockPropTypes;

export default FAQBlock;
