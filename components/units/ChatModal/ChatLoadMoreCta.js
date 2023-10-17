import { ChatLoadMoreCtaPropTypes } from '@/lib/types';

import { Button, Divider } from '@/elements';

const ChatLoadMoreCta = ({ disabled, tab, onClick }) => {
  const ctaText = {
    active: 'Show more active conversations',
    archived: 'Show more archived conversations',
  };
  return (
    <div className="flex flex-col gap-y-2.5">
      <Divider />
      <Button
        customStyles="mb-2.5"
        onClick={onClick}
        disabled={disabled}
        buttonProps={{ text: ctaText[tab], variant: 'tertiary', size: 'large' }}
      />
    </div>
  );
};

ChatLoadMoreCta.propTypes = ChatLoadMoreCtaPropTypes;

export default ChatLoadMoreCta;
