import axios from 'axios';
import hostFromReq from '~/lib/hostFromReq';

export default ({ host }) => {
  const baseUrl = `${host}/api`;

  return {
    createRequest: async doc => {
      const {
        data: { request },
      } = await axios({
        method: 'POST',
        credentials: 'same-origin',
        data: doc,
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
        data: { media },
        url: `${baseUrl}/requests/${id}/media`,
      });
      return updatedMedia;
    },
  };
};
