require('dotenv').config()
const { Accuweather } = require('../dist/index')
const apiKey = process.env.ACCUWEATHER_SECRET_KEY

test('should create accuweather class properly', () => {
  const w = new Accuweather(apiKey, false)
  expect(w.useMetric).toBe(false)
})