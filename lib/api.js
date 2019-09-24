import axios from 'axios';

export default ({ url, session }) => {
  const baseUrl = `${url}/api`;

  return {
    createRequest: async doc => {
      const {
        data: { request },
      } = await axios({
        method: 'POST',
        credentials: 'same-origin',
        data: { session: session },
        url: `${baseUrl}/requests`,
        body: doc,
      });
      return request;
    },

    getRequest: async ({ id }) => {
      const {
        data: { request },
      } = await axios({
        method: 'GET',
        credentials: 'same-origin',
        data: { session: session },
        url: `${baseUrl}/requests/${id}`,
      });
      return request;
    },

    addMedia: async ({ id, media }) => {
      const {
        data: { media: updatedMedia },
      } = await axios({
        method: 'POST',
        credentials: 'same-origin',
        data: { session: session },
        url: `${baseUrl}/requests/${id}/media`,
        body: { media },
      });
      return updatedMedia;
    },
  };
};
