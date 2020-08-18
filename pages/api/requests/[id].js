const Request = require('../../../schemas/Request');

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    const {
      query: { id },
    } = req;

    let request;
    try {
      request = await Request.findById(id);
    } catch (error) {
      console.error('Error finding request', error); // eslint-disable-line no-console
      return res.status(500).send({
        error,
      });
    }
    return res.status(200).json({ request });
  }

  if (req.method === 'PATCH') {
    const {
      query: { id },
      body,
    } = req;

    let request;
    try {
      request = await Request.findOneAndUpdate(
        {
          _id: id,
        },
        {
          $set: body,
        },
        {
          new: true,
        },
      );
    } catch (error) {
      console.error('Error finding request', error);
      return res.status(500).send({
        error,
      });
    }
    return res.status(200).json({ request });
  }

  return res.status({ status: 404 }).send();
};
