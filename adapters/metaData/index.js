function getPublicUrl(slug) {
  return `${process.env.NEXT_PUBLIC_URL}/${slug}`;
}

/**
 * getKeywords
 * @param {string} string
 * @returns []
 */
function getKeywords(string) {
  if (string === undefined || string === null) return [];
  return string.split(',').map((item) => {
    return item.trim();
  });
}

/**
 * getRobots
 * More details here https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag
 * @param {string} string
 * @returns {boolean}
 */
function getRobots(string) {
  const robots = getKeywords(string).map((item) => {
    return item.toLowerCase();
  });
  const index =
    ['none', 'noindex'].filter((item) => {
      return robots.includes(item);
    }).length === 0;
  const follow =
    ['none', 'nofollow'].filter((item) => {
      return robots.includes(item);
    }).length === 0;
  const nocache =
    ['noarchive'].filter((item) => {
      return robots.includes(item);
    }).length === 0;
  const noimageindex =
    ['noimageindex'].filter((item) => {
      return robots.includes(item);
    }).length === 0;

  return {
    index,
    follow,
    nocache,
    googleBot: {
      index,
      follow,
      noimageindex,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  };
}

export const metaData = ({ data }) => {
  if (data === null) return null; // todo: if data === null need to set default values
  const { title: pageTile, slug, seo } = data;
  if (seo === null) return null; // todo: if seo === null need to set default values
  const { metaTitle, metaDescription, keywords, metaRobots, canonicalURL } = seo; // todo: metaViewport isset in seo but temporary not use
  const title = metaTitle !== null ? metaTitle : pageTile;
  const description = metaDescription !== null ? metaDescription : '';
  const siteName = 'ShipLink';
  const url = getPublicUrl(slug);

  return {
    title,
    description,
    keywords: keywords !== null ? getKeywords(keywords) : [],
    generator: 'Next.js',
    applicationName: siteName,
    // referrer: 'origin-when-cross-origin',
    // authors: [{ name: 'Seb' }, { name: 'Josh', url: 'https://nextjs.org' }],
    // colorScheme: 'dark',
    creator: 'Otakoyi',
    // publisher: 'Sebastian Markbåge',
    alternates: {
      canonical: canonicalURL !== null ? canonicalURL : url,
      // languages: {
      //   'en-US': 'https://nextjs.org/en-US',
      //   'de-DE': 'https://nextjs.org/de-DE',
      // },
      // media: {
      //   'only screen and (max-width: 600px)': 'https://nextjs.org/mobile',
      // },
      // types: {
      //   'application/rss+xml': 'https://nextjs.org/rss',
      // },
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      images: [
        {
          url: 'https://nextjs.org/og.png',
          width: 800,
          height: 600,
          alt: title,
        },
        {
          url: 'https://nextjs.org/og-alt.png',
          width: 1800,
          height: 1600,
          alt: title,
        },
      ],
      locale: 'en-US',
      type: 'website',
    },
    robots: getRobots(metaRobots),
    // icons: {
    //   icon: '/icon.png',
    //   shortcut: '/shortcut-icon.png',
    //   apple: '/apple-icon.png',
    //   other: {
    //     rel: 'apple-touch-icon-precomposed',
    //     url: '/apple-touch-icon-precomposed.png',
    //   },
    // },
    // themeColor: 'black',
    // manifest: 'https://nextjs.org/manifest.json',
    // twitter: {
    //   card: 'summary_large_image',
    //   title: 'Next.js',
    //   description: 'The React Framework for the Web',
    //   siteId: '1467726470533754880',
    //   creator: '@nextjs',
    //   creatorId: '1467726470533754880',
    //   images: ['https://nextjs.org/og.png'],
    // },
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
    },
  };
};
