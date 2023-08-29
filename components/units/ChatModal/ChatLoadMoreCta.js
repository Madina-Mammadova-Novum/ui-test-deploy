import { ChatLoadMoreCtaPropTypes } from '@/lib/types';

import { Button, Divider } from '@/elements';

const ChatLoadMoreCta = ({ disabled, onClick }) => {
  return (
    <div className="flex flex-col gap-y-2.5">
      <Divider />
      <Button
        customStyles="mb-2.5"
        onClick={onClick}
        disabled={disabled}
        buttonProps={{ text: 'Show more active conversations', variant: 'tertiary', size: 'large' }}
      />
    </div>
  );
};

ChatLoadMoreCta.propTypes = ChatLoadMoreCtaPropTypes;

export default ChatLoadMoreCta;
