'use client';

import { useEffect, useState } from 'react';

import { TypingIndicatorPropTypes } from '@/lib/types';

const TypingIndicator = ({ className, size = 'md' }) => {
  const [dotState, setDotState] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDotState(dotState === '' ? 'visible' : '');
    }, 500);

    return () => clearInterval(interval);
  }, [dotState]);

  const sizeProps = {
    md: 'w-1.5 h-1.5',
    sm: 'w-1 h-1',
  };

  return (
    <span className={`inline-flex items-center space-x-0.5 ${className}`}>
      <span className={`typing-dot ${sizeProps[size]} rounded-full bg-gray-400 animate-dot-pulse ${dotState}`} />
      <span
        className={`typing-dot  ${sizeProps[size]} rounded-full bg-gray-400 animate-dot-pulse delay-100 ${dotState}`}
      />
      <span
        className={`typing-dot  ${sizeProps[size]} rounded-full bg-gray-400 animate-dot-pulse delay-200 ${dotState}`}
      />
    </span>
  );
};

TypingIndicator.propTypes = TypingIndicatorPropTypes;

export default TypingIndicator;
