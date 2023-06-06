import { ModalHeaderPropTypes } from '@/lib/types';

import GoBackArrowSVG from '@/assets/images/arrow.svg';
import { Title } from '@/elements';

const ModalHeader = ({ children, goBack = null }) => {
  return (
    <div className="flex items-center">
      {goBack && <GoBackArrowSVG className="fill-black cursor-pointer mr-2.5 rotate-90" onClick={goBack} />}
      <Title level={2}>{children}</Title>
    </div>
  );
};

ModalHeader.propTypes = ModalHeaderPropTypes;

export default ModalHeader;
