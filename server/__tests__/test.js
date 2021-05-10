jest.mock('../src/functions/fetchHtmlAsText.js');

const {constructVirtualDocument} = require('../src/scrapeStats');

describe('constructVirtualDocument()', () => {
  test('should return new jsdom document object if promise is successful', async () => {
    let document = await constructVirtualDocument('/resolved');
    expect(document.querySelector('h1').textContent).toEqual('Hello world');
  });
  test('should return null and log error if promise is rejected ', async () => {
    console.error = jest.fn();
    expect(await constructVirtualDocument('/rejected')).toBeNull();
    expect(console.error).toHaveBeenCalled();
  });
});
