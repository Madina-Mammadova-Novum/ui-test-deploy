'use client';

import { useMemo, useState } from 'react';

import PropTypes from 'prop-types';

import NavTreeHeader from '../NavTreeHeader';
import NavTreeSubBody from '../NavTreeSubBody';

import { AnchorIcon, FaqIcon, OfferIcon, PositionIcon, SearchIcon, ToolsIcon } from '@/assets/icons';
import { Button } from '@/elements';

const NavTreeSm = ({ data, active }) => {
  const [showLinks, setShowLinks] = useState(false);

  const hasNestedLinks = Boolean(data?.items?.length);

  const printIcon = useMemo(() => {
    switch (data?.variant) {
      case 'search':
        return <SearchIcon isActive={active} width="20px" height="20px" />;
      case 'positions':
        return <PositionIcon isActive={active} width="20px" height="20px" />;
      case 'offers':
        return <OfferIcon isActive={active} width="20px" height="20px" />;
      case 'fleets':
        return <AnchorIcon isActive={active} width="20px" height="20px" />;
      case 'faq':
        return <FaqIcon isActive={active} width="20px" height="20px" />;
      case 'tools':
        return <ToolsIcon isActive={active} width="20px" height="20px" />;
      default:
        return null;
    }
  }, [data?.variant, active]);

  const printSubTree = (link) => <NavTreeSubBody key={link.id} data={link} collapsed />;

  return (
    <NavTreeHeader
      href={data?.path}
      onClick={() => setShowLinks(!showLinks)}
      isSubMenu={hasNestedLinks}
      className="flex items-center transition-all relative"
    >
      {data?.title && (
        <div className="flex flex-col justify-center items-center">
          <Button
            buttonProps={{ icon: { before: printIcon }, variant: 'tertiary', size: 'small' }}
            customStyles={`flex flex-col text-sm font-semibold capitalize !py-2 rounded-md !px-2 
            ${active ? 'bg-blue' : 'hover:bg-blue-dark'} 
            ${showLinks && 'bg-blue-dark'}`}
          />

          <span className="text-xxs font-bold text-white text-center">{data.title}</span>
        </div>
      )}
      {showLinks && (
        <div className="absolute w-auto h-auto pr-2 py-2 left-[50px] top-5 bg-black">
          {data?.items?.length > 0 && data?.items?.map(printSubTree)}
        </div>
      )}
    </NavTreeHeader>
  );
};

NavTreeSm.propTypes = {
  active: PropTypes.bool,
  onChange: PropTypes.func,
  data: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    path: PropTypes.string,
    variant: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};

export default NavTreeSm;
