'use client';

import { useEffect, useState } from 'react';
import { MapContainer, Polyline, TileLayer } from 'react-leaflet';

import { MapPropTypes } from '@/lib/types';

import { getTransitionalCoordinates } from '@/services';
import { CalculatedResult } from '@/units';
import { getSeaMetrixURL } from '@/utils';
import { getLineCoordinate } from '@/utils/helpers';
import { useHookForm } from '@/utils/hooks';

import 'leaflet/dist/leaflet.css';

const Map = ({ className = 'h-full' }) => {
  const { getValues } = useHookForm();
  const [coord, setCoord] = useState([]);

  const { fromPort, toPort, calculator, response } = getValues();

  const coordinates = getLineCoordinate({ data: { fromPort, toPort } });

  useEffect(() => {
    (async () => {
      const { data } = await getTransitionalCoordinates();
      setCoord(data[0]?.waypoints?.map(({ lon, lat }) => [lon, lat]) || []);
      // console.log(data, 'WAWA');
    })();
  }, []);

  return (
    <MapContainer center={[48.3794, 31.1656]} zoom={4} className={`relative font-inter-sans ${className}`}>
      <TileLayer url={getSeaMetrixURL('mapsapi/basemap15')} crossOrigin />
      <TileLayer url={getSeaMetrixURL('mapsapi/ports')} crossOrigin />
      {!!coordinates.length && <Polyline positions={coord} />}
      <CalculatedResult value={calculator?.value} result={response ?? null} />
    </MapContainer>
  );
};

Map.propTypes = MapPropTypes;

export default Map;
