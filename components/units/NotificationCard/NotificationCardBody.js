'use client';

import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import parse from 'html-react-parser';
import { useRouter } from 'next/navigation';

import { NotificationCardBodyPropTypes } from '@/lib/types';

import { Button } from '@/elements';
import { REGEX } from '@/lib/constants';
import { getOfferDetails } from '@/services/offer';
import { setIsOpened } from '@/store/entities/notifications/slice';
import { getCookieFromBrowser, getIdFromUrl, notificationPathGenerator } from '@/utils/helpers';

const NotificationCardBody = ({ message, url }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const role = getCookieFromBrowser('session-user-role');

  const [deal, setDeal] = useState(null);
  const [prevId, setPrevId] = useState(null);

  const formattedMessage = message?.replace(REGEX.DETECT_ID, '<span class="font-semibold">$&</span>');

  const getDealStage = useCallback(async () => {
    if (url?.startsWith('/deals')) {
      const id = getIdFromUrl(url);
      if (id !== prevId) {
        const { data, error } = await getOfferDetails(id, role);

        if (!error) setDeal(data);

        setPrevId(id);
      }
    }
  }, [url, role, getOfferDetails, prevId]);

  const handleCloseTab = () => dispatch(setIsOpened(false));

  const handleRedirect = useCallback(() => {
    if (url?.startsWith('/deals')) {
      const route = notificationPathGenerator({ data: deal, role });
      if (route) {
        router.push(route);
        handleCloseTab();
      }
    } else {
      router.push(url);
    }
  }, [notificationPathGenerator, url, deal]);

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
