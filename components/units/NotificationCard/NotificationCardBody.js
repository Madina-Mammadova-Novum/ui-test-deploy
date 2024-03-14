'use client';

import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import parse from 'html-react-parser';
import { useRouter } from 'next/navigation';

import { NotificationCardBodyPropTypes } from '@/lib/types';

import { Button } from '@/elements';
import { REGEX } from '@/lib/constants';
import { getCurrnetDealStage, readNotification } from '@/store/entities/notifications/actions';
import { resetParams } from '@/store/entities/notifications/slice';
import { getNotificationsDataSelector } from '@/store/selectors';
import { getCookieFromBrowser, getIdFromUrl, notificationPathGenerator } from '@/utils/helpers';

const NotificationCardBody = ({ message, url, urlId }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [prevId, setPrevId] = useState(null);

  const role = getCookieFromBrowser('session-user-role');
  const { deal, filterParams } = useSelector(getNotificationsDataSelector);

  const isDealPath = useMemo(() => {
    return url?.startsWith('/deals');
  }, [url]);

  const formattedMessage = message?.replace(REGEX.DETECT_ID, '<span class="font-semibold">$&</span>');

  const getDealStage = useCallback(() => {
    if (isDealPath) {
      const id = getIdFromUrl(url);
      if (id !== prevId) {
        setPrevId(id);
        dispatch(getCurrnetDealStage({ id, role }));
      }
    }
  }, [url, role, prevId, isDealPath]);

  const handleRedirect = useCallback(async () => {
    if (filterParams?.activeTab === 'unread') {
      dispatch(readNotification({ id: urlId }));
    }

    if (isDealPath) {
      const route = notificationPathGenerator({ data: deal, role });
      if (route) router.push(route);
    } else {
      router.push(url);
    }

    dispatch(resetParams());
  }, [notificationPathGenerator, resetParams, url, role, deal, isDealPath]);

  return (
    <div className="flex flex-col items-start">
      <p className="text-xsm font-normal text-black">{parse(formattedMessage)}</p>
      <Button
        onClick={handleRedirect}
        onMouseEnter={getDealStage}
        customStyles="!p-0 !pt-2.5 relative -left-1.5 underline decoration-underline "
        buttonProps={{ size: 'small', variant: 'primary', text: 'See details' }}
      />
    </div>
  );
};

NotificationCardBody.propTypes = NotificationCardBodyPropTypes;

export default NotificationCardBody;
