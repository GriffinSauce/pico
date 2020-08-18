const Request = require('../../schemas/Request');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status({ status: 404 }).send();

  const request = new Request(req.body);
  try {
    await request.save();
  } catch (error) {
    console.error('Error creating request', error); // eslint-disable-line no-console
    return res.status(500).send({
      error,
    });
  }
  return res.status(200).json({ request });
};
