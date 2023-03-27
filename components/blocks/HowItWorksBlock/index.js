import React from 'react';

import PropTypes from 'prop-types';

import { valuesPropTypes } from '@/utils/types';

// import { StepItem } from '@/collections';
import { Title } from '@/elements';

const BlockHowItWorks = ({ title, shortDescription, values }) => {
  return (
    <section id="how-it-works" className="mb-28 sm:mb-44 2lg:mb-64">
      <div className="relative flex flex-col md:flex-row md:justify-between lg:mt-14 2lg:mt-16">
        <div className="md:sticky md:top-0 md:self-start md:min-w-[521px]">
          {title && <Title>{title}</Title>}
          {shortDescription && shortDescription}
        </div>
        <div className="md:col-span-1" />
        <div className="mt-10 flex flex-col gap-y-3 md:mt-0">
          {values.map((item, index) => {
            return (
              <>
                {index + 1} . {item.value.title}
                {item.value.shortDescription}
                {item.value.coverImage}
              </>
              // <StepItem
              //   key={item.id}
              //   title={item.value.title}
              //   shortDescription={item.value.shortDescription}
              //   image={item.value.coverImage}
              //   number={index + 1}
              // />
            );
          })}
        </div>
      </div>
    </section>
  );
};

BlockHowItWorks.propTypes = {
  title: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  values: valuesPropTypes.isRequired,
};

export default BlockHowItWorks;
