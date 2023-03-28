import React from 'react';

import delve from 'dlv';
import parse from 'html-react-parser';

import { metaData } from '@/adapters/metaData';
import waves from '@/assets/images/waves.jpg';
import { BlockManager } from '@/common';
import { NextImage, Title } from '@/elements';
import { getEntityData } from '@/services/page';

export async function generateMetadata({ params }) {
  const data = await getEntityData(params);
  return metaData(data);
}

export default async function Home({ params }) {
  const data = await getEntityData(params);
  const pageData = delve(data, 'data');
  const blocks = delve(pageData, 'blocks');
  const { title, content } = pageData;

  return (
    <main className="space-y-[100px]">
      {/* <ul> */}
      {/*  <li> */}
      {/*    <NextLink href={ROUTES.LOGIN}>LOGIN</NextLink> */}
      {/*  </li> */}
      {/*  <li> */}
      {/*    <NextLink href={ROUTES.FORGOT_PASSWORD}>FORGOT_PASSWORD</NextLink> */}
      {/*  </li> */}
      {/*  <li> */}
      {/*    <NextLink href={ROUTES.RESET_PASSWORD}>RESET_PASSWORD</NextLink> */}
      {/*  </li> */}
      {/*  <li> */}
      {/*    <NextLink href={ROUTES.SIGNUP}>SIGNUP</NextLink> */}
      {/*  </li> */}
      {/*  /!* <li> */}
      {/*    <NextLink href={ROUTES.NEGOTIATING}>NEGOTIATING</NextLink> */}
      {/*  </li> *!/ */}
      {/* </ul> */}
      <section className="relative pt-[115px] pb-[86px] text-white">
        <div className="container mx-auto max-w-[960px]">
          <NextImage
            src={waves}
            alt="waves"
            customStyles="absolute inset-0 -z-10 h-full w-full object-cover object-center"
            height={352}
            width={1440}
          />
          <Title component="h1" className="mb-2.5 text-center">
            {title}
          </Title>
          <div className="text-xsm">
            {content && parse(content) }
          </div>
        </div>
      </section>
      {blocks && <BlockManager blocks={blocks} />}
    </main>
  );
}
