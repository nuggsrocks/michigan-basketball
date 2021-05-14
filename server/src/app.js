require('core-js/stable')
require('regenerator-runtime/runtime')
const path = require('path')
const express = require('express')
const app = express()

const cors = require('cors')
const axios = require('axios')
const { JSDOM } = require('jsdom')

const { findRecords } = require('./records')
const { findPlayerStats } = require('./player-stats')
const { findSchedule } = require('./schedule')
const { findRoster } = require('./roster')
const { scrapeStats } = require('./scrapeStats')

app.use(cors())

app.use(express.static(path.resolve(__dirname, '../../client/public')))

app.get('/fetch/standings', (req, res) => {
  axios.get('https://www.espn.com/mens-college-basketball/standings/_/group/7', { responseType: 'text' })
    .then((response) => {
      const doc = new JSDOM(response.data).window.document
      res.send(findRecords(doc))
    })
    .catch((e) => console.error(e))
})

app.get('/fetch/player-stats', (req, res) => {
  axios.get('https://www.espn.com/mens-college-basketball/team/stats/_/id/130', { responseType: 'text' })
    .then((response) => {
      const doc = new JSDOM(response.data).window.document
      res.send(findPlayerStats(doc))
    })
    .catch((e) => console.error(e))
})

app.get('/fetch/schedule', (req, res) => {
  findSchedule('https://www.espn.com/mens-college-basketball/team/schedule/_/id/130')
    .then((schedule) => res.send(schedule))
})

app.get('/fetch/roster', (req, res) => {
  findRoster('https://www.espn.com/mens-college-basketball/team/roster/_/id/130')
    .then((roster) => res.send(roster))
})

app.get('/fetch/team-stats', (req, res) => {
  scrapeStats().then((data) => res.send(data))
})

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../client/public/index.html'))
})

module.exports = app
