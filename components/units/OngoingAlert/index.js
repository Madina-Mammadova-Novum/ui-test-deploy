import { OngoingAlertPropTypes } from '@/lib/types';

import { Button, Title } from '@/elements';

const OngoingAlert = ({ title, text, onClose }) => {
  return (
    <div className="max-w-[356px]">
      <Title level="3" className="pr-5 text-lg font-bold">
        {title}
      </Title>
      <p className="mb-5 mt-2.5 text-xsm">
        Sorry, but you <span className="font-bold text-red">can not Submit a Request to {text} your account</span> since
        you have ongoing cargo deals.
      </p>
      <Button
        customStyles="w-full uppercase"
        onClick={onClose}
        buttonProps={{ text: 'ok', variant: 'primary', size: 'large' }}
      />
    </div>
  );
};

OngoingAlert.propTypes = OngoingAlertPropTypes;

export default OngoingAlert;
