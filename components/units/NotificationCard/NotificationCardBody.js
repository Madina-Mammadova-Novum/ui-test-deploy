import parse from 'html-react-parser';

import { NotificationCardBodyPropTypes } from '@/lib/types';

import { LinkAsButton } from '@/elements';
import { REGEX } from '@/lib/constants';

const NotificationCardBody = ({ message, url }) => {
  const strippedUrl = url?.replace(/\/\?/g, '/');

  const formattedMessage = message?.replace(REGEX.DETECT_ID, '<span class="font-semibold">$&</span>');

  return (
    <div className="flex flex-col items-start">
      <p className="text-xsm font-normal text-black">{parse(formattedMessage)}</p>
      {strippedUrl && (
        <LinkAsButton
          href={strippedUrl}
          customStyles="p-0 mt-2.5 underline decoration-underline "
          buttonProps={{
            size: 'small',
            text: 'Mark all as read',
            variant: 'primary',
          }}
        >
          See details
        </LinkAsButton>
      )}
    </div>
  );
};
NotificationCardBody.propTypes = NotificationCardBodyPropTypes;

export default NotificationCardBody;
