import PropTypes from 'prop-types';

import { Title } from '@/elements';

const FieldsetHeader = ({ title, children }) => {
  return (
    <div className="flex justify-between items-center">
      <Title component="h3" className="text-lg text-black font-bold">
        {title}
      </Title>
      {children}
    </div>
  );
};

FieldsetHeader.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default FieldsetHeader;
