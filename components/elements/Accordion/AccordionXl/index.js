import { useMemo } from 'react';

import PropTypes from 'prop-types';

import { AnchorIcon, FaqIcon, OfferIcon, PositionIcon } from '@/assets/Icons';
import AccordionBody from '@/elements/Accordion/AccordionBody';
import AccordionHeader from '@/elements/Accordion/AccordionHeader';

const AccordionXl = ({ data, active, opened, onChange }) => {
  const isActive = Boolean(active === data.id);

  const printIcon = useMemo(() => {
    switch (data?.variant) {
      case 'positions':
        return <PositionIcon isActive={isActive} />;
      case 'offers':
        return <OfferIcon isActive={isActive} />;
      case 'fleets':
        return <AnchorIcon isActive={isActive} />;
      case 'faq':
        return <FaqIcon isActive={isActive} />;
      default:
        return null;
    }
  }, [data?.variant, isActive]);

  const printTitle = useMemo(() => {
    return (
      <span
        aria-hidden="true"
        onClick={() => onChange('active', data?.id)}
        className={`flex text-sm font-semibold capitalize gap-3.5 w-full px-5 py-3 rounded-xl  ${
          isActive ? 'bg-blue' : 'hover:bg-blue-dark'
        }`}
      >
        {printIcon}
        {data?.title}
      </span>
    );
  }, [data?.id, data?.title, isActive, onChange, printIcon]);

  return (
    <>
      <AccordionHeader
        toggle={opened}
        active={isActive}
        onClick={() => onChange('opened', !opened)}
        href={data?.path ?? '/'}
        isSubMenu={Boolean(data?.items?.length)}
        className="flex items-center transition-all"
      >
        {data?.title ? printTitle : <p>Title not found</p>}
      </AccordionHeader>
      <AccordionBody list={data?.items} toggle={opened} />
    </>
  );
};

AccordionXl.propTypes = {
  active: PropTypes.string,
  opened: PropTypes.bool,
  onChange: PropTypes.func,
  data: PropTypes.shape({
    id: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    path: PropTypes.string,
    variant: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};

export default AccordionXl;
