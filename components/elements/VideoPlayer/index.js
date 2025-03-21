'use client';

import PropTypes from 'prop-types';

/**
 * @component VideoPlayer
 * @description Displays a video with customizable controls and styling
 */
const VideoPlayer = ({
  src,
  type = 'video/mp4',
  controls = true,
  autoPlay = false,
  loop = false,
  muted = false,
  preload = 'auto',
  className = '',
  captionSrc = '',
  captionLabel = 'English',
  captionLanguage = 'en',
  ...rest
}) => {
  return (
    <video
      controls={controls}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      preload={preload}
      className={`w-full ${className}`}
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
  loop: PropTypes.bool,
  muted: PropTypes.bool,
  preload: PropTypes.string,
  className: PropTypes.string,
  captionSrc: PropTypes.string,
  captionLabel: PropTypes.string,
  captionLanguage: PropTypes.string,
};

export default VideoPlayer;
