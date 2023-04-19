import { FieldsetHeaderPropTypes } from '@/lib/types';

import { Title } from '@/elements';

const FieldsetHeader = ({ title, children }) => {
  return (
    <div className="flex justify-between items-center">
      <Title level="3" className="text-lg text-black font-bold">
        {title}
      </Title>
      {children}
    </div>
  );
};

FieldsetHeader.propTypes = FieldsetHeaderPropTypes;

export default FieldsetHeader;
