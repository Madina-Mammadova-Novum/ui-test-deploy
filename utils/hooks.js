/* eslint-disable no-unused-vars */

'use client';

import { use, useCallback, useEffect, useRef, useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import delve from 'dlv';
import { usePathname } from 'next/navigation';

import { getFilledArray } from './helpers';

import { navigationPagesAdapter } from '@/adapters/navigation';
import { NAVIGATION_PARAMS, PALETTE, SORT_OPTIONS } from '@/lib/constants';
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
export const useHookFormParams = ({ state = {}, schema = {} }) => {
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

export const useFilters = (itemsPerPage, initialPage, { data }, sortValue) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [perPage, setPerPage] = useState(itemsPerPage);
  const [option, setSelectedPage] = useState([]);

  const [ascSort, setAscSort] = useState(sortValue === SORT_OPTIONS.asc);
  const prevItemsPerPageRef = useRef(perPage);

  useEffect(() => {
    if (perPage !== prevItemsPerPageRef.current) {
      setCurrentPage(1);
    }
  }, [perPage]);

  const numberOfPages = Math.ceil(data?.length / perPage);
  const itemsFrom = (currentPage - 1) * perPage;
  const items = data?.slice(itemsFrom, itemsFrom + perPage);
  // We checking if type presented only after that we can sort
  const sortedItems = items?.[0]?.type
    ? items.toSorted((a, b) => {
        if (ascSort && b.type === SORT_OPTIONS.dsc && a.type === SORT_OPTIONS.asc) {
          return 1;
        }

        if (!ascSort && a.type === SORT_OPTIONS.dsc && b.type === SORT_OPTIONS.asc) {
          return -1;
        }
        return 0;
      })
    : items;

  useEffect(() => {
    setSelectedPage(getFilledArray(numberOfPages)?.map(navigationPagesAdapter));
  }, [data, numberOfPages]);

  const handlePageChange = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const handleSelectedPageChange = ({ value }) => {
    setCurrentPage(value);
  };
  const onChangeOffers = ({ value }) => {
    setPerPage(value);
  };

  const handleSortChange = ({ value }) => {
    setAscSort(value === 'ascending');
  };

  return {
    numberOfPages,
    items: sortedItems,
    currentPage,
    handleSortChange,
    handlePageChange,
    handleSelectedPageChange,
    selectedPage: option,
    onChangeOffers,
    perPage,
  };
};

export const useFetch = (fetchFunction) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchFunction();
        setData(response);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [fetchFunction]);

  return [data, isLoading];
};

export const useSidebarActiveColor = (path) => {
  const pathname = usePathname();

  if (path === pathname) return { isActive: true };

  return { isActive: false };
};

export const useAuth = () => {
  const pathname = usePathname();
  return {
    isAuthorized: pathname.length > 1,
    user: {},
    token: '',
  };
};
