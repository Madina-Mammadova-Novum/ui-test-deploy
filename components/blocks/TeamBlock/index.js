'use client';

import React from 'react';

import waves from '@/assets/images/waves.jpg';
import { NextImage, Title } from '@/elements';

const TeamBlock = () => {
  return (
    <section>
      <div className='container mx-auto px-[54px] max-w-[1258px]'>
        <Title className='mb-5 text-center text-black'>title</Title>
        <div className='grid grid-cols-3 gap-5 pt-[60px]'>
          <div className='flex items-center flex-col text-black shadow px-[30px] pb-[30px] bg-white rounded-[10px]'>
            <NextImage
              src={waves}
              alt={waves}
              height={120}
              width={120}
              className="h-[120px] w-[120px] object-cover object-center rounded-full mb-2.5 -mt-[60px]"
            />
            <Title component='h2' className='mb-1'>fullName</Title>
            <Title component='h4' className='mb-1'>position</Title>
            <p className='text-xsm'>Nor is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but occasionally circumstances occur in which toil and pain can procure him some great pleasure.</p>
          </div>
          <div className='flex items-center flex-col text-black shadow px-[30px] pb-[30px] bg-white rounded-[10px]'>
            <NextImage
              src={waves}
              alt={waves}
              height={120}
              width={120}
              className="h-[120px] w-[120px] object-cover object-center rounded-full mb-2.5 -mt-[60px]"
            />
            <Title component='h2' className='mb-1'>fullName</Title>
            <Title component='h4' className='mb-1'>position</Title>
            <p className='text-xsm'>Nor is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but occasionally circumstances occur in which toil and pain can procure him some great pleasure.</p>
          </div>
          <div className='flex items-center flex-col text-black shadow px-[30px] pb-[30px] bg-white rounded-[10px]'>
            <NextImage
              src={waves}
              alt={waves}
              height={120}
              width={120}
              className="h-[120px] w-[120px] object-cover object-center rounded-full mb-2.5 -mt-[60px]"
            />
            <Title component='h2' className='mb-1'>fullName</Title>
            <Title component='h4' className='mb-1'>position</Title>
            <p className='text-xsm'>Nor is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but occasionally circumstances occur in which toil and pain can procure him some great pleasure.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

TeamBlock.propTypes = {
};

export default TeamBlock;
