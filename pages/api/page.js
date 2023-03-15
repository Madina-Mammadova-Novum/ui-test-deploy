export default function handler(req, res) {
  res.status(200).json({
    data: {
      id: 1,
      attributes: {
        slug: 'main',
        title: 'Main ',
        content: '',
        createdAt: '2022-09-15T09:33:56.591Z',
        updatedAt: '2023-03-03T12:15:26.464Z',
        publishedAt: '2022-09-15T09:40:19.499Z',
        locale: 'en',
        coverImage: { data: null },
        seo: {
          id: 2,
          metaTitle: 'Home',
          metaDescription:
            "We provide international stars of the blockchain scene, newcomers and local greats to Hamburg. You'll get access to a mix of the most inspiring leaders.",
          keywords: 'BLOCKCHAIN CONFERENCE 23',
          metaRobots: 'none',
          structuredData: null,
          metaViewport: 'width=device-width, initial-scale=1',
          canonicalURL: null,
        },
        sections: [
          { id: 1, __component: 'events.hero-events-slider', internal_name: null },
          {
            id: 3,
            __component: 'general.simple-section',
            title: 'FROM BLOCKCHAIN TO <br /> IMPACT <span> WITH BLOCKCHANCE </span>',
            shortDescription:
              'Blockchain technology is revolutionizing our world and creating more decentralized and democratic societies. BLOCKCHANCE connects leading companies, creative minds, thought leaders and entrepreneurs in the global blockchain ecosystem.',
            customBackground: false,
          },
          {
            id: 5,
            __component: 'values.section-selected',
            title: 'WHAT WE <span>OFFER</span>',
            shortDescription:
              'BLOCKCHANCE is the hub for the blockchain ecosystem in Europe and beyond. We help you to enter the new world of decentralized ledger technologies, web3, DeFi and the Metaverse.',
            style: 'default',
          },
          { id: 1, __component: 'general.simple-image' },
          {
            id: 5,
            __component: 'general.simple-section',
            title: 'TOGETHER, WE SHAPE <br /> THE  <span> WORLD OF TOMORROW </span>',
            shortDescription:
              'BLOCKCHANCE creates a community of like-minded people, investors, businesses, thought leaders and visionaries. Together, we can build the foundation for the world of tomorrow.',
            customBackground: false,
          },
          {
            id: 4,
            __component: 'hubspots.section-subscribe',
            title: 'Never miss an update',
            shortDescription:
              "Sign up for our newsletter and get exclusive access to the hottest news from the Blockchance Conference. Don't miss a beat in this fast-paced industry - subscribe now!",
            formId: 'f5e58bcf-95c3-4111-a444-7f5db0986e17',
          },
          {
            id: 1,
            __component: 'general.section-with-cards',
            title: 'AS <span>FEATURED IN</span>',
            shortDescription: null,
          },
        ],
        localizations: { data: [] },
      },
    },
    meta: {},
  });
}
