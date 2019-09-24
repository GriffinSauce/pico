import axios from 'axios';

const baseUrl = '/api';

export const createRequest = async doc => {
  const {
    data: { request },
  } = await axios.post(`${baseUrl}/requests`, doc);
  return request;
};

export const getRequest = async ({ id }) => {
  const {
    data: { request },
  } = await axios.get(`${baseUrl}/requests/${id}`);
  return request;
};

export const addMedia = async ({ id, media }) => {
  const {
    data: { media: updatedMedia },
  } = await axios.post(`${baseUrl}/requests/${id}/media`, { media });
  return updatedMedia;
};
