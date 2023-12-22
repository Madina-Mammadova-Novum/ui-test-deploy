'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { getFilledArray, sortByType } from './helpers';

import { navigationPagesAdapter } from '@/adapters/navigation';
import { chartererSidebarAdapter, ownerSidebarAdapter } from '@/adapters/sidebar';
import { tokenAdapter } from '@/adapters/user';
import { ROLES, SORT_OPTIONS } from '@/lib/constants';
import { refreshAccessToken } from '@/services';
import { fetchCountries, fetchPorts } from '@/store/entities/general/actions';
import { setRoleIdentity } from '@/store/entities/user/slice';
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

export const redirectAfterToast = (message, url) => {
  return new Promise((resolve) => {
    successToast(message);
    setTimeout(() => {
      window.location.href = url;
      resolve();
    }, 3000);
  });
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

export const useFilters = ({ itemsPerPage, initialPage, data, sortValue }) => {
  const prevItemsPerPageRef = useRef(itemsPerPage);

  const [state, setState] = useState({
    currentPage: initialPage,
    perPage: itemsPerPage,
    ascSort: sortValue === SORT_OPTIONS.asc,
    option: [],
  });

  const { currentPage, perPage, ascSort, option } = state;

  const handleChangeState = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const getNumberOfPages = useCallback(() => Math.ceil(data?.length / perPage), [data, perPage]);
  const getItems = useCallback(
    () => data?.slice((currentPage - 1) * perPage, currentPage * perPage),
    [data, currentPage, perPage]
  );
  const getSortedItems = useCallback(
    (items) => {
      if (!items || !items[0]?.type) {
        return items;
      }
      return [...items].sort((a, b) => sortByType(a, b, ascSort));
    },
    [ascSort]
  );

  const items = getItems();
  const numberOfPages = getNumberOfPages();
  const options = getFilledArray(numberOfPages)?.map(navigationPagesAdapter);
  const sortedItems = getSortedItems(items);

  const handlePageChange = (page) => handleChangeState('currentPage', page.selected + 1);
  const handleSelectedPageChange = ({ value }) => handleChangeState('currentPage', value);
  const onChangeOffers = ({ value }) => handleChangeState('perPage', value);
  const handleSortChange = ({ value }) => handleChangeState('ascSort', value === 'Asc');
  const handleOptionsChange = () => handleChangeState('option', options);

  useEffect(() => {
    handleOptionsChange();
  }, [data]);

  useEffect(() => {
    if (perPage !== prevItemsPerPageRef.current) {
      handleChangeState('currentPage', 1);
      prevItemsPerPageRef.current = perPage;
    }
  }, [perPage]);

  if (!data) return [];

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

export const useFetch = (fetchFunction, trigger) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: content } = await fetchFunction();
        setData(content);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [fetchFunction, trigger]);

  return [data, isLoading];
};

export const useSidebarActiveColor = (path) => {
  const pathname = usePathname();

  if (path === pathname) return { isActive: true };

  return { isActive: false };
};

export const getRoleBasedNavigation = async ({ role }) => {
  switch (role) {
    case ROLES.OWNER:
      return { data: ownerSidebarAdapter({ role }) };
    case ROLES.CHARTERER:
      return { data: chartererSidebarAdapter({ role }) };
    default:
      return { data: [] };
  }
};

export const useFormUpdate = (name, index, initialValue) => {
  const fieldName = `${name}[${index}]`;
  const methods = useHookForm();

  useEffect(() => {
    methods.setValue(fieldName, initialValue);
  }, [fieldName, initialValue, methods]);

  return fieldName;
};

export const useDisableNumberInputScroll = () => {
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
    };

    const numberInputs = document.querySelectorAll('input[type="number"]');

    numberInputs.forEach((input) => {
      input.addEventListener('wheel', handleWheel, { passive: false });
    });

    return () => {
      numberInputs.forEach((input) => {
        input.removeEventListener('wheel', handleWheel);
      });
    };
  }, []);
};

export const useExtraData = ({ role }) => {
  const dispatch = useDispatch();

  const getGeneralData = () => {
    dispatch(fetchPorts());
    dispatch(fetchCountries());
  };

  useEffect(() => {
    getGeneralData();

    if (role) {
      dispatch(setRoleIdentity(role));
    }
  }, []);
};

export const useRefreshSession = () => {
  const { data, update } = useSession();

  useExtraData({ role: data?.role });

  const updateSession = async () => {
    try {
      const { data: token, error } = await refreshAccessToken({ token: data?.refreshToken });

      await update(tokenAdapter({ data: token }));

      if (error) {
        throw Error(error.message);
      }
    } catch (err) {
      errorToast('Bad request', 'Access token was expired, please login again');
    }
  };

  const expired = Date.now() >= data?.expires;

  useEffect(() => {
    if (expired) {
      updateSession();
    }
  }, [expired, data?.expires, data?.refreshToken]);
};
