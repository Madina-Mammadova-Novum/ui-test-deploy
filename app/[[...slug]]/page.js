import { metaData } from '@/adapters/metaData';
import { NextLink } from '@/elements';
import { ROUTES } from '@/lib';
import { getPage } from '@/services/page';
// import { BlockManager } from "@/common";

export async function generateMetadata({ params }) {
  const data = await getPage(params);
  return metaData({ data });
}

export default async function Home({ params }) {
  const { title } = await getPage(params);

  return (
    <section className="container flex-grow">
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
        <li>
          <NextLink href={ROUTES.SEARCH}>SEARCH</NextLink>
        </li>
        {/* <li>
          <NextLink href={ROUTES.NEGOTIATING}>NEGOTIATING</NextLink>
        </li> */}
      </ul>

      {/* {blocks && <BlockManager blocks={blocks} />} */}
    </section>
  );
}
