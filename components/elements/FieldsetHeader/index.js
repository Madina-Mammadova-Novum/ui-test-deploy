import { FieldsetHeaderPropTypes } from '@/lib/types';

import { Title } from '@/elements';

const FieldsetHeader = ({ title, children }) => {
  return (
    <div className="flex items-center justify-between">
      <Title level="3" className="text-lg font-bold text-black">
        {title}
      </Title>
      {children}
    </div>
  );
};

FieldsetHeader.propTypes = FieldsetHeaderPropTypes;

export default FieldsetHeader;
