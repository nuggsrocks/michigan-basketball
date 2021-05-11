const axios = require('axios');

const fetchHtmlAsText = async (urlStringOrArray) => {
  try {
    if (typeof urlStringOrArray === 'string') {
      const response = await axios.get(urlStringOrArray, {
        responseType: 'text',
      });

      return response.data;
    } else if (Array.isArray(urlStringOrArray)) {
      const requests = urlStringOrArray.map((url) => axios.get(url, {
        responseType: 'text',
      }));

      const responses = await Promise.all(requests);

      return responses.map((response) => response.data);
    } else {
      console.error(new Error('Unexpected parameter'));
      return null;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};

module.exports = fetchHtmlAsText;
