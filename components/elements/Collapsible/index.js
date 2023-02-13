import { useMemo, useState } from 'react';

import PropTypes from 'prop-types';

import CollapseBody from './CollapseBody';
import CollapseHeader from './CollapseHeader';

import { AnchorIcon, FaqIcon, OfferIcon, PositionIcon } from '@/assets/Icons';

const Collapsible = ({ data }) => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => setToggle((prevValue) => !prevValue);

  const printIcon = useMemo(() => {
    switch (data?.variant) {
      case 'positions':
        return <PositionIcon />;
      case 'offers':
        return <OfferIcon />;
      case 'fleets':
        return <AnchorIcon />;
      case 'faq':
        return <FaqIcon />;
      default:
        return null;
    }
  }, [data?.variant]);

  const printTitle = useMemo(() => {
    return (
      <span className="flex text-sm font-semibold capitalize gap-3.5 px-5 py-3 rounded-xl hover:bg-blue-dark">
        {printIcon}
        {data?.title}
      </span>
    );
  }, [data?.title, printIcon]);

  return (
    <div className="bg-transparent">
      <CollapseHeader
        toggle={toggle}
        onClick={handleToggle}
        href={data?.path ?? '/'}
        isSubMenu={Boolean(data?.items?.length)}
        className="flex items-center"
      >
        {data?.title ? printTitle : <p>Title not found</p>}
      </CollapseHeader>
      <CollapseBody list={data?.items} toggle={toggle} />
    </div>
  );
};

Collapsible.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    path: PropTypes.string,
    variant: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};

export default Collapsible;
