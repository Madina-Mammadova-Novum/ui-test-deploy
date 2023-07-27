import { AssignToFleetPropTypes } from '@/lib/types';

import { Title } from '@/elements';

const AssignToFleet = ({ tankerId }) => {
  console.log(tankerId);
  return (
    <div className="w-[356px]">
      <Title level={2}>Edit Assigned Fleet</Title>
    </div>
  );
};

AssignToFleet.propTypes = AssignToFleetPropTypes;

export default AssignToFleet;
