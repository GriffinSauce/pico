import axios from 'axios';

const MOCK_REQUEST = {
  created: new Date().toISOString(),
  id: '0',
  slug: 'mock',
  title: 'Offline mock',
  uri: '/a/mock',
  media: [
    {
      type: 'image',
      url: '/placeholder.png?',
    },
    {
      type: 'image',
      url: '/placeholder.png?',
    },
  ],
};

export default ({ host }) => {
  const baseUrl = `${host}/api`;

  return {
    createRequest: async (doc = {}) => {
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

    getRequestBySlug: async ({ slug }) => {
      if (slug === 'mock') return MOCK_REQUEST;
      const {
        data: { request },
      } = await axios({
        method: 'GET',
        credentials: 'same-origin',
        url: `${baseUrl}/requests/by-slug/${slug}`,
      });
      return request;
    },

    updateRequest: async ({ id, update }) => {
      const {
        data: { request },
      } = await axios({
        method: 'PATCH',
        credentials: 'same-origin',
        data: update,
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
