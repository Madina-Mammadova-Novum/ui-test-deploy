import { ChatDeactivatePropTypes } from '@/lib/types';

import CloseSVG from '@/assets/images/close.svg';
import { Button, Title } from '@/elements';

const ChatDeactivate = ({ title, onDeactivate, onCancel }) => {
  return (
    <div className="tooltip">
      <div className="flex flex-col gap-y-2.5 tooltip-box">
        <div className="flex justify-between gap-x-5">
          <Title level="6" className="text-xsm font-semibold">
            {title}
          </Title>

          <Button
            type="button"
            onClick={onCancel}
            className="relative -top-5 left-2"
            buttonProps={{ icon: { before: <CloseSVG className="fill-black" /> } }}
          />
        </div>
        <div className="tooltip-arrow" />
        <div className="flex justify-between gap-1.5">
          <Button buttonProps={{ text: 'Cancel', variant: 'tertiary', size: 'large' }} onClick={onCancel} />
          <Button buttonProps={{ text: 'Archive chat', variant: 'delete', size: 'large' }} onClick={onDeactivate} />
        </div>
      </div>
    </div>
  );
};

ChatDeactivate.propTypes = ChatDeactivatePropTypes;

export default ChatDeactivate;
