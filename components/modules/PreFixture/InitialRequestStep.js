import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { FieldsetContent, FieldsetWrapper, Title } from '@/elements';
import { PAGE_STATE } from '@/lib/constants';
import { getCurrentDealStage } from '@/store/entities/notifications/actions';
import { fetchPrefixtureOffers } from '@/store/entities/pre-fixture/actions';
import { getPreFixtureDataSelector } from '@/store/selectors';
import { ModalWindow } from '@/units';
import RequestCharterPartyForm from '@/units/RequestCharterPartyForm';
import { getCookieFromBrowser } from '@/utils/helpers';
/**
 * @component InitialRequestStep
 * @description Initial step for requesting a charter party when none is available
 * @props {String} offerId - ID of the deal
 * @maritime Provides interface for initiating charter party request process
 */
const InitialRequestStep = ({ offerId = null }) => {
  const dispatch = useDispatch();

  const { isDetails } = useSelector(getPreFixtureDataSelector);

  const { page, pageSize } = PAGE_STATE;
  const userRole = getCookieFromBrowser('session-user-role');

  const handleRequestSuccess = () => {
    if (isDetails) {
      dispatch(getCurrentDealStage({ id: offerId, role: userRole }));
    } else {
      // Refresh the prefixture data with default pagination
      dispatch(fetchPrefixtureOffers({ page, perPage: pageSize }));
    }
  };

  return (
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
              <RequestCharterPartyForm offerId={offerId} onSuccess={handleRequestSuccess} />
            </ModalWindow>
          </div>
        </FieldsetContent>
      </FieldsetWrapper>
    </div>
  );
};

InitialRequestStep.propTypes = {
  offerId: PropTypes.string,
};

export default InitialRequestStep;
