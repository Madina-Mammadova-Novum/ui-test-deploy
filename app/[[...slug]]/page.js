import delve from 'dlv';

import { metaData } from '@/adapters/metaData';
import { BlockManager } from '@/common';
import { NextLink } from '@/elements';
import { ROUTES } from '@/lib';
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
    <main>
      <h1>{title}</h1>
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
        {/* <li>
          <NextLink href={ROUTES.NEGOTIATING}>NEGOTIATING</NextLink>
        </li> */}
      </ul>
      {content}
      {blocks && <BlockManager blocks={blocks} />}
    </main>
  );
}
