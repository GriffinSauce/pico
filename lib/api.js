import axios from 'axios';

const baseFunctionsUrl =
  process.env === 'production'
    ? 'https://photo-request.netlify.com/.netlify/functions'
    : 'http://localhost:9000';

export const createRequest = async () => {
  const {
    data: { request },
  } = await axios.get(`${baseFunctionsUrl}/requests`);
  return request;
};

export const getRequest = async ({ id }) => {
  const {
    data: { request },
  } = await axios.get(`${baseFunctionsUrl}/requests`);
  return request;
};
