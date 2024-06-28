import { useMap } from 'react-leaflet';

import { ChangeViewPropTypes } from '@/lib/types';

function ChangeView({ center, zoom = 4 }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

ChangeView.propTypes = ChangeViewPropTypes;

export default ChangeView;
