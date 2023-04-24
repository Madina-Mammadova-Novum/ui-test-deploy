import { postHandler } from '@/utils/api';
// import { searchRowHeaders } from '@/utils/mock';

// For testing purposes, remove once backend is fully implemented
// function sleep(ms) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }
// export default async function handler(req, res) {
//   await sleep(2000);
//   res.status(200).json({
//     message: 'Successful search',
//     results: searchRowHeaders,
//   });
// }

export default async function handler(req, res) {
  return postHandler(`v1/vessels/search`, req, res);
}
