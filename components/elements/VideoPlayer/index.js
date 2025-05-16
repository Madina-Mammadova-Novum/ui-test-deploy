'use client';

import { useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';

import PlaySVG from '@/assets/images/play.svg';
import { Button } from '@/elements';

/**
 * @component VideoPlayer
 * @description Displays a video with custom play button and behavior
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch((error) => {
            console.error('Error playing video:', error);
          });
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    if (!autoPlayOnScroll || typeof window === 'undefined') {
      return undefined;
    }

    const handleIntersection = (entries) => {
      const [entry] = entries;

      // Play/pause based on visibility
      if (videoRef.current) {
        if (entry.isIntersecting) {
          videoRef.current
            .play()
            .then(() => {
              setIsPlaying(true);
              setHasInteracted(true);
            })
            .catch(() => {
              // Autoplay might be blocked by browser, ignore error
            });
        } else {
          videoRef.current.pause();
          setIsPlaying(false);
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

  // Handle video end event
  useEffect(() => {
    const videoElement = videoRef.current;

    const handleEnded = () => {
      if (!loop) {
        setIsPlaying(false);
      }
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setHasInteracted(true);
    };

    if (videoElement) {
      videoElement.addEventListener('ended', handleEnded);
      videoElement.addEventListener('pause', handlePause);
      videoElement.addEventListener('play', handlePlay);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('ended', handleEnded);
        videoElement.removeEventListener('pause', handlePause);
        videoElement.removeEventListener('play', handlePlay);
      }
    };
  }, [loop]);

  return (
    <div className={`relative w-full overflow-hidden ${className}`} style={{ aspectRatio: '16/9' }}>
      <video
        ref={videoRef}
        controls={hasInteracted && controls}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        preload={preload}
        className="absolute inset-0 h-full w-full object-cover"
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

      {(!isPlaying || !hasInteracted) && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Button
            type="button"
            onClick={handlePlayPause}
            customStyles="flex h-12 w-12 items-center justify-center !rounded-full transition-all"
            buttonProps={{
              variant: 'primary',
              size: 'large',
              icon: {
                before: <PlaySVG className="h-7 w-7 fill-white" />,
              },
            }}
            aria-label="Play video"
          />
        </div>
      )}
    </div>
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
