import { requestSearchVesselAdapter } from '@/adapters/vessel';
import { postData } from '@/utils/dataFetching';
// import { searchRowHeaders } from '@/utils/mock';

export async function searchVessels({ data }) {
  const body = requestSearchVesselAdapter({ data });
  // todo: remove once we have more response data
  // const body = {
  //   loadTerminalId: "51f64a49-f4fe-47dc-b30d-2336055325a8",
  //   dischargeTerminalId: "762f9941-a2a9-4170-b045-72462b001b20",
  //   cargoTypeId: "9CF67415-2625-49B1-8430-6B7959C0F9FC",
  //   cargoes: [
  //     {
  //       productId: "4DF37171-EA0A-4A24-9E6C-3E335C76BDF0",
  //       referenceDensity: 0.9,
  //       quantity: 10,
  //       tolerance: 20
  //     }
  //   ],
  //   laycanStart: "2023-05-24",
  //   laycanEnd: "2023-05-25"
  // }
  const response = await postData(`vessels/search`, body);
  // todo: Remove once backend has data
  // if (!response?.data?.length) {
  //   response.data = searchRowHeaders;
  // }
  return {
    ...response,
  };
}
