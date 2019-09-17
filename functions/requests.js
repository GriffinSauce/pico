const Request = require('./schemas/Request');
const getId = require('./utils/getId');

exports.handler = async (event, context) => {
  console.log(event);

  if (event.httpMethod === 'POST') {
    console.log(`POST`);
    const data = JSON.parse(event.body);
    const request = new Request(data);
    try {
      await request.save();
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
        request,
      }),
    };
  }

  if (event.httpMethod === 'GET') {
    const id = getId(event.path);
    console.log(`GET ${id}`);

    let request;
    try {
      request = await Request.findById(id);
    } catch (error) {
      console.log('Error finding request', error);
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
};
