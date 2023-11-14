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

export async function getPostFixtureCargoCodes() {
  const response = await getData(`account/post-fixture/get-cargocodes`);
  return {
    ...response,
  };
}
