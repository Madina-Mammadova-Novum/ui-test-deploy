import PropTypes from 'prop-types';

import { NextLink } from '@/elements';
import { useSidebarActiveColor } from '@/utils/hooks';

const AccordionNestedLink = ({ data, collapsed = false }) => {
  const { isActive } = useSidebarActiveColor(data.path);

  return (
    <div
      className={`${
        isActive ? 'bg-blue text-white' : 'hover:bg-blue-dark'
      } flex flex-col text-gray my-2 px-5 py-1 rounded-xl relative`}
    >
      <span className={`uppercase font-bold ${isActive ? 'text-white' : 'text-gray'} text-xxs`}>{data?.label}</span>
      <NextLink href={data?.path ?? '/'} className="text-xs text-white font-semibold">
        {data?.title}
      </NextLink>

      {!collapsed && (
        <div className="absolute -top-7 -left-3 w-px h-14 rotate-180 bg-blue-dark">
          <hr className="absolute w-2.5 h-px border-none right-0 bg-blue-dark" />
        </div>
      )}
    </div>
  );
};

AccordionNestedLink.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.string,
    path: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  collapsed: PropTypes.bool,
};

export default AccordionNestedLink;
