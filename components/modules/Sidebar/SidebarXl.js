import { SidebarXlPropTypes } from '@/lib/types';

import AngleDownSVG from '@/assets/images/angleDown.svg';
import Logo from '@/assets/images/logo.svg';
import { Button, NavTree, NextLink } from '@/elements';

const SidebarXl = ({ data, isResized, onResize }) => {
  const printMenu = (item) => <NavTree variant="opened" key={item?.id} data={item} />;

  return (
    <>
      <NextLink href="/">
        <Logo className="fill-white" />
      </NextLink>
      <ul className="relative flex flex-col gap-2.5 overflow-auto">
        <Button
          buttonProps={{
            icon: {
              before: (
                <AngleDownSVG
                  className={`${
                    !isResized && 'rotate-90'
                  } absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform fill-white transition duration-150`}
                />
              ),
            },
            size: 'small',
            variant: 'tertiary',
          }}
          onClick={onResize}
          customStyles="!rounded !relative flex self-end !bg-blue-dark !p-2 !w-7 !h-7"
        />
        {data?.map(printMenu)}
      </ul>
    </>
  );
};

SidebarXl.propTypes = SidebarXlPropTypes;

export default SidebarXl;
