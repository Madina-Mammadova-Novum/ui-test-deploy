import { sleep } from '@/utils/helpers';

export default async function handler(req, res) {
  await sleep(2000);
  try {
    return res.status(200).json({
      data: [
        [
          {
            label: 'tanker name',
            content: {
              text: 'Harvey Deep Sea',
              image: null,
            },
          },
          {
            label: 'imo',
            content: {
              text: '9131034',
              image: null,
            },
          },
          {
            label: 'fleet name',
            content: {
              text: 'Fleet Base West',
              image: null,
            },
          },
          {
            label: 'open date',
            content: {
              text: 'Dec 21, 2021',
              image: null,
            },
          },
          {
            label: 'open port',
            content: {
              text: 'Botas Natural Gas Terminal, ESBCN',
              image: null,
            },
          },
        ],
        [
          {
            label: 'tanker name',
            content: {
              text: 'Harvey Deep Sea',
              image: null,
            },
          },
          {
            label: 'imo',
            content: {
              text: '9131034',
              image: null,
            },
          },
          {
            label: 'fleet name',
            content: {
              text: 'Fleet Base West',
              image: null,
            },
          },
          {
            label: 'open date',
            content: {
              text: 'Dec 21, 2021',
              image: null,
            },
          },
          {
            label: 'open port',
            content: {
              text: 'Botas Natural Gas Terminal, ESBCN',
              image: null,
            },
          },
        ],
        [
          {
            label: 'tanker name',
            content: {
              text: 'Harvey Deep Sea',
              image: null,
            },
          },
          {
            label: 'imo',
            content: {
              text: '9131034',
              image: null,
            },
          },
          {
            label: 'fleet name',
            content: {
              text: 'Fleet Base West',
              image: null,
            },
          },
          {
            label: 'open date',
            content: {
              text: 'Dec 21, 2021',
              image: null,
            },
          },
          {
            label: 'open port',
            content: {
              text: 'Botas Natural Gas Terminal, ESBCN',
              image: null,
            },
          },
        ],
      ],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: { message: 'Internal server error' } });
  }
}
