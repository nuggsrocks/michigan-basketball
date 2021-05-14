const axios = require('axios')
const fetchHtmlAsText = require('../src/functions/fetchHtmlAsText')
const organizePlayerStats = require('../src/functions/organizePlayerStats')

jest.mock('axios')

console.error = jest.fn()

describe('fetchHtmlAsText()', () => {
  const htmlString = '<!DOCTYPE html><h1>Hello World</h1>'
  axios.get.mockImplementation((url) => new Promise((resolve, reject) => {
    if (url === '/reject') {
      reject(new Error('promise rejected'))
      return null
    }

    resolve({ data: htmlString })
  }))
  test('should return array of html strings when passed array', async () => {
    const data = await fetchHtmlAsText(['/success', '/good'])

    expect(data[0]).toEqual(htmlString)
    expect(data[1]).toEqual(htmlString)
  })

  test('should return html string whe passed string', async () => {
    const data = await fetchHtmlAsText('/success')

    expect(data).toEqual(htmlString)
  })

  test('should return null and log error on promise rejection', async () => {
    const data = await fetchHtmlAsText(['/reject'])

    expect(data).toBeNull()
    expect(console.error).toHaveBeenCalledTimes(1)
  })
  test('should return null and log error on wrong parameter type', async () => {
    const data = await fetchHtmlAsText({ url: '/not-allowed' })

    expect(data).toBeNull()
    expect(console.error).toHaveBeenCalledTimes(1)
  })
})

describe('organizePlayerStats()', () => {
  const fakeHtml = `
  <!DOCTYPE html>
  <div class='sub-module'>
  <div class='team-name'>Michigan</div>
  <table>
  <tbody>
  <tr class='highlight'></tr>
  <tr>
  <td class='name'>
  <a href='#'>
  <span>L. James</span>
  <span class='abbr'>L. James</span>
</a>
  <span class='position'>SF</span>
</td>
  <td class='fg'>1-2</td>
  <td class='reb'>5</td>
  <td class='pts'>10</td>
</tr>
</tbody>
<tbody>
  <tr class='highlight'></tr>
  <tr>
  <td class='name'>
  <a href='#'>
  <span>L. James</span>
  <span class='abbr'>L. James</span>
</a>
  <span class='position'>SF</span>
</td>
  <td class='fg'>1-2</td>
  <td class='reb'>5</td>
  <td class='pts'>10</td>
</tr>
</tbody>
</table>
</div>
<div class='sub-module'>
  <div class='team-name'>Other</div>
  <table>
  <tbody>
  <tr class='highlight'></tr>
  <tr>
  <td class='name'>
  <a href='#'>
  <span>L. James</span>
  <span class='abbr'>L. James</span>
</a>
  <span class='position'>SF</span>
</td>
  <td class='fg'>1-2</td>
  <td class='reb'>5</td>
  <td class='pts'>10</td>
</tr>
</tbody>
<tbody>
  <tr class='highlight'></tr>
  <tr>
  <td class='name'>
  <a href='#'>
  <span>L. James</span>
  <span class='abbr'>L. James</span>
</a>
  <span class='position'>SF</span>
</td>
  <td class='fg'>1-2</td>
  <td class='reb'>5</td>
  <td class='pts'>10</td>
</tr>
</tbody>
</table>
</div>
  `

  test('should return array of parsed stats for each team', () => {
    const stats = organizePlayerStats(fakeHtml)

    const fakeStatObj = { name: 'L. James', fgm: 1, fga: 2, reb: 5, pts: 10 }

    expect(stats.michigan).toStrictEqual([fakeStatObj, fakeStatObj])
    expect(stats.opponent).toStrictEqual([fakeStatObj, fakeStatObj])
  })
})
