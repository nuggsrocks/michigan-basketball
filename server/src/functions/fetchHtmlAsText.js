const axios = require('axios');

const fetchHtmlAsText = async (pageUrl) => {
  try {
    const response = await axios.get(pageUrl, {
      responseType: 'text',
    });
    return response.data;

  } catch(e) {
    console.error(e);
  }
};

module.exports = fetchHtmlAsText;
