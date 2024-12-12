'use client';

import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import parse from 'html-react-parser';

import { NotificationCardBodyPropTypes } from '@/lib/types';

import { Button } from '@/elements';
import { REGEX } from '@/lib/constants';
import { getCurrentDealStage, readNotification } from '@/store/entities/notifications/actions';
import { resetParams, setIsOpened } from '@/store/entities/notifications/slice';
import { getNotificationsDataSelector } from '@/store/selectors';
import { getCookieFromBrowser, getIdFromUrl } from '@/utils/helpers';

const NotificationCardBody = ({ message, url, urlId, disabled, setDisabled, handleClose }) => {
  const dispatch = useDispatch();

  const role = getCookieFromBrowser('session-user-role');
  const { deal, filterParams } = useSelector(getNotificationsDataSelector);
  /* eslint-disable no-console */
  console.log({ deal });

  const isDealPath = useMemo(() => url?.startsWith('/deals'), [url]);
  const formattedMessage = message?.replace(REGEX.DETECT_ID, '<span class="font-semibold">$&</span>');

  const handleRedirect = useCallback(() => {
    setDisabled(urlId);

    if (filterParams?.activeTab === 'unread') {
      dispatch(readNotification({ id: urlId }));
    }

    if (isDealPath) {
      const id = getIdFromUrl(url);
      dispatch(getCurrentDealStage({ id, role }))
        .then(() => {
          if (deal?.route) {
            window.open(deal.route, '_blank');
          }
          handleClose();
          dispatch(setIsOpened(false));
          dispatch(resetParams());
        })
        .catch(() => {
          handleClose();
          dispatch(setIsOpened(false));
          dispatch(resetParams());
        });
    } else {
      window.open(url, '_blank');
      handleClose();
      dispatch(setIsOpened(false));
      dispatch(resetParams());
    }
  }, [urlId, setDisabled, filterParams, isDealPath, deal?.route, url, dispatch, role, handleClose]);

  return (
    <div className="flex flex-col items-start">
      <p className="text-xsm font-normal text-black">{parse(formattedMessage)}</p>
      {url && (
        <Button
          onClick={handleRedirect}
          customStyles="!p-0 !pt-2.5 relative -left-1.5 underline decoration-underline "
          disabled={disabled === urlId}
          buttonProps={{
            size: 'small',
            variant: 'primary',
            text: disabled === urlId ? 'Loading...' : 'See details',
          }}
        />
      )}
    </div>
  );
};

NotificationCardBody.propTypes = NotificationCardBodyPropTypes;

export default NotificationCardBody;
