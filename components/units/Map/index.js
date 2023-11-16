'use client';

import { MapContainer, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import { getSeaMetrixURL } from '@/utils';

const Map = () => {
  return (
    <MapContainer center={[48.3794, 31.1656]} zoom={5}>
      <TileLayer url={getSeaMetrixURL('mapsapi/basemap15')} crossOrigin />
      <TileLayer url={getSeaMetrixURL('mapsapi/ports')} crossOrigin />
    </MapContainer>
  );
};

export default Map;
