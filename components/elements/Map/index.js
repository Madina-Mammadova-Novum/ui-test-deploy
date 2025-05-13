'use client';

import { useState } from 'react';

import classNames from 'classnames';

import { MapPropTypes } from '@/lib/types';

const Map = ({ title, embedMap, className }) => {
  const [isLoading, setIsLoading] = useState(true);
  const src = embedMap.match(/src="([^"]+)"/)[1];

  return (
    <div className="relative w-full md:w-auto">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-base bg-gray-100">
          <div className="text-center">
            <div className="mx-auto mb-2 h-10 w-10 animate-spin rounded-full border-b-2 border-black" />
            <p className="mt-4 text-xsm text-black">Loading map...</p>
          </div>
        </div>
      )}
      <iframe
        title={title}
        src={src}
        width="536"
        height="400"
        allowFullScreen=""
        loading="eager"
        referrerPolicy="no-referrer-when-downgrade"
        className={classNames('h-[400px] w-full rounded-base', className)}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

Map.propTypes = MapPropTypes;

export default Map;
