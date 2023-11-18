'use client';

import { MapContainer, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import { MapPropTypes } from '@/lib/types';

import { CalculatedResult } from '@/units';
import { getSeaMetrixURL } from '@/utils';

const Map = ({ className = 'h-full' }) => {
  return (
    <MapContainer center={[48.3794, 31.1656]} zoom={4} className={`relative font-inter-sans ${className}`}>
      <TileLayer url={getSeaMetrixURL('mapsapi/basemap15')} crossOrigin />
      <TileLayer url={getSeaMetrixURL('mapsapi/ports')} crossOrigin />
      <CalculatedResult />
    </MapContainer>
  );
};

Map.propTypes = MapPropTypes;

export default Map;
