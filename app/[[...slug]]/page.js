import Link from 'next/link';

import { metaData } from '@/adapters/metaData';
import { getPage } from '@/services/page';
// import { BlockManager } from "@/common";

export async function generateMetadata({ params }) {
  const data = await getPage(params);
  return metaData({ data });
}
export default async function Home({ params, searchParams }) {
  console.log({ params, searchParams });
  const { title, blocks } = await getPage(params);
  console.log({ blocks });
  return (
    <section>
      <h1>{title}</h1>
      <ul>
        <li>
          <Link href="/uikit">ui-kit</Link>
        </li>
        <li>
          <Link href="/forgot-password">forgot-password</Link>
        </li>
        <li>
          <Link href="/reset-password">reset-password</Link>
        </li>
        <li>
          <Link href="/signup">signup</Link>
        </li>
      </ul>

      {/* {blocks && <BlockManager blocks={blocks} />} */}
    </section>
  );
}
