import { FailTheSubsModalContentPropTypes } from '@/lib/types';

import { Button, Title } from '@/elements';

const FailTheSubsModalContent = ({ closeModal }) => {
  return (
    <div>
      <Title level={2}>Do you want to fail the Subs?</Title>
      <div className="flex gap-x-2.5 mt-7">
        <div className="w-full">
          <Button
            onClick={closeModal}
            buttonProps={{ text: 'Cancel', variant: 'tertiary', size: 'large' }}
            customStyles="w-full whitespace-nowrap"
          />
        </div>
        <div className="w-full">
          <Button
            buttonProps={{ text: 'Fail the Subs', variant: 'delete', size: 'large' }}
            customStyles="w-full whitespace-nowrap"
          />
        </div>
      </div>
    </div>
  );
};

FailTheSubsModalContent.propTypes = FailTheSubsModalContentPropTypes;

export default FailTheSubsModalContent;
