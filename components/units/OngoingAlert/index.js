import { OngoingAlertPropTypes } from '@/lib/types';

import { Button, Title } from '@/elements';

const OngoingAlert = ({ title, onClose }) => {
  return (
    <>
      <Title level="3" className="text-lg font-bold pr-5">
        {title}
      </Title>
      <p className="mt-2.5 mb-5 text-xsm">
        Sorry, but you <span className="text-red font-bold">cannot deactivate your account</span> since you have ongoing
        cargo deals.
      </p>
      <Button
        customStyles="w-full uppercase"
        onClick={onClose}
        buttonProps={{ text: 'ok', variant: 'primary', size: 'large' }}
      />
    </>
  );
};

OngoingAlert.propTypes = OngoingAlertPropTypes;

export default OngoingAlert;
