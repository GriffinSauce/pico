const pathToRegexp = require('path-to-regexp');
const Request = require('./schemas/Request');
const getRequest = require('./utils/getRequest');

exports.handler = async (event, context) => {
  const requestPostReq = getRequest(event, 'POST', '/requests');
  if (requestPostReq) {
    const data = JSON.parse(event.body);
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
  }

  const mediaPostReq = getRequest(event, 'POST', '/requests/:id/media');
  if (mediaPostReq) {
    const {
      params: { id },
    } = mediaPostReq;

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
  }

  const requestGetReq = getRequest(event, 'GET', '/requests/:id');
  if (requestGetReq) {
    const {
      params: { id },
    } = requestGetReq;

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
  }

  // Not matched
  return {
    statusCode: 404,
  };
};
