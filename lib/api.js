import axios from 'axios';

export default ({ host, session }) => {
  const baseUrl = `${host}/api`;

  return {
    createRequest: async doc => {
      const {
        data: { request },
      } = await axios({
        method: 'POST',
        credentials: 'same-origin',
        data: { ...doc, session: session },
        url: `${baseUrl}/requests`,
      });
      return request;
    },

    getRequest: async ({ id }) => {
      const {
        data: { request },
      } = await axios({
        method: 'GET',
        credentials: 'same-origin',
        data: { session: session }, // TODO: REMOVE?!
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
        data: { media, session: session },
        url: `${baseUrl}/requests/${id}/media`,
      });
      return updatedMedia;
    },
  };
};
