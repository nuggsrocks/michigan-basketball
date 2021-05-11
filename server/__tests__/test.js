const axios = require('axios');
const fetchHtmlAsText = require('../src/functions/fetchHtmlAsText');

jest.mock('axios');

console.error = jest.fn();

describe('fetchHtmlAsText()', () => {
  axios.get.mockImplementation(async (url, options) => {
    return await new Promise((resolve, reject) => {
      if (url === '/reject') {
        reject(new Error('request failed'));
        return;
      }

      const htmlString = '<!DOCTYPE html><h1>Hello world</h1>';

      resolve({data: htmlString});
    });
  });

  describe('passed url string', () => {
    test('should fetch and return valid html string or array of strings on success', async () => {
      expect(await fetchHtmlAsText('/resolve')).toMatch(/!DOCTYPE/);
      expect(await fetchHtmlAsText(['/resolve', '/success']))
          .toBeInstanceOf(Array);
    });

    test('should return null and log error on failure', async () => {
      expect(await fetchHtmlAsText('/reject')).toBeNull();
      expect(await fetchHtmlAsText(['/reject', '/failure'])).toBeNull();
      expect(await fetchHtmlAsText({'not': 'allowed'})).toBeNull();
      expect(console.error).toHaveBeenCalledTimes(3);
    });
  });
});
