'use client';

import { useMemo, useState } from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import NavTreeHeader from '../NavTreeHeader';
import NavTreeSubBody from '../NavTreeSubBody';

import AnchorSVG from '@/assets/images/anchor.svg';
import BrowserSVG from '@/assets/images/browser.svg';
import FileInfoAltSVG from '@/assets/images/fileInfoAlt.svg';
import QuestionCircleSVG from '@/assets/images/questionCircle.svg';
import SearchSVG from '@/assets/images/search.svg';
import ToolsSVG from '@/assets/images/setting.svg';
import { Button } from '@/elements';

const NavTreeSm = ({ data, active }) => {
  const [showLinks, setShowLinks] = useState(false);

  const hasNestedLinks = Boolean(data?.items?.length);

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
            customStyles={classnames(
              'flex flex-col text-sm font-semibold capitalize !py-2 rounded-md !px-2 mb-1',
              active ? 'bg-blue' : 'hover:bg-blue-dark',
              showLinks && 'bg-blue-dark'
            )}
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
