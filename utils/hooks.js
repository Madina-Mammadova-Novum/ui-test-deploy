'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import { usePathname, useRouter } from 'next/navigation';

import { getFilledArray, sortByType } from './helpers';

import { navigationPagesAdapter } from '@/adapters/navigation';
import { ROUTES } from '@/lib';
import { SORT_OPTIONS } from '@/lib/constants';
import { clearSession } from '@/store/entities/auth/slice';
import { resetChat } from '@/store/entities/chat/slice';
import { resetNotificationData } from '@/store/entities/notifications/slice';
import { notificationToastFunc, toastFunc } from '@/utils/index';

export const successToast = (title, description = '') => {
  return toastFunc('success', title, description);
};

export const errorToast = (title, description = '') => {
  return toastFunc('error', title, description);
};

export const useNotificationToast = (notificationData) => {
  return notificationToastFunc(notificationData);
};

export const redirectAfterToast = (message, url) => {
  return new Promise((resolve) => {
    successToast(message);
    setTimeout(() => {
      window.location.href = url;
      resolve();
    }, 2000);
  });
};

export const useHookForm = () => {
  const methods = useFormContext();

  return { ...methods, isSubmitting: methods?.formState?.isSubmitting };
};

export const useHookFormParams = ({ state = null, schema = null, mode = null }) => {
  const params = useForm({
    defaultValues: state,
    resolver: schema ? yupResolver(schema) : null,
    mode,
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

  const getItems = useCallback(() => {
    if (data) {
      return data.slice((currentPage - 1) * perPage, currentPage * perPage);
    }
    return null;
  }, [data, currentPage, perPage]);

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

  const handlePageChange = useCallback(
    (page) => handleChangeState('currentPage', page.selected + 1),
    [handleChangeState]
  );

  const handleSelectedPageChange = useCallback(
    ({ value }) => handleChangeState('currentPage', value),
    [handleChangeState]
  );

  const handleSortChange = ({ value }) => handleChangeState('ascSort', value === 'Asc');
  const onChangeOffers = useCallback(({ value }) => handleChangeState('perPage', value), [handleChangeState]);

  useEffect(() => {
    if (data) {
      const options = getFilledArray(numberOfPages)?.map(navigationPagesAdapter);
      handleChangeState('option', options);
    }
  }, [data, numberOfPages]);

  useEffect(() => {
    if (perPage !== prevItemsPerPageRef?.current) {
      handleChangeState('currentPage', 1);
      prevItemsPerPageRef.current = perPage;
    }
  }, [perPage, prevItemsPerPageRef.current]);

  return {
    numberOfPages,
    currentPage,
    items: getSortedItems(items),
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

export const useHandleLogout = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Perform logout actions
    dispatch(clearSession());
    dispatch(resetNotificationData());
    dispatch(resetChat());

    // Redirect to login page
    router.replace(ROUTES.LOGIN);
    router.refresh();
  };

  return handleLogout;
};
