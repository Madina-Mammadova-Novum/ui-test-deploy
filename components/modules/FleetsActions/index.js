import AddNewTanker from '../AddNewTanker';

import PlusCircleSVG from '@/assets/images/plusCircle.svg';
import { CreateFleetForm, ModalWindow } from '@/units';

const FleetsActions = () => {
  return (
    <div className="flex gap-x-5">
      <ModalWindow
        buttonProps={{
          text: 'Create new fleet',
          variant: 'primary',
          size: 'large',
          icon: {
            before: <PlusCircleSVG className="fill-white" />,
          },
        }}
      >
        <CreateFleetForm />
      </ModalWindow>
      <ModalWindow
        buttonProps={{
          text: 'Add a New Tanker',
          variant: 'primary',
          size: 'large',
          icon: {
            before: <PlusCircleSVG className="fill-white" />,
          },
        }}
        containerClass="overflow-y-auto"
      >
        <AddNewTanker />
      </ModalWindow>
    </div>
  );
};

export default FleetsActions;
