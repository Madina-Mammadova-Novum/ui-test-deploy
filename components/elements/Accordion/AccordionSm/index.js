import { useCallback, useMemo } from 'react';

import PropTypes from 'prop-types';

import AccordionHeader from '../AccordionHeader';

import { AnchorIcon, FaqIcon, OfferIcon, PositionIcon } from '@/assets/icons';
import { Button } from '@/elements';

const AccordionSM = ({ data, active, onChange }) => {
  const handleMore = useCallback(() => {
    onChange('opened', true);
    onChange('resized', true);
  }, [onChange]);

  const isActive = Boolean(active === data.id);

  const printIcon = useMemo(() => {
    switch (data?.variant) {
      case 'positions':
        return <PositionIcon isActive={isActive} width="20px" height="20px" />;
      case 'offers':
        return <OfferIcon isActive={isActive} width="20px" height="20px" />;
      case 'fleets':
        return <AnchorIcon isActive={isActive} width="20px" height="20px" />;
      case 'faq':
        return <FaqIcon isActive={isActive} width="20px" height="20px" />;
      default:
        return null;
    }
  }, [data?.variant, isActive]);

  return (
    <AccordionHeader
      onClick={handleMore}
      isSubMenu={Boolean(data?.items?.length)}
      href={data?.path ?? '/'}
      className="flex items-center transition-all"
    >
      {data?.title ? (
        <div className="flex flex-col justify-center items-center">
          <Button
            onClick={() => onChange('active', data?.id)}
            buttonProps={{ icon: printIcon, variant: 'tertiary', size: 'small' }}
            customStyles={`flex flex-col text-sm font-semibold capitalize !py-2 rounded-md !px-2 
            ${isActive ? 'bg-blue' : 'hover:bg-blue-dark'}`}
          />

          <span className="text-xxs font-bold text-center">{data?.title}</span>
        </div>
      ) : (
        <p>Title not found</p>
      )}
    </AccordionHeader>
  );
};

AccordionSM.propTypes = {
  active: PropTypes.bool,
  onChange: PropTypes.func,
  data: PropTypes.shape({
    id: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    path: PropTypes.string,
    variant: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};

export default AccordionSM;
