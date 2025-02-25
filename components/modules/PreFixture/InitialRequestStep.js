import PropTypes from 'prop-types';

import { FieldsetContent, FieldsetWrapper, Title } from '@/elements';
import { ModalWindow } from '@/units';
import RequestCharterPartyForm from '@/units/RequestCharterPartyForm';

const InitialRequestStep = ({ offerId = null }) => (
  <div className="flex h-full w-full flex-col gap-y-5 p-8">
    <FieldsetWrapper>
      <Title level="3" className="text-center">
        Charter Party Not Available
      </Title>
      <FieldsetContent className="mt-2.5">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="max-w-[600px] text-gray-600">
            The base charter party and clauses have not been uploaded by the broker yet. Please wait for the broker to
            prepare the necessary documents. If needed, you can request a base charter party to initiate the process.
          </p>
          <ModalWindow
            buttonProps={{
              text: 'Request Base Charter Party',
              variant: 'primary',
              size: 'large',
            }}
          >
            <RequestCharterPartyForm offerId={offerId} />
          </ModalWindow>
        </div>
      </FieldsetContent>
    </FieldsetWrapper>
  </div>
);

InitialRequestStep.propTypes = {
  offerId: PropTypes.string,
};

export default InitialRequestStep;
