const axios = require('axios');
const fetchHtmlAsText = require('../src/functions/fetchHtmlAsText');
const scrapeForPlayerStatsTableRows = require('../src/functions/scrapeForPlayerStatsTableRows');
const organizePlayerStats = require('../src/functions/organizePlayerStats');

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

const fakeHtmlData = `
     <!DOCTYPE html>
     <div class='sub-module'>
     <div class='team-name'>Michigan</div>
     <table>
        <tbody>
        <tr>stat</tr>
        </tbody>
        <tbody>
        <tr>stat</tr>
        <tr class='highlight'>totals</tr>
        </tbody>
    </table>
    </div>
    <div class='sub-module'>
    <div class='team-name'>Some Other Team</div>
    <table>
      <tbody>
      <tr>stat</tr>
      </tbody>
      <tbody>
      <tr>stat</tr>
      <tr class='highlight'>totals</tr>
      </tbody>
    </table>
    </div>
    `;

describe('scrapeForPlayerStatsTableRows()', () => {
  test('should return object with an array of table row elements for each team', () => {
    const obj = scrapeForPlayerStatsTableRows(fakeHtmlData);

    expect(obj).toBeInstanceOf(Object);
    expect(Object.keys(obj)).toStrictEqual(['michigan', 'opponent']);
    expect(obj['michigan']).toBeInstanceOf(Array);
    expect(obj['michigan'].find((row) => row.className.match(/highlight/))).toBeUndefined();
  });
});

describe('organizePlayerStats()', () => {
  test('should return object with stats for each team and each game', () => {
    jest.mock('../src/functions/scrapeForPlayerStatsTableRows');

    const stats = organizePlayerStats(scrapeForPlayerStatsTableRows());

    expect(stats).toBeTruthy();
  });
});

