import delve from 'dlv'; // identityHandler,

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
export default async function handler(req, res) {
  await sleep(2000);
  try {
    const email = delve(req, 'body.email');
    const password = delve(req, 'body.password');
    if (!email || !password) {
      return res.status(422).json({ error: { message: 'Please provide the required fields email and password' } });
    }
    /*
     todo: need to change structure to
     {
        data: {
           message: 'You have successfully submitted your offer',
        }
     }
    */
    return res.status(200).json({
      message: 'Welcome back',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: { message: 'Internal server error' } });
  }
}
