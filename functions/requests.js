const Request = require('./schemas/Request');
const router = require('./lib/router')();

// @TODO: fix indent
  router.post('/requests', async req => {
    const data = JSON.parse(req.event.body);
    const request = new Request(data);
    try {
      await request.save();
    } catch (error) {
      console.error('Error creating request', error);
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify({
        request,
      }),
    };
  });

  router.post('/requests/:id/media', async req => {
    const {
      params: { id },
      event,
    } = req;

    const { media } = JSON.parse(event.body);
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
      console.log('Error creating request', error);
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify({
        media: request.media,
      }),
    };
  });

  router.get('/requests/:id', async req => {
    const {
      params: { id },
    } = req;

    let request;
    try {
      request = await Request.findById(id);
    } catch (error) {
      console.error('Error finding request', error);
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify({
        request,
      }),
    };
  });

  // Not matched
  router.any('*', req => {
    return {
      statusCode: 404,
    };
  });

exports.handler = router.handle;
