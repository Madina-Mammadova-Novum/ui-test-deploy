import { useState } from 'react';

import CircleArrowsSVG from '@/assets/images/circleArrows.svg';
import { Button, Modal } from '@/elements';
import { ExpandableRowFooter } from '@/units';
import { OnSubsExpandedFooterPropTypes } from '@/lib/types';

const OnSubsExpandedFooter = ({ underRecap = false }) => {
  const [modalOptions, setModalOptions] = useState({
    opened: false,
    type: null,
  });

  const handleOpenModal = (type) => setModalOptions({ opened: true, type });
  const handleCloseModal = () => setModalOptions({ opened: false, type: null });

  const modalContent = () => {
    switch (modalOptions.type) {
      case 'fail_subs':
        return <div>Fail subs</div>;
      case 'lift_subs':
        return <div>Lift subs</div>;
      default:
        return null;
    }
  };

  return (
    <ExpandableRowFooter>
      <div className="flex flex-col lg:flex-row gap-x-5 gap-y-2.5 justify-between">
        <div className="w-full grow">
          {!!underRecap && (
            <Button
              buttonProps={{
                text: 'The recap is being finalized',
                icon: { before: <CircleArrowsSVG /> },
                variant: 'tertiary',
                size: 'large',
              }}
              customStyles="w-full whitespace-nowrap 3md:grow"
              disabled
            />
          )}
        </div>
        <div className="grid grid-cols-1 3md:flex gap-x-2.5 gap-y-2.5">
          <div className="w-full">
            <Button
              onClick={() => handleOpenModal('fail_subs')}
              buttonProps={{ text: 'Fail the Subs', variant: 'delete', size: 'large' }}
              customStyles="w-full whitespace-nowrap"
              disabled={underRecap}
            />
          </div>
          <div className="w-full">
            <Button
              onClick={() => handleOpenModal('lift_subs')}
              buttonProps={{ text: 'Lift the Subs', variant: 'primary', size: 'large' }}
              customStyles="w-full whitespace-nowrap"
              disabled={underRecap}
            />
          </div>
        </div>
      </div>
      <Modal opened={modalOptions.opened} onClose={handleCloseModal}>
        {modalContent()}
      </Modal>
    </ExpandableRowFooter>
  );
};

OnSubsExpandedFooter.propTypes = OnSubsExpandedFooterPropTypes;

export default OnSubsExpandedFooter;
