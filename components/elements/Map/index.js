import classNames from 'classnames';

import { MapPropTypes } from '@/lib/types';

const Map = ({ title, embedMap, className }) => {
  const src = embedMap.match(/src="([^"]+)"/)[1];
  return (
    <iframe
      title={title}
      src={src}
      width="536"
      height="400"
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={classNames('h-[400px] w-full rounded-base', className)}
    />
  );
};

Map.propTypes = MapPropTypes;

export default Map;
