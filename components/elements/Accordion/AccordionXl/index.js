import { useMemo } from 'react';

import PropTypes from 'prop-types';

import { AnchorIcon, FaqIcon, OfferIcon, PositionIcon, SearchIcon } from '@/assets/icons';
import AccordionBody from '@/elements/Accordion/AccordionBody';
import AccordionHeader from '@/elements/Accordion/AccordionHeader';
import AccordionTitle from '@/elements/Accordion/AccordionTitle';

const AccordionXl = ({ data, active, opened, onChange }) => {
  const hasNestedLinks = Boolean(data?.items?.length);

  const printIcon = useMemo(() => {
    switch (data?.variant) {
      case 'search':
        return <SearchIcon isActive={active} />;
      case 'positions':
        return <PositionIcon isActive={active} />;
      case 'offers':
        return <OfferIcon isActive={active} />;
      case 'fleets':
        return <AnchorIcon isActive={active} />;
      case 'faq':
        return <FaqIcon isActive={active} />;
      default:
        return null;
    }
  }, [data?.variant, active]);

  return (
    <>
      <AccordionHeader
        href={data.path}
        onClick={() => onChange('opened', !opened)}
        isSubMenu={hasNestedLinks}
        className="flex items-center transition-all"
      >
        {data.title && (
          <AccordionTitle
            icon={printIcon}
            title={data.title}
            isActive={active}
            isOpened={opened}
            hasNestedLinks={hasNestedLinks}
          />
        )}
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
