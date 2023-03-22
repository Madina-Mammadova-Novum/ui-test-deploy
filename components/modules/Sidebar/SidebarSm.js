import PropTypes from 'prop-types';

import { ArrowIcon } from '@/assets/Icons';
import Logo from '@/assets/images/logo-sm.svg';
import { Accordion, Button, NextLink } from '@/elements';

const SidebarSm = ({ data, isResized, onResize, opened, active, onChange }) => {
  const printMenu = (item) => (
    <Accordion variant="collapsed" opened={opened} active={active} onChange={onChange} key={item?.id} data={item} />
  );

  return (
    <>
      <NextLink href="/">
        <Logo className="relative right-1" />
      </NextLink>
      <div className="mt-4 flex flex-col items-center justify-center gap-1.5 relative">
        <Button
          onClick={onResize}
          customStyles="!rounded !relative flex self-end !bg-blue-dark !px-4 !py-2 !w-7 !h-7"
          buttonProps={{
            variant: 'tertiary',
            size: 'small',
            icon: (
              <ArrowIcon
                className={`transition absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 duration-150 ${
                  isResized && '-rotate-90'
                }`}
                width="14px"
                height="14px"
              />
            ),
          }}
        />
        {data?.map(printMenu)}
      </div>
    </>
  );
};

SidebarSm.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  active: PropTypes.string.isRequired,
  opened: PropTypes.bool.isRequired,
  searchVal: PropTypes.string.isRequired,
  isResized: PropTypes.bool.isRequired,
  onResize: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SidebarSm;
