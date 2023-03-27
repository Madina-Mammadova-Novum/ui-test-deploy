import React from 'react';

import PropTypes from 'prop-types';

import { valuesPropTypes } from '@/utils/types';

import waves from '@/assets/images/waves.jpg';
import { NextImage, Title } from '@/elements';

const WhatWeOfferBlock = ({ title }) => {
  return (
    <section>
      <div className="container mx-auto max-w-[960px]">
        {title && <Title>{title}</Title>}
        <div className="space-y-4">
          <div className="flex items-center gap-10 even:flex-row-reverse">
            <div className="w-[380px] h-[350px] shrink-0 rounded-[10px]">
              <NextImage
                src={waves}
                alt={waves}
                height={350}
                width={380}
                className="h-full w-full object-cover object-center rounded-[10px]"
              />
            </div>
            <div>
              <Title component="h2" className="text-black mb-2.5">
                Easy system to negotiate
              </Title>
              <p className="text-black text-xsm">
                Liberty ship sections were prefabricated in locations across the United States and then assembled by
                shipbuilders in an average of six weeks
              </p>
            </div>
          </div>
          <div className="flex items-center gap-10 even:flex-row-reverse">
            <div className="w-[380px] h-[350px] shrink-0 rounded-[10px]">
              <NextImage
                src={waves}
                alt={waves}
                height={350}
                width={380}
                className="h-full w-full object-cover object-center rounded-[10px]"
              />
            </div>
            <div>
              <Title component="h2" className="text-black mb-2.5">
                Easy system to negotiate
              </Title>
              <p className="text-black text-xsm">
                Liberty ship sections were prefabricated in locations across the United States and then assembled by
                shipbuilders in an average of six weeks
              </p>
            </div>
          </div>
          {/* {values.map((item) => { */}
          {/* return ( */}
          {/*   <> */}
          {/*     {item.value.title} */}
          {/*     {item.value.shortDescription} */}
          {/*     {item.value.coverImage} */}
          {/*   </> */}
          {/* ); */}
          {/* })} */}
        </div>
      </div>
    </section>
  );
};

WhatWeOfferBlock.propTypes = {
  title: PropTypes.string.isRequired,
  values: valuesPropTypes.isRequired,
};

export default WhatWeOfferBlock;
