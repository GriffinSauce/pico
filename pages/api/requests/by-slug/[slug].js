const Request = require('../../../../schemas/Request');

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    const {
      query: { slug },
    } = req;

    let request;
    try {
      request = await Request.findOne({ slug });
    } catch (error) {
      console.error('Error finding request', error); // eslint-disable-line no-console
      return res.status(500).send({
        error,
      });
    }
    return res.status(200).json({ request });
  }

  return res.status({ status: 404 }).send();
};
