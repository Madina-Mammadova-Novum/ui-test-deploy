'use client';

import PropTypes from 'prop-types';

import { ChartererInformationModal, CounterofferModal, FailedOfferModal, IncomingOfferModal } from '@/ui';

const ModalManager = ({ modalId, data, setModalId, closeModal }) => {
  switch (modalId) {
    case 'view_offer':
      return <IncomingOfferModal data={data} setModalId={setModalId} closeModal={closeModal} />;
    case 'view_counteroffer':
      return <CounterofferModal data={data} closeModal={closeModal} />;
    case 'view_failed_offer':
      return <FailedOfferModal data={data} closeModal={closeModal} />;
    case 'charterer_info':
      return <ChartererInformationModal data={data} />;
    default:
      return null;
  }
};

ModalManager.defaultProps = {
  modalId: '',
  data: {},
  setModalId: () => {},
  closeModal: () => {},
};

ModalManager.propTypes = {
  modalId: PropTypes.string,
  data: PropTypes.shape({}),
  setModalId: PropTypes.func,
  closeModal: PropTypes.func,
};

export default ModalManager;
