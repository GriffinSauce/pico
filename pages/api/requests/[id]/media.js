import Request from '../../../../schemas/Request';

export default async (req, res) => {
  if (req.method !== 'POST') return res.status({ status: 404 }).send();

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
    console.error('Error creating request', error); // eslint-disable-line no-console
    return res.status(500).send({
      error,
    });
  }
  return res.status(200).json({ media: request.media });
};
