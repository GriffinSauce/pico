const Request = require('~/schemas/Request');

module.exports = async (req, res) => {
  const {
    query: { id },
    body: { media },
  } = req;

  let request;
  try {
    request = await Request.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $push: { media },
      },
      {
        new: true,
      },
    );
  } catch (error) {
    console.error('Error creating request', error);
    return res.status(500).send({
      error,
    });
  }
  return res.status(200).json({ media: request.media });
};
