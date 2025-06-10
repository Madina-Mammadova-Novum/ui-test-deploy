export default async function handler(req, res) {
  const { path } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Construct the external URL
    const externalUrl = `${process.env.SEAMETRIX_API_URL}/${process.env.SEAMETRIX_MAP_KEY}/${path.join('/')}`;

    // Fetch the tile from the external service
    const response = await fetch(externalUrl);

    if (!response.ok) {
      return res.status(response.status).json({ message: 'Failed to fetch tile' });
    }

    // Get the image data
    const imageBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(imageBuffer);

    // Set appropriate headers
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    // Send the image
    return res.send(buffer);
  } catch (error) {
    console.error('Error proxying map tile:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
