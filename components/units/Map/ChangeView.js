import { useMap } from 'react-leaflet';

function ChangeView({ center, zoom = 4 }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default ChangeView;
