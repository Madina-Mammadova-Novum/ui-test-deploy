'use client';

import { useEffect, useState } from 'react';
import { MapContainer, Polyline, TileLayer } from 'react-leaflet';

import ChangeView from './ChangeView';

import { MapPropTypes } from '@/lib/types';

import { MapLoader } from '@/elements';
import './style.css';
import { getTransitionalCoordinates } from '@/services';
import { CalculatedResult } from '@/units';
import { getSeaMetrixURL } from '@/utils';
import { getLineCoordinate, getMiddleElementFromArray, getValueAfterComma } from '@/utils/helpers';
import { useHookForm } from '@/utils/hooks';

import 'leaflet/dist/leaflet.css';

const Map = ({ className = 'h-full' }) => {
  const { getValues } = useHookForm();
  const [coord, setCoord] = useState([]);
  const [middleCoord, setMiddleCoord] = useState([48.3794, 31.1656]);
  const [isLoading, setIsLoading] = useState(false);

  const { fromPort, toPort, calculator, response } = getValues();

  const coordinates = getLineCoordinate({ data: { fromPort, toPort } });

  useEffect(() => {
    (async () => {
      if (!response) return;
      setIsLoading(true);

      const fromPortCode = getValueAfterComma(fromPort?.label);
      const toPortCode = getValueAfterComma(toPort?.label);
      const { data } =
        response && (await getTransitionalCoordinates({ StartPortCode: fromPortCode, EndPortCode: toPortCode }));
      setIsLoading(false);
      const nextCoord = data[0]?.waypoints?.map(({ lon, lat }) => [lat, lon]) || [];
      setCoord([...nextCoord]);

      const nextMiddleElement = getMiddleElementFromArray(nextCoord);
      setMiddleCoord([...nextMiddleElement]);
    })();
  }, [response]);

  return (
    <MapContainer center={middleCoord} zoom={4} className={`relative font-inter-sans ${className}`}>
      {isLoading && <MapLoader />}
      <ChangeView center={middleCoord} />
      <TileLayer url={getSeaMetrixURL('mapsapi/simplemap')} crossOrigin />
      <TileLayer url={getSeaMetrixURL('mapsapi/ports')} crossOrigin />
      {!!coordinates.length && <Polyline positions={coord} />}
      <CalculatedResult value={calculator?.value} result={response ?? null} />
    </MapContainer>
  );
};

Map.propTypes = MapPropTypes;

export default Map;
