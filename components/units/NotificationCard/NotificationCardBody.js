'use client';

import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import parse from 'html-react-parser';

import { NotificationCardBodyPropTypes } from '@/lib/types';

import { Button } from '@/elements';
import { MESSAGE_CHAR_LIMIT, REGEX } from '@/lib/constants';
import { getCurrentDealStage, readNotification } from '@/store/entities/notifications/actions';
import { resetParams, setIsOpened } from '@/store/entities/notifications/slice';
import { getNotificationsDataSelector } from '@/store/selectors';
import { getCookieFromBrowser, getIdFromUrl } from '@/utils/helpers';

const NotificationCardBody = ({
  message,
  url,
  urlId,
  disabled,
  setDisabled,
  handleClose,
  watched,
  isSignal = false,
}) => {
  const dispatch = useDispatch();

  const role = getCookieFromBrowser('session-user-role');
  const { filterParams, loading } = useSelector(getNotificationsDataSelector);

  const [isExpanded, setIsExpanded] = useState(false);

  const isDealPath = useMemo(() => url?.startsWith('/deals'), [url]);
  const isDocumentTab = useMemo(() => /document/i.test(message || ''), [message]);

  const isMessageLong = useMemo(() => (message?.length || 0) > MESSAGE_CHAR_LIMIT, [message]);

  const displayMessage = useMemo(() => {
    if (!isMessageLong || isExpanded) {
      return message?.replace(REGEX.DETECT_ID, '<span class="font-semibold">$&</span>');
    }
    return `${message
      ?.substring(0, MESSAGE_CHAR_LIMIT)
      .replace(REGEX.DETECT_ID, '<span class="font-semibold">$&</span>')}<span class="pr-1">...</span>`;
  }, [message, isMessageLong, isExpanded]);

  const handleToggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const handleRedirect = useCallback(() => {
    setDisabled(urlId);

    if (filterParams?.activeTab === 'unread') {
      dispatch(readNotification({ id: urlId }));
    }

    // message is used to detect if status should be set to documents

    if (isDealPath) {
      const id = getIdFromUrl(url);
      dispatch(getCurrentDealStage({ id, role, isDocumentTab }))
        .unwrap()
        .then((dealData) => {
          if (dealData?.route) {
            window.open(dealData.route, '_blank');
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
  }, [urlId, setDisabled, filterParams, isDealPath, url, dispatch, role, handleClose, isDocumentTab]);

  return (
    <div className="flex flex-col items-start">
      <div className="flex flex-col">
        <div className="text-xsm font-normal text-black">
          {parse(displayMessage)}
          {isMessageLong && !isExpanded && (
            <Button
              onClick={handleToggleExpand}
              customStyles="!p-0 underline"
              buttonProps={{
                size: 'small',
                variant: 'primary',
                text: 'Show more',
                textClassName: '!pl-0',
              }}
              customStylesFromWrap="!inline-block"
            />
          )}
        </div>
      </div>
      <div className="flex">
        {url && (
          <Button
            onClick={handleRedirect}
            customStyles="!p-0 !pt-2.5 relative -left-1.5 underline"
            disabled={disabled === urlId}
            buttonProps={{
              size: 'small',
              variant: 'primary',
              text: disabled === urlId ? 'Loading...' : 'See details',
            }}
          />
        )}
        {!watched && !isSignal && (
          <Button
            onClick={() => dispatch(readNotification({ id: urlId }))}
            customStyles="!p-0 !pt-2.5 !opacity-0 group-hover:!opacity-100 transition-opacity"
            buttonProps={{
              size: 'small',
              variant: 'secondary',
              text: loading ? 'Loading...' : 'Mark as read',
              textClassName: '!p-0',
            }}
            aria-label="Mark as read"
            disabled={loading}
          />
        )}
      </div>
    </div>
  );
};

NotificationCardBody.propTypes = NotificationCardBodyPropTypes;

export default NotificationCardBody;
