import React from 'react';

import { valuesPropTypes } from '@/lib/types';

import { NextImage, Title } from '@/elements';
import { makeId } from '@/utils/helpers';

const WhyWeAreBetterBlock = ({ values }) => {
  const printItem = ({ title, shortDescription }) => {
    return (
      <div key={makeId()} className="flex flex-col items-center justify-center">
        {title && (
          <Title level="2" className="mb-2.5 text-center text-3xl text-white md:text-4xl">
            {title}
          </Title>
        )}

        {shortDescription && (
          <div className="text-xsm text-white">
            {shortDescription.split('. ').map((sentence, index, array) => (
              <p key={makeId()} className="mb-1 text-white">
                {sentence.trim() + (sentence.endsWith('.') || index === array.length - 1 ? '' : '.')}
              </p>
            ))}
          </div>
        )}
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
      <div className="container mx-auto grid max-w-[960px] gap-10 md:grid-cols-3">
        <div className="flex items-center justify-center md:col-span-1">
          <NextImage src="/images/shiplink.png" alt="Shiplink" width={200} height={100} customStyles="object-contain" />
        </div>
        <div className="md:col-span-2">{values && values.length > 1 && printItem(values[1])}</div>
      </div>
    </section>
  );
};

WhyWeAreBetterBlock.propTypes = {
  values: valuesPropTypes,
};

export default WhyWeAreBetterBlock;
