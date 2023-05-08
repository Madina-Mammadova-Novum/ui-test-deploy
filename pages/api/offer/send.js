function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
export default async function handler(req, res) {
  await sleep(2000);
  try {
    /*
     todo: need to change structure to
     {
        data: {
           message: 'You have successfully submitted your offer',
        }
     }
     */
    return res.status(200).json({
      message: 'You have successfully submitted your offer',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: { message: 'Internal server error' } });
  }
}
