'use client';

import { useMemo } from 'react';

import { ChatModalHeaderPropTypes } from '@/lib/types';

import CloseSVG from '@/assets/images/close.svg';
import CollapseSVG from '@/assets/images/line.svg';
import { Button, Loader, Title } from '@/elements';

const ChatModalHeader = ({ useCollapse = false, loading = false, onClose, onCollapse }) => {
  const printCta = useMemo(() => {
    if (useCollapse) {
      return (
        <div className="absolute right-0 flex items-center justify-end">
          <Button
            type="button"
            onClick={onCollapse}
            customStyles="!p-0 h-8"
            buttonProps={{ icon: { before: <CollapseSVG className="fill-white" /> } }}
          />

          <Button
            type="button"
            onClick={onClose}
            buttonProps={{ icon: { before: <CloseSVG className="fill-white" /> } }}
          />
        </div>
      );
    }

    return (
      <Button
        type="button"
        className="absolute top-3"
        onClick={onClose}
        buttonProps={{ icon: { before: <CloseSVG className="fill-white" /> } }}
      />
    );
  }, [useCollapse, onClose, onCollapse]);

  return (
    <div className="relative flex w-full items-end justify-between rounded-t-base bg-black p-5">
      <div className="flex gap-x-2.5">
        <Title level="3" className="text-lg text-white">
          Chat with us
        </Title>
        {loading && <Loader className="h-4 w-4" />}
      </div>
      {printCta}
    </div>
  );
};

ChatModalHeader.propTypes = ChatModalHeaderPropTypes;

export default ChatModalHeader;
