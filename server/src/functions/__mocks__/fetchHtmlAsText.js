const htmlData = '<!DOCTYPE html><h1>Hello world</h1>';

const fetchHtmlAsText = async (pageUrl) => {
  try {
    return new Promise((resolve, reject) => {
      let data;

      if (pageUrl.includes('resolved')) {
        data = htmlData;
      } else {
        data = 'rejected';
      }

      if (data === 'rejected') {
        reject(new Error('oops! rejected.'));
      } else {
        resolve(data);
      }
    });


  } catch(e) {
    console.error(e);
    return null;
  }
};

module.exports = fetchHtmlAsText;
