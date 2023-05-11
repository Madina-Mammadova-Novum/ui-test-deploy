import { SidebarXlPropTypes } from '@/lib/types';

import { ArrowIcon } from '@/assets/icons';
import Logo from '@/assets/images/logo.svg';
import { Button, NavTree, NextLink } from '@/elements';

const SidebarXl = ({ data, isResized, onResize }) => {
  const printMenu = (item) => <NavTree variant="opened" key={item?.id} data={item} />;

  return (
    <>
      <NextLink href="/">
        <Logo className="fill-white" />
      </NextLink>
      <ul className="flex flex-col gap-1.5 relative">
        <Button
          buttonProps={{
            icon: {
              before: (
                <ArrowIcon
                  className={`${
                    !isResized && 'rotate-90'
                  } transition absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 duration-150 `}
                  width="14px"
                  height="14px"
                />
              ),
            },
            size: 'small',
            variant: 'tertiary',
          }}
          onClick={onResize}
          customStyles="!rounded !relative flex self-end !bg-blue-dark !px-4 !py-2 !w-7 !h-7"
        />
        {data?.map(printMenu)}
      </ul>
    </>
  );
};

SidebarXl.propTypes = SidebarXlPropTypes;

export default SidebarXl;
