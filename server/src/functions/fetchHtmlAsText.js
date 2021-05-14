const axios = require('axios')

const fetchHtmlAsText = async (urlStrings) => {
  try {
    if (typeof urlStrings === 'string') {
      const response = await axios.get(urlStrings, {
        responseType: 'text'
      })

      return response.data
    } else if (Array.isArray(urlStrings)) {
      const requests = urlStrings.map((url) => axios.get(url, {
        responseType: 'text'
      }))

      const responses = await Promise.all(requests)

      return responses.map((response) => response.data)
    } else {
      console.error(new Error('wrong parameter type'))
      return null
    }
  } catch (e) {
    console.error(e)
    return null
  }
}

module.exports = fetchHtmlAsText
