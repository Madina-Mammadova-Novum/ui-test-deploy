'use client';

import React, { useState } from 'react';

import parse from 'html-react-parser';
import PropTypes from 'prop-types';

import { mediaPropTypes } from '@/utils/types';

import { LinkAsButton, Title } from '@/elements';
import { Accordion, TabsAsLinks } from '@/units';
import { makeId } from '@/utils/helpers';

const FAQBlock = ({ title, subTitle, shortDescription, items }) => {
  const [open, setOpen] = useState(1);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const tabs = [
    {
      label: 'For vessel owner',
      value: 'for_vessel_owner',
    },
    {
      label: 'For charterer',
      value: 'for_charterer',
    },
  ];
  return (
    <section className="relative z-10">
      <div className="container mx-auto px-[54px] max-w-[1258px] -mt-[165px]">
        {title && <div>{title}</div>}
        {subTitle && <div>{subTitle}</div>}
        {shortDescription && <div>{shortDescription}</div>}
        <TabsAsLinks tabs={tabs} activeTab={tabs[0].value} />
        {items && (
          <div>
            <div className="rounded-[10px] pt-1.5 px-5 pb-5 bg-white shadow-xmd divide-y divide-gray-darker mt-1">
              {items.map(({ id, answer, question }) => (
                <Accordion
                  key={makeId()}
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
              {/* {CTAQuestion && ( */}
              <div className="text-black pt-5">
                <div className="rounded-[10px] border border-gray-darker bg-gray-light px-5 py-3">
                  {/* {parse(additionalQuestion)} */}
                  <Title level="3">Everything you need to know</Title>
                  <div className="flex gap-x-2.5 items-center">
                    <p className="text-xsm">Can’t find the answer you’re looking for?</p>
                    <LinkAsButton href="/" buttonProps={{ variant: 'primary', size: 'medium' }}>
                      Help Center
                    </LinkAsButton>
                  </div>
                </div>
              </div>
              {/* )} */}
            </div>
          </div>
        )}
        {/* FOR MAIN PAGE */}
        {/* {items && ( */}
        {/*  <div className="divide-y divide-gray-darker mt-1"> */}
        {/*    {items.map(({ id, answer, question }) => ( */}
        {/*      <Accordion */}
        {/*        key={makeId()} */}
        {/*        open={open === id} */}
        {/*        onClick={() => handleOpen(id)} */}
        {/*        items={[ */}
        {/*          { */}
        {/*            headerContent: question, */}
        {/*            bodyContent: parse(answer), */}
        {/*          }, */}
        {/*        ]} */}
        {/*      /> */}
        {/*    ))} */}
        {/*  </div> */}
        {/* )} */}
      </div>
    </section>
  );
};

FAQBlock.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  shortDescription: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      answer: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
    })
  ).isRequired,
  // CTAQuestion: PropTypes.string,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      shortDescription: PropTypes.string,
      coverImage: mediaPropTypes,
    })
  ),
};

export default FAQBlock;
