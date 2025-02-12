import { getData } from '@/utils/dataFetching';

export async function getCargoSentOffers(cargoId) {
  const response = await getData(`cargo/sent-offers/${cargoId}`);
  return {
    ...response,
  };
}

export async function getCargoCounteroffers(cargoId) {
  const response = await getData(`cargo/counteroffers/${cargoId}`);
  return {
    ...response,
  };
}

export async function getCargoFailedOffers(cargoId) {
  const response = await getData(`cargo/failed-offers/${cargoId}`);
  return {
    ...response,
  };
}

export async function getCargoCodes({ stages = null }) {
  const response = await getData(`account/get-cargocodes${stages ? `?stages=${stages}` : ''}`);

  return {
    ...response,
  };
}
