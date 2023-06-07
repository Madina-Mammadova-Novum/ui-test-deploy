'use client';

import { DeleteTankerModalPropTypes } from '@/lib/types';

import { Button, TextWithLabel, Title } from '@/elements';

const DeleteTankerModal = ({ closeModal }) => {
  return (
    <div className="flex flex-col gap-y-4 max-w-[292px]">
      <Title level="2">Delete Tanker</Title>
      <TextWithLabel
        label="Tanker name"
        text="Harvey Deep Sea, 9581291"
        customStyles="!flex-col !items-start [&>p]:!ml-0"
      />
      <p className="text-xsm">
        Are you sure you want to delete this tanker with all data?
        <b> To restore the tanker information you will need to follow the addition process again</b>
      </p>
      <div className="flex gap-x-2.5">
        <Button
          buttonProps={{
            text: 'Cancel',
            variant: 'tertiary',
            size: 'large',
          }}
          onClick={closeModal}
          customStylesFromWrap="w-1/2"
          customStyles="w-full"
        />
        <Button
          buttonProps={{
            text: 'Delete tanker',
            variant: 'delete',
            size: 'large',
          }}
          customStylesFromWrap="w-1/2"
          customStyles="w-full whitespace-nowrap"
        />
      </div>
    </div>
  );
};

DeleteTankerModal.propTypes = DeleteTankerModalPropTypes;

export default DeleteTankerModal;
