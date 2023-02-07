import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import PropTypes from 'prop-types';

const AnimatedTitleText = ({ titles }) => {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (titleIndex === titles.length - 1) {
        setTitleIndex(0);
        return;
      }
      setTitleIndex((prev) => {
        return prev + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [setTitleIndex, titleIndex, titles]);

  return (
    <span key={titles[titleIndex]?.title} className="animate-fade-in relative text-primary">
      {titles[titleIndex]?.title}
      <div className="absolute z-[-1] top-0 left-0 w-full min-w-[120px] sm:min-w-[210px] 2lg:min-w-[280px]">
        <Image
          width={280}
          height={100}
          alt="Circle Icon"
          src="/circle.png"
          className="h-full w-full object-cover object-center"
          quality={75}
        />
      </div>
    </span>
  );
};

AnimatedTitleText.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AnimatedTitleText;
