import { TankerExpandedFooterPropTypes } from '@/lib/types';

import { LinkAsButton } from '@/elements';
import { ROUTES } from '@/lib';
import OfferModalContent from '@/modules/OfferModalContent';
import { ExpandableRowFooter, ModalWindow } from '@/units';

const TankerExpandedFooter = ({ isUserAuthorized }) => {
  return (
    <ExpandableRowFooter>
      {isUserAuthorized ? (
        <ModalWindow buttonProps={{ variant: 'primary', size: 'large', text: 'Send offer', className: 'ml-auto' }}>
          <OfferModalContent />
        </ModalWindow>
      ) : (
        <LinkAsButton
          href={ROUTES.SIGNUP}
          buttonProps={{ variant: 'primary', size: 'large' }}
          customStyles="ml-auto w-fit"
        >
          Register to Send offer
        </LinkAsButton>
      )}
    </ExpandableRowFooter>
  );
};

TankerExpandedFooter.propTypes = TankerExpandedFooterPropTypes;

export default TankerExpandedFooter;
