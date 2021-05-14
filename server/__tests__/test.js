const axios = require('axios')
const fetchHtmlAsText = require('../src/functions/fetchHtmlAsText')
const organizePlayerStats = require('../src/functions/organizePlayerStats')
const { findSchedule } = require('../src/schedule')
const { findRoster } = require('../src/roster')

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

  test('should return html string when passed string', async () => {
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

describe('findSchedule()', () => {
  const mockHtml = `
   <table>
   <tbody>
   <tr>
   <td>DATE</td><td>OPPONENT</td><td>RESULT</td>
</tr>
<tr>
<td>Postseason</td>
</tr>
<tr>
<td>Wed, Jan 1</td><td>vs Opponent 4 </td><td>W <a href='#'>92-90</a> </td>
</tr>
<tr>
<td>Thu, Jan 2</td><td>vs Opponent 5 </td><td>W <a href='#'>92-90</a> </td>
</tr>
<tr>
<td>Regular Season</td>
</tr>
<tr>
<td>Sun, Dec 29</td><td>vs Opponent 1 </td><td>W <a href='#'>92-90</a> </td>
</tr>
<tr>
<td>Mon, Dec 30</td><td>vs Opponent 2 </td><td>L <a href='#'>92-90</a> </td>
</tr>
<tr>
<td>Tue, Dec 31</td><td>vs Opponent 3 </td><td>Canceled </td>
</tr>
</tbody>
</table>
  `

  const mockScheduleObj = [
    { date: 'Wed, Jan 1', opponent: 'vs Opponent 4', result: 'W 92-90', link: 'about:blank#' },
    { date: 'Thu, Jan 2', opponent: 'vs Opponent 5', result: 'W 92-90', link: 'about:blank#' },
    { date: 'Sun, Dec 29', opponent: 'vs Opponent 1', result: 'W 92-90', link: 'about:blank#' },
    { date: 'Mon, Dec 30', opponent: 'vs Opponent 2', result: 'L 92-90', link: 'about:blank#' },
    { date: 'Tue, Dec 31', opponent: 'vs Opponent 3', result: 'Canceled', link: null }
  ]

  expect(findSchedule(mockHtml)).toStrictEqual(mockScheduleObj)
})

describe('findRoster()', () => {
  const mockHtml = `
  <!DOCTYPE html>
  <table>
  <thead>
  <tr>
  <th></th>
  <th>Name</th>
  <th>Pos</th>
  <th>HEIGHT</th>
</tr>
</thead>
<tbody>
<tr>
<td></td>
<td>
<a>Eli Brooks</a>
<span>55</span>
</td>
<td>G</td>
<td>5'11"</td>
</tr>
</tbody>
</table>
  `

  const mockRosterObj = [
    { name: 'Eli Brooks', number: '55', pos: 'G', height: '5\'11"' }
  ]
  test('should return roster object that matches spec', () => {
    expect(findRoster(mockHtml)).toStrictEqual(mockRosterObj)
  })
})
