import { SidebarSmPropTypes } from '@/lib/types';

import { ArrowIcon } from '@/assets/icons';
import Logo from '@/assets/images/logo-sm.svg';
import { Button, NavTree, NextLink } from '@/elements';

const SidebarSm = ({ data, isResized, onResize }) => {
  const printMenu = (item) => <NavTree variant="collapsed" key={item?.id} data={item} />;

  return (
    <>
      <NextLink href="/">
        <Logo className="relative right-1.5 fill-white" />
      </NextLink>
      <ul className="mt-4 flex flex-col items-center justify-center gap-1.5 relative">
        <Button
          onClick={onResize}
          customStyles="!rounded !relative flex self-end !bg-blue-dark !px-4 !py-2 !w-7 !h-7"
          buttonProps={{
            variant: 'tertiary',
            size: 'small',
            icon: {
              before: (
                <ArrowIcon
                  className={`transition absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 duration-150 ${
                    isResized && '-rotate-90'
                  }`}
                  width="14px"
                  height="14px"
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

SidebarSm.propTypes = SidebarSmPropTypes;

export default SidebarSm;
