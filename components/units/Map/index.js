'use client';

import { useEffect, useState } from 'react';
import { MapContainer, Polyline, TileLayer } from 'react-leaflet';

import ChangeView from './ChangeView';

import { MapPropTypes } from '@/lib/types';

import { MapLoader } from '@/elements';
import './style.css';
import { CalculatedResult } from '@/units';
import { getSeaMetrixURL } from '@/utils';
import { fixLongitudeWrapping, getLineCoordinate, getMiddleElementFromArray } from '@/utils/helpers';
import { useHookForm } from '@/utils/hooks';

import 'leaflet/dist/leaflet.css';

const Map = ({ className = 'h-full' }) => {
  const { getValues, isSubmitting } = useHookForm();
  const [coord, setCoord] = useState([]);
  const [middleCoord, setMiddleCoord] = useState([48.3794, 31.1656]);
  const [zoom, setZoom] = useState(4);

  const { fromPort, toPort, calculator, response } = getValues();

  const coordinates = getLineCoordinate({ data: { fromPort, toPort } });

  useEffect(() => {
    if (!response?.route) return;

    const nextCoord = response?.route?.map(({ lon, lat }) => [lat, lon]) || [];
    const wrappedCoordinates = fixLongitudeWrapping(nextCoord);
    setCoord(wrappedCoordinates);

    // Set zoom level based on coordinates length
    setZoom(wrappedCoordinates?.length > 45 ? 3 : 4);

    const nextMiddleElement = getMiddleElementFromArray(wrappedCoordinates);
    setMiddleCoord([...nextMiddleElement]);
  }, [response]);

  useEffect(() => {
    setMiddleCoord([48.3794, 31.1656]);
    setCoord([]);
    setZoom(4); // Reset zoom to default when calculator changes
  }, [calculator]);

  return (
    <MapContainer center={middleCoord} zoom={zoom} className={`relative font-inter-sans ${className}`}>
      {isSubmitting && <MapLoader />}
      <ChangeView center={middleCoord} zoom={zoom} />
      <TileLayer url={getSeaMetrixURL('mapsapi/simplemap')} crossOrigin />
      <TileLayer url={getSeaMetrixURL('mapsapi/ports')} crossOrigin />
      {!!coordinates.length && <Polyline positions={coord} />}
      <CalculatedResult value={calculator?.value} result={isSubmitting || !response ? null : response} />
    </MapContainer>
  );
};

Map.propTypes = MapPropTypes;

export default Map;
