import { useCallback, useEffect, useState } from 'react';

import delve from 'dlv';

import { PALLETE } from '@/lib/constants';

export function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

export function useIsHeaderVisible() {
  const [isVisible, setIsVisible] = useState(true);
  const breakpoint = 40;

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > breakpoint) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  });

  return { isVisible };
}

export function useValidationErrors() {
  const [errors, setErrors] = useState({});

  const addError = useCallback(
    (error) => {
      setErrors((prevState) => ({ ...prevState, ...error }));
    },
    [setErrors]
  );

  const removeErrorByKey = useCallback(
    (errorName) => {
      setErrors(({ [errorName]: _, ...rest }) => rest);
    },
    [setErrors]
  );

  return { errors, addError, removeErrorByKey };
}

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export const useColor = () => {
  const white = delve(PALLETE, 'COLORS.WHITE.DEFAULT');
  const black = delve(PALLETE, 'COLORS.BLACK.DEFAULT');
  const grey = delve(PALLETE, 'COLORS.GREY.DEFAULT');
  const red = delve(PALLETE, 'COLORS.RED.DEFAULT');
  const yellow = delve(PALLETE, 'COLORS.YELLOW.DEFAULT');
  const green = delve(PALLETE, 'COLORS.GREEN.DEFAULT');

  return {
    white,
    black,
    grey,
    red,
    yellow,
    green,
  };
};

export const useActiveColors = (isAcitve) => {
  const { white, grey } = useColor();

  return isAcitve ? white : grey;
};
