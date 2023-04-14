import OfferModalContent from '@/modules/OfferModalContent';
import { ExpandableRowFooter, ModalWindow } from '@/units';

const TankerExpandedFooter = () => {
  return (
    <ExpandableRowFooter>
      <ModalWindow buttonProps={{ variant: 'primary', size: 'large', text: 'Send offer', className: 'ml-auto' }}>
        <OfferModalContent />
      </ModalWindow>
    </ExpandableRowFooter>
  );
};

export default TankerExpandedFooter;
