import faunadb from 'faunadb';
import getId from './utils/getId';

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

/*

Input event:
{
    "path": "Path parameter",
    "httpMethod": "Incoming request's method name"
    "headers": {Incoming request headers}
    "queryStringParameters": {query string parameters }
    "body": "A JSON string of the request payload."
    "isBase64Encoded": "A boolean flag to indicate if the applicable request payload is Base64-encode"
}

Return output:
{
    "isBase64Encoded": true|false,
    "statusCode": httpStatusCode,
    "headers": { "headerName": "headerValue", ... },
    "body": "..."
}

*/

// Quicky hack for local CORS, can be solved with proxy
const headers = {
  'Access-Control-Allow-Origin': '*',
};

exports.handler = async (event, context) => {
  console.log(event);

  if (event.httpMethod === 'POST') {
    console.log(`POST`);
    const data = JSON.parse(event.body);

    let response;
    try {
      response = await client.query(
        q.Create(q.Collection('request'), { data }),
      );
    } catch (error) {
      console.log('Error creating request', error);
      return {
        headers,
        statusCode: 400,
        body: JSON.stringify(error),
      };
    }
    const { data: request, ref } = response;
    return {
      headers,
      statusCode: 200,
      body: JSON.stringify({
        request: {
          id: ref.value.id,
          ...request,
        },
      }),
    };
  }

  if (event.httpMethod === 'GET') {
    const id = getId(event.path);
    console.log(`GET ${id}`);

    let response;
    try {
      response = await client.query(q.Get(q.Ref(q.Collection('request'), id)));
      console.log(response);
    } catch (error) {
      console.log('Error finding request', error);
      return {
        headers,
        statusCode: 400,
        body: JSON.stringify(error),
      };
    }
    const { data: request, ref } = response;
    return {
      headers,
      statusCode: 200,
      body: JSON.stringify({
        request: {
          id: ref.value.id,
          ...request,
        },
      }),
    };
  }
};
