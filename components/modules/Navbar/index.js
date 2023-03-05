import { navBarPropTypes } from '@/lib/types';

import { Logo } from '@/assets/icons';
import { NextLink } from '@/elements';
import { SIZES } from '@/lib';

const Navbar = ({ placeholder, cta, path, contrasted }) => {
  return (
    <nav className="flex w-full justify-between items-center bg-white 3sm:bg-transparent">
      <NextLink href="/">
        <Logo variant="xl" width={SIZES.LOGO.width} height={SIZES.LOGO.height} contrasted={contrasted} />
      </NextLink>
      <ul className="relative flex items-center gap-5 w-3/5 bg-white justify-end py-1.5">
        <li>
          <p>{placeholder}</p>
        </li>
        <li>
          <NextLink href={path}>{cta}</NextLink>
        </li>
      </ul>
    </nav>
  );
};

Navbar.defaultProps = {
  contrasted: false,
};

Navbar.propTypes = navBarPropTypes;

export default Navbar;
