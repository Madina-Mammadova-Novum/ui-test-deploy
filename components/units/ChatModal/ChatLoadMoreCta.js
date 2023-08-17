import { Button, Divider } from '@/elements';

const ChatLoadMoreCta = () => {
  return (
    <div className="flex flex-col gap-y-2.5">
      <Divider />
      <Button buttonProps={{ text: 'Show more active conversations', variant: 'tertiary', size: 'large' }} />
    </div>
  );
};

ChatLoadMoreCta.propTypes = {};

export default ChatLoadMoreCta;
