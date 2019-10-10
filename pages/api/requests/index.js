const Request = require('~/schemas/Request');

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    let requests;
    try {
      requests = await Request.find().lean();
    } catch (error) {
      console.error('Error finding requests', error);
      return res.status(500).send({
        error,
      });
    }
    return res.status(200).json({ requests });
  }

  return res.status({ status: 404 }).send();
};
