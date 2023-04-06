import React from 'react';

import delve from 'dlv';
import parse from 'html-react-parser';

import { metaData } from '@/adapters/metaData';
import waves from '@/assets/images/waves.jpg';
import { BlockManager } from '@/common';
import { NextImage, NextLink } from '@/elements';
import { ROUTES } from "@/lib";
import { getEntityData } from "@/services/collectionType";
// import { getPage } from '@/services/page';

export async function generateMetadata({ params }) {
  // const data = await getPage(params);
  const data = await getEntityData(params);
  return metaData( data );
}

export default async function Home({ params }) {
  const data = await getEntityData(params);
  const pageData = delve(data, 'data');
  const blocks = delve(pageData, 'blocks');
  const { content } = pageData;

  return (
    <main>
       <ul>
        <li>
          <NextLink href={ROUTES.LOGIN}>LOGIN</NextLink>
        </li>
        <li>
          <NextLink href={ROUTES.FORGOT_PASSWORD}>FORGOT_PASSWORD</NextLink>
        </li>
        <li>
          <NextLink href={ROUTES.RESET_PASSWORD}>RESET_PASSWORD</NextLink>
        </li>
        <li>
          <NextLink href={ROUTES.SIGNUP}>SIGNUP</NextLink>
        </li>
        <li>
          <NextLink href={ROUTES.ACCOUNT_SEARCH}>SEARCH</NextLink>
        </li>
        <li>
          <NextLink href={ROUTES.ACCOUNT_PREFIXTURE}>PRE-FIXTURE</NextLink>
        </li>
        <li>
          <NextLink href={ROUTES.ACCOUNT_NEGOTIATING}>NEGOTIATING</NextLink>
        </li>
       </ul>
      <section className="relative pt-[115px] pb-[86px]">
        <div className="container mx-auto px-[54px] max-w-[1258px]">
          <NextImage
            src={waves}
            alt="waves"
            customStyles="absolute inset-0 -z-10 h-full w-full object-cover object-center"
            height={352}
            width={1440}
          />
          <div className="heading-wrapper text-white">{content && parse(content)}</div>
        </div>
      </section>
      <div className="space-y-[100px]">
        {blocks && <BlockManager blocks={blocks} />}
      </div>
    </main>
  );
}
