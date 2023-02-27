import { memo } from 'react';

import PropTypes from 'prop-types';

import { Logo } from '@/assets/Icons';
import { Button } from '@/elements';

const Navbar = memo(({ placeholder, cta, contrasted, onClick }) => {
  return (
    <nav className="flex z-50 w-full justify-between">
      <Logo variant="xl" width={200} height={44} contrasted={contrasted} />
      <ul className="flex items-center gap-5">
        <li>
          <p>{placeholder}</p>
        </li>
        <li>
          <Button buttonProps={{ text: cta, variant: 'secondary', size: 'large' }} onClick={onClick} />
        </li>
      </ul>
    </nav>
  );
});

Navbar.defaultProps = {
  contrasted: false,
};

Navbar.propTypes = {
  placeholder: PropTypes.string.isRequired,
  cta: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  contrasted: PropTypes.bool,
};

export default Navbar;
