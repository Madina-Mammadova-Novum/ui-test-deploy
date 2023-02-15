import Link from 'next/link';

import { BlockManager } from '@/common';

const data = [
  { __component: 'map', id: 1 },
  { __component: 'form', id: 2 },
];

/* 
SPA: fetching 

1.add 'use client' for document
2.inside of your page:

const ref = useRef(false);
useFetchEffect(ref, fetchData);
*/

/* 
SSR: fetching 

1. remove 'use client' from document
2. make your page as 'async'

const res = await getData();
*/

export default async function Home() {
  return (
    <main>
      <Link href="/uikit">ui-kit</Link>
      {data && <BlockManager blocks={data} />}
    </main>
  );
}
