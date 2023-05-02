import { LinkAsButton } from '@/elements';
import { ROUTES } from '@/lib';
import OfferModalContent from '@/modules/OfferModalContent';
import { ExpandableRowFooter, ModalWindow } from '@/units';
import { useAuth } from '@/utils/hooks';

const TankerExpandedFooter = () => {
  const { isAuthorized } = useAuth();
  return (
    <ExpandableRowFooter>
      {isAuthorized ? (
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

export default TankerExpandedFooter;
