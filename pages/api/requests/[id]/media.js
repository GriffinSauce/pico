const Request = require('~/schemas/Request');

module.exports = async req => {
  const {
    query: { id },
    body,
  } = req;

  const { media } = body;
  console.log('pushing', media);

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
  return res.status(200).json({ media });
};
