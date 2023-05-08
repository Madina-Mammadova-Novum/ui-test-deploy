function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default async function handler(req, res) {
  await sleep(2000);
  res.status(200).json({
    data: [
      [
        {
          label: 'cargo id11',
          content: {
            text: 'TY7621',
          },
        },
        {
          label: 'tanker name',
          content: {
            text: 'Harvey Deep Sea',
          },
        },
        {
          label: 'cargo type',
          content: {
            text: 'Gas (Liquified)',
          },
        },
        {
          label: 'quantity',
          content: {
            text: '24,118 tons',
          },
        },
        {
          label: 'load port',
          content: {
            text: 'Botas Natural Gas T... ESBCN',
          },
        },
        {
          label: 'laycan start',
          content: {
            text: 'Dec 21, 2021',
          },
        },
        {
          label: 'laycan end',
          content: {
            text: 'Dec 30, 2021',
          },
        },
        {
          label: 'countdown',
          content: {
            text: '15min',
          },
        },
      ],
      [
        {
          label: 'cargo id',
          content: {
            text: 'TY7621',
          },
        },
        {
          label: 'tanker name',
          content: {
            text: 'Harvey Deep Sea',
          },
        },
        {
          label: 'cargo type',
          content: {
            text: 'Gas (Liquified)',
          },
        },
        {
          label: 'quantity',
          content: {
            text: '24,118 tons',
          },
        },
        {
          label: 'load port',
          content: {
            text: 'Botas Natural Gas T... ESBCN',
          },
        },
        {
          label: 'laycan start',
          content: {
            text: 'Dec 21, 2021',
          },
        },
        {
          label: 'laycan end',
          content: {
            text: 'Dec 30, 2021',
          },
        },
        {
          label: 'countdown',
          content: {
            text: '15min',
          },
        },
      ],
      [
        {
          label: 'cargo id',
          content: {
            text: 'TY7621',
          },
        },
        {
          label: 'tanker name',
          content: {
            text: 'Harvey Deep Sea',
          },
        },
        {
          label: 'cargo type',
          content: {
            text: 'Gas (Liquified)',
          },
        },
        {
          label: 'quantity',
          content: {
            text: '24,118 tons',
          },
        },
        {
          label: 'load port',
          content: {
            text: 'Botas Natural Gas T... ESBCN',
          },
        },
        {
          label: 'laycan start',
          content: {
            text: 'Dec 21, 2021',
          },
        },
        {
          label: 'laycan end',
          content: {
            text: 'Dec 30, 2021',
          },
        },
        {
          label: 'countdown',
          content: {
            text: '15min',
          },
        },
      ],
      [
        {
          label: 'cargo id',
          content: {
            text: 'TY7621',
          },
        },
        {
          label: 'tanker name',
          content: {
            text: 'Harvey Deep Sea',
          },
        },
        {
          label: 'cargo type',
          content: {
            text: 'Gas (Liquified)',
          },
        },
        {
          label: 'quantity',
          content: {
            text: '24,118 tons',
          },
        },
        {
          label: 'load port',
          content: {
            text: 'Botas Natural Gas T... ESBCN',
          },
        },
        {
          label: 'laycan start',
          content: {
            text: 'Dec 21, 2021',
          },
        },
        {
          label: 'laycan end',
          content: {
            text: 'Dec 30, 2021',
          },
        },
        {
          label: 'countdown',
          content: {
            text: '15min',
          },
        },
      ],
      [
        {
          label: 'cargo id',
          content: {
            text: 'TY7621',
          },
        },
        {
          label: 'tanker name',
          content: {
            text: 'Harvey Deep Sea',
          },
        },
        {
          label: 'cargo type',
          content: {
            text: 'Gas (Liquified)',
          },
        },
        {
          label: 'quantity',
          content: {
            text: '24,118 tons',
          },
        },
        {
          label: 'load port',
          content: {
            text: 'Botas Natural Gas T... ESBCN',
          },
        },
        {
          label: 'laycan start',
          content: {
            text: 'Dec 21, 2021',
          },
        },
        {
          label: 'laycan end',
          content: {
            text: 'Dec 30, 2021',
          },
        },
        {
          label: 'countdown',
          content: {
            text: '15min',
          },
        },
      ],
      [
        {
          label: 'cargo id',
          content: {
            text: 'TY7621',
          },
        },
        {
          label: 'tanker name',
          content: {
            text: 'Harvey Deep Sea',
          },
        },
        {
          label: 'cargo type',
          content: {
            text: 'Gas (Liquified)',
          },
        },
        {
          label: 'quantity',
          content: {
            text: '24,118 tons',
          },
        },
        {
          label: 'load port',
          content: {
            text: 'Botas Natural Gas T... ESBCN',
          },
        },
        {
          label: 'laycan start',
          content: {
            text: 'Dec 21, 2021',
          },
        },
        {
          label: 'laycan end',
          content: {
            text: 'Dec 30, 2021',
          },
        },
        {
          label: 'countdown',
          content: {
            text: '15min',
          },
        },
      ],
      [
        {
          label: 'cargo id',
          content: {
            text: 'TY7621',
          },
        },
        {
          label: 'tanker name',
          content: {
            text: 'Harvey Deep Sea',
          },
        },
        {
          label: 'cargo type',
          content: {
            text: 'Gas (Liquified)',
          },
        },
        {
          label: 'quantity',
          content: {
            text: '24,118 tons',
          },
        },
        {
          label: 'load port',
          content: {
            text: 'Botas Natural Gas T... ESBCN',
          },
        },
        {
          label: 'laycan start',
          content: {
            text: 'Dec 21, 2021',
          },
        },
        {
          label: 'laycan end',
          content: {
            text: 'Dec 30, 2021',
          },
        },
        {
          label: 'countdown',
          content: {
            text: '15min',
          },
        },
      ],
      [
        {
          label: 'cargo id',
          content: {
            text: 'TY7621',
          },
        },
        {
          label: 'tanker name',
          content: {
            text: 'Harvey Deep Sea',
          },
        },
        {
          label: 'cargo type',
          content: {
            text: 'Gas (Liquified)',
          },
        },
        {
          label: 'quantity',
          content: {
            text: '24,118 tons',
          },
        },
        {
          label: 'load port',
          content: {
            text: 'Botas Natural Gas T... ESBCN',
          },
        },
        {
          label: 'laycan start',
          content: {
            text: 'Dec 21, 2021',
          },
        },
        {
          label: 'laycan end',
          content: {
            text: 'Dec 30, 2021',
          },
        },
        {
          label: 'countdown',
          content: {
            text: '15min',
          },
        },
      ],
      [
        {
          label: 'cargo id',
          content: {
            text: 'TY7621',
          },
        },
        {
          label: 'tanker name',
          content: {
            text: 'Harvey Deep Sea',
          },
        },
        {
          label: 'cargo type',
          content: {
            text: 'Gas (Liquified)',
          },
        },
        {
          label: 'quantity',
          content: {
            text: '24,118 tons',
          },
        },
        {
          label: 'load port',
          content: {
            text: 'Botas Natural Gas T... ESBCN',
          },
        },
        {
          label: 'laycan start',
          content: {
            text: 'Dec 21, 2021',
          },
        },
        {
          label: 'laycan end',
          content: {
            text: 'Dec 30, 2021',
          },
        },
        {
          label: 'countdown',
          content: {
            text: '15min',
          },
        },
      ],
      [
        {
          label: 'cargo id',
          content: {
            text: 'TY7621',
          },
        },
        {
          label: 'tanker name',
          content: {
            text: 'Harvey Deep Sea',
          },
        },
        {
          label: 'cargo type',
          content: {
            text: 'Gas (Liquified)',
          },
        },
        {
          label: 'quantity',
          content: {
            text: '24,118 tons',
          },
        },
        {
          label: 'load port',
          content: {
            text: 'Botas Natural Gas T... ESBCN',
          },
        },
        {
          label: 'laycan start',
          content: {
            text: 'Dec 21, 2021',
          },
        },
        {
          label: 'laycan end',
          content: {
            text: 'Dec 30, 2021',
          },
        },
        {
          label: 'countdown',
          content: {
            text: '15min',
          },
        },
      ],
      [
        {
          label: 'cargo id',
          content: {
            text: 'TY7621',
          },
        },
        {
          label: 'tanker name',
          content: {
            text: 'Harvey Deep Sea',
          },
        },
        {
          label: 'cargo type',
          content: {
            text: 'Gas (Liquified)',
          },
        },
        {
          label: 'quantity',
          content: {
            text: '24,118 tons',
          },
        },
        {
          label: 'load port',
          content: {
            text: 'Botas Natural Gas T... ESBCN',
          },
        },
        {
          label: 'laycan start',
          content: {
            text: 'Dec 21, 2021',
          },
        },
        {
          label: 'laycan end',
          content: {
            text: 'Dec 30, 2021',
          },
        },
        {
          label: 'countdown',
          content: {
            text: '15min',
          },
        },
      ],
      [
        {
          label: 'cargo id',
          content: {
            text: 'TY7621',
          },
        },
        {
          label: 'tanker name',
          content: {
            text: 'Harvey Deep Sea',
          },
        },
        {
          label: 'cargo type',
          content: {
            text: 'Gas (Liquified)',
          },
        },
        {
          label: 'quantity',
          content: {
            text: '24,118 tons',
          },
        },
        {
          label: 'load port',
          content: {
            text: 'Botas Natural Gas T... ESBCN',
          },
        },
        {
          label: 'laycan start',
          content: {
            text: 'Dec 21, 2021',
          },
        },
        {
          label: 'laycan end',
          content: {
            text: 'Dec 30, 2021',
          },
        },
        {
          label: 'countdown',
          content: {
            text: '15min',
          },
        },
      ],
      [
        {
          label: 'cargo id',
          content: {
            text: 'TY7621',
          },
        },
        {
          label: 'tanker name',
          content: {
            text: 'Harvey Deep Sea',
          },
        },
        {
          label: 'cargo type',
          content: {
            text: 'Gas (Liquified)',
          },
        },
        {
          label: 'quantity',
          content: {
            text: '24,118 tons',
          },
        },
        {
          label: 'load port',
          content: {
            text: 'Botas Natural Gas T... ESBCN',
          },
        },
        {
          label: 'laycan start',
          content: {
            text: 'Dec 21, 2021',
          },
        },
        {
          label: 'laycan end',
          content: {
            text: 'Dec 30, 2021',
          },
        },
        {
          label: 'countdown',
          content: {
            text: '15min',
          },
        },
      ],
    ],
  });
}
