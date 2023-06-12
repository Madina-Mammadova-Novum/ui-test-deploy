import ClockSVG from '@/assets/images/clock.svg';

export const ownerOnSubsHeaderDataAdapter = ({ data }) => {
  if (!data) return null;
  const { cargoId, tankerName, cargoType, quantiity, loadPort, laycanStart, laycanEnd, countdown } = data;

  return [
    {
      label: 'Cargo id',
      text: cargoId ?? '',
    },
    {
      label: 'Tanker name',
      text: tankerName ?? '',
    },
    {
      label: 'Cargo type',
      text: cargoType ?? '',
    },
    {
      label: 'Quantity',
      text: quantiity ?? '',
    },
    {
      label: 'Load port',
      text: loadPort ?? '',
    },
    {
      label: 'Laycan start',
      text: laycanStart ?? '',
    },
    {
      label: 'Laycan end',
      text: laycanEnd ?? '',
    },
    {
      label: 'Countdown',
      text: countdown ?? '',
      textStyles: 'text-red',
      coverImage: <ClockSVG className="w-4 h-4 fill-red" viewBox="0 0 24 24" />,
    },
  ];
};
