'use client';

import { useEffect, useRef } from 'react';

import PropTypes from 'prop-types';

/**
 * @component VideoPlayer
 * @description Displays a video with scroll-triggered autoplay
 */
const VideoPlayer = ({
  src,
  type = 'video/mp4',
  controls = true,
  autoPlay = false,
  autoPlayOnScroll = false,
  loop = false,
  muted = false,
  preload = 'auto',
  className = '',
  captionSrc = '',
  captionLabel = 'English',
  captionLanguage = 'en',
  poster = '',
  ...rest
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!autoPlayOnScroll || typeof window === 'undefined') {
      return undefined;
    }

    const handleIntersection = (entries) => {
      const [entry] = entries;

      // Play/pause based on visibility
      if (videoRef.current) {
        if (entry.isIntersecting) {
          videoRef.current.play().catch(() => {
            // Autoplay might be blocked by browser, ignore error
          });
        } else {
          videoRef.current.pause();
        }
      }
    };

    // eslint-disable-next-line no-undef
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.3, // Trigger when 30% of video is visible
    });

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [autoPlayOnScroll]);

  return (
    <video
      ref={videoRef}
      controls={controls}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      preload={preload}
      className={`w-full ${className}`}
      poster={poster}
      controlsList="nodownload"
      {...rest}
    >
      <source src={src} type={type} />
      <track
        kind="captions"
        src={captionSrc || '/captions/default.vtt'}
        srcLang={captionLanguage}
        label={captionLabel}
      />
      Your browser does not support the video tag.
    </video>
  );
};

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  type: PropTypes.string,
  controls: PropTypes.bool,
  autoPlay: PropTypes.bool,
  autoPlayOnScroll: PropTypes.bool,
  loop: PropTypes.bool,
  muted: PropTypes.bool,
  preload: PropTypes.string,
  className: PropTypes.string,
  captionSrc: PropTypes.string,
  captionLabel: PropTypes.string,
  captionLanguage: PropTypes.string,
  poster: PropTypes.string,
};

export default VideoPlayer;
