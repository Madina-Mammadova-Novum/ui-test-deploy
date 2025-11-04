import { SidebarGenericPropTypes } from '@/lib/types';

import AngleDownSVG from '@/assets/images/angleDown.svg';
import Logo from '@/assets/images/logo-sm.svg';
import { Button, NavTree, NextLink } from '@/elements';

const SidebarSm = ({ data, isResized, onResize }) => {
  const printMenu = (item) => <NavTree variant="collapsed" key={item?.id} data={item} />;

  return (
    <>
      <NextLink href="/">
        <Logo className="relative fill-white" />
      </NextLink>
      <ul className="relative flex flex-col items-center justify-center gap-5">
        <Button
          onClick={onResize}
          customStyles="!rounded !relative flex self-end !bg-blue-dark !p-2 !w-7 !h-7"
          buttonProps={{
            variant: 'tertiary',
            size: 'small',
            icon: {
              before: (
                <AngleDownSVG
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform fill-white transition duration-150 ${
                    isResized && '-rotate-90'
                  }`}
                />
              ),
            },
          }}
        />
        {data?.map(printMenu)}
      </ul>
    </>
  );
};

SidebarSm.propTypes = SidebarGenericPropTypes;

export default SidebarSm;
