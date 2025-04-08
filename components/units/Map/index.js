'use client';

import { useEffect, useState } from 'react';
import { MapContainer, Polyline, TileLayer } from 'react-leaflet';

import ChangeView from './ChangeView';

import { MapPropTypes } from '@/lib/types';

import { MapLoader } from '@/elements';
import { DEFAULT_COORDS, DEFAULT_ZOOM } from '@/lib/constants';
import './style.css';
import { CalculatedResult } from '@/units';
import { getSeaMetrixURL } from '@/utils';
import { fixLongitudeWrapping, getLineCoordinate, getMiddleElementFromArray } from '@/utils/helpers';
import { useHookForm } from '@/utils/hooks';
import 'leaflet/dist/leaflet.css';

const Map = ({ className = 'h-full' }) => {
  const { isSubmitting, watch } = useHookForm();
  const [coord, setCoord] = useState([]);
  const [middleCoord, setMiddleCoord] = useState(DEFAULT_COORDS);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);

  // Watch for changes in form values
  const response = watch('response');
  const fromPort = watch('fromPort');
  const toPort = watch('toPort');
  const calculator = watch('calculator');

  const coordinates = getLineCoordinate({ data: { fromPort, toPort } });

  useEffect(() => {
    // Reset the map for calculator changes or when response is null/reset
    if (!response) {
      setCoord([]);
      setMiddleCoord(DEFAULT_COORDS);
      setZoom(DEFAULT_ZOOM);
      return;
    }

    // Update the map when we have route data
    if (response?.route) {
      const nextCoord = response.route.map(({ lon, lat }) => [lat, lon]) || [];
      const wrappedCoordinates = fixLongitudeWrapping(nextCoord);
      setCoord(wrappedCoordinates);

      // Set zoom level based on coordinates length
      setZoom(wrappedCoordinates?.length > 45 ? 3 : DEFAULT_ZOOM);

      const nextMiddleElement = getMiddleElementFromArray(wrappedCoordinates);
      setMiddleCoord([...nextMiddleElement]);
    }
  }, [response]);

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
