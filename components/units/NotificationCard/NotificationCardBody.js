'use client';

import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import parse from 'html-react-parser';
import { useRouter } from 'next/navigation';

import { NotificationCardBodyPropTypes } from '@/lib/types';

import { Button } from '@/elements';
import { REGEX } from '@/lib/constants';
import { getCurrnetDealStage, readNotification } from '@/store/entities/notifications/actions';
import { resetDealData, resetParams } from '@/store/entities/notifications/slice';
import { getNotificationsDataSelector } from '@/store/selectors';
import { getCookieFromBrowser, getIdFromUrl } from '@/utils/helpers';

const NotificationCardBody = ({ message, url, urlId, disabled, setDisabled }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const role = getCookieFromBrowser('session-user-role');
  const { deal, filterParams } = useSelector(getNotificationsDataSelector);

  const isDealPath = useMemo(() => url?.startsWith('/deals'), [url]);
  const formattedMessage = message?.replace(REGEX.DETECT_ID, '<span class="font-semibold">$&</span>');

  const getDealStage = useCallback(() => {
    if (isDealPath) {
      const id = getIdFromUrl(url);
      dispatch(getCurrnetDealStage({ id, role }));
    }
  }, [isDealPath, url, getIdFromUrl, dispatch, role]);

  const resetDealStage = useCallback(() => {
    dispatch(resetDealData());
  }, [dispatch]);

  const handleRedirect = useCallback(() => {
    setDisabled(urlId);

    if (filterParams?.activeTab === 'unread') {
      dispatch(readNotification({ id: urlId }));
    }

    if (isDealPath) {
      if (deal?.route) {
        router.push(deal?.route);
      }
    } else {
      router.push(url);
    }
    dispatch(resetParams());
  }, [urlId, setDisabled, filterParams, isDealPath, deal?.route, url, dispatch]);

  return (
    <div className="flex flex-col items-start">
      <p className="text-xsm font-normal text-black">{parse(formattedMessage)}</p>
      <Button
        onClick={handleRedirect}
        onMouseEnter={getDealStage}
        onMouseLeave={resetDealStage}
        customStyles="!p-0 !pt-2.5 relative -left-1.5 underline decoration-underline "
        buttonProps={{ size: 'small', variant: 'primary', text: 'See details' }}
        disabled={disabled === urlId}
      />
    </div>
  );
};

NotificationCardBody.propTypes = NotificationCardBodyPropTypes;

export default NotificationCardBody;
