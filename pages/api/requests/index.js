const Request = require('~/schemas/Request');

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    let requests;
    try {
      requests = await Request.find();
    } catch (error) {
      console.error('Error finding requests', error);
      return res.status(500).send({
        error,
      });
    }
    return res.status(200).json({ requests });
  }

  if (req.method === 'POST') {
    const request = new Request(req.body);
    try {
      await request.save();
    } catch (error) {
      console.error('Error creating request', error);
      return res.status(500).send({
        error,
      });
    }
    return res.status(200).json({ request });
  }

  return res.status({ status: 404 }).send();
};
