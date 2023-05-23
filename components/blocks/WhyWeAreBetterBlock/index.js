import React from 'react';

import { valuesPropTypes } from '@/lib/types';

import { NextImage, Title } from '@/elements';
import { makeId } from '@/utils/helpers';

const WhyWeAreBetterBlock = ({ values }) => {
  const printItem = ({ title, subTitle, shortDescription }) => {
    return (
      <div key={makeId()}>
        {title && (
          <Title level="1" className="text-white text-center mb-2.5">
            {title}
          </Title>
        )}
        {subTitle && (
          <Title level="3" className="text-white text-center mb-2">
            {subTitle}
          </Title>
        )}
        {shortDescription && <p className="text-white text-xsm text-center">{shortDescription}</p>}
      </div>
    );
  };
  return (
    <section className="relative py-[100px]">
      <NextImage
        src="/images/waves.jpg"
        alt="waves"
        customStyles="absolute inset-0 -z-10 h-full w-full object-cover object-center"
        height={352}
        width={1440}
        quality={100}
      />
      <div className="container mx-auto max-w-[960px] grid grid-cols-2 gap-10"> {values && values.map(printItem)}</div>
    </section>
  );
};

WhyWeAreBetterBlock.propTypes = {
  values: valuesPropTypes,
};

export default WhyWeAreBetterBlock;
