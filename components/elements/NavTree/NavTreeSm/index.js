'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import NavTreeHeader from '../NavTreeHeader';
import NavTreeSubBody from '../NavTreeSubBody';

import AnchorSVG from '@/assets/images/anchor.svg';
import BrowserSVG from '@/assets/images/browser.svg';
import FileInfoAltSVG from '@/assets/images/fileInfoAlt.svg';
import QuestionCircleSVG from '@/assets/images/questionCircle.svg';
import SearchSVG from '@/assets/images/search.svg';
import ToolsSVG from '@/assets/images/wrench.svg';
import { Button } from '@/elements';

const NavTreeSm = ({ data, active }) => {
  const subTreeRef = useRef(null);
  const [showLinks, setShowLinks] = useState(false);

  const hasNestedLinks = Boolean(data?.items?.length);

  const handleClick = useCallback(() => {
    setShowLinks(!showLinks);
  }, [showLinks]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (subTreeRef.current && !subTreeRef.current.contains(event.target)) {
        setShowLinks(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setShowLinks(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const printIcon = useMemo(() => {
    const customStyles = classnames('w-5 h-5', active ? 'fill-white' : 'fill-gray');

    switch (data?.variant) {
      case 'search':
        return <SearchSVG className={customStyles} viewBox="0 0 24 24" />;
      case 'positions':
        return <BrowserSVG className={customStyles} viewBox="0 0 24 24" />;
      case 'offers':
        return <FileInfoAltSVG className={customStyles} viewBox="0 0 24 24" />;
      case 'fleets':
        return <AnchorSVG className={customStyles} viewBox="0 0 24 24" />;
      case 'faq':
        return <QuestionCircleSVG className={customStyles} viewBox="0 0 24 24" />;
      case 'tools':
        return <ToolsSVG className={customStyles} viewBox="0 0 24 24" />;
      default:
        return null;
    }
  }, [data?.variant, active]);

  const printSubTree = (link) => <NavTreeSubBody key={link.id} data={link} collapsed onClick={handleClick} />;

  return (
    <NavTreeHeader
      href={data?.path}
      onClick={handleClick}
      isSubMenu={hasNestedLinks}
      className="relative flex items-center transition-all"
    >
      {data?.title && (
        <div className="flex flex-col items-center justify-center">
          <Button
            buttonProps={{ icon: { before: printIcon }, variant: 'tertiary', size: 'small' }}
            customStyles={classnames(
              'flex flex-col text-sm font-semibold capitalize !py-2 rounded-md !px-2 mb-1',
              active ? 'bg-blue' : 'hover:bg-blue-dark',
              showLinks && 'bg-blue-dark'
            )}
          />

          <span className="text-center text-xxs font-bold text-white">{data.title}</span>
        </div>
      )}
      {showLinks && (
        <div
          ref={subTreeRef}
          className="absolute left-12 top-5 h-auto w-auto rounded-br-base rounded-tr-base bg-black py-2 pr-2"
        >
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
