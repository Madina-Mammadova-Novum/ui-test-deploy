'use client';

import { MapContainer, Polyline, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import { MapPropTypes } from '@/lib/types';

import { CalculatedResult } from '@/units';
import { getSeaMetrixURL } from '@/utils';
import { getLineCoordinate } from '@/utils/helpers';
import { useHookForm } from '@/utils/hooks';

const Map = ({ className = 'h-full' }) => {
  const { getValues } = useHookForm();

  const { fromPort, toPort, calculator, response } = getValues();

  const coordinates = getLineCoordinate({ data: { fromPort, toPort } });

  return (
    <MapContainer center={[48.3794, 31.1656]} zoom={4} className={`relative font-inter-sans ${className}`}>
      <TileLayer url={getSeaMetrixURL('mapsapi/basemap15')} crossOrigin />
      <TileLayer url={getSeaMetrixURL('mapsapi/ports')} crossOrigin />
      {!!coordinates.length && <Polyline positions={coordinates?.map((lanLot) => lanLot)} />}
      <CalculatedResult value={calculator?.value} result={response ?? null} />
    </MapContainer>
  );
};

Map.propTypes = MapPropTypes;

export default Map;
