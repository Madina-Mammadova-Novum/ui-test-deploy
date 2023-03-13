'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import delve from 'dlv';

import { PALETTE } from '@/lib/constants';
import { toastFunc } from '@/utils/index';

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

export function useFetchEffect(ref, action) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (ref.current === false) dispatch(action());
    return () => {
      ref.current = true;
    };
  }, [action, dispatch, ref]);
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
  const white = delve(PALETTE, 'COLORS.WHITE.DEFAULT');
  const black = delve(PALETTE, 'COLORS.BLACK.DEFAULT');
  const grey = delve(PALETTE, 'COLORS.GREY.DEFAULT');
  const red = delve(PALETTE, 'COLORS.RED.DEFAULT');
  const yellow = delve(PALETTE, 'COLORS.YELLOW.DEFAULT');
  const green = delve(PALETTE, 'COLORS.GREEN.DEFAULT');
  const blue = delve(PALETTE, 'COLORS.BLUE.DEFAULT');

  return {
    white,
    black,
    grey,
    red,
    yellow,
    green,
    blue,
  };
};

export const useActiveColors = (isAcitve) => {
  const { white, grey } = useColor();

  return isAcitve ? white : grey;
};

export const successToast = (title, description = '') => {
  return toastFunc('success', title, description);
};

export const errorToast = (title, description = '') => {
  return toastFunc('error', title, description);
};

export const useWarningToast = (title, description = '') => {
  return toastFunc('warning', title, description);
};

export const useInfoToast = (title, description = '') => {
  return toastFunc('info', title, description);
};

export const useToast = (title, description = '') => {
  return toastFunc('default', title, description);
};

export const useHookForm = () => {
  const methods = useFormContext();

  return { ...methods };
};

/**
 *
 * @param state
 * @param schema
 * @returns {UseFormReturn<FieldValues, any>}
 */
export const useHookFormParams = ({ state, schema }) => {
  const params = useForm({
    defaultValues: { ...state },
    resolver: yupResolver(schema),
  });

  return params;
};

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);

    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);

  return matches;
};

export const useMounted = () => {
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  return mounted.current;
};
