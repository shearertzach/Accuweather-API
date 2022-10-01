require('dotenv').config()
const { Accuweather } = require('../dist/index')


const apiKey = process.env.ACCUWEATHER_SECRET_KEY

test('should create accuweather class properly', () => {
  const w = new Accuweather(apiKey, false)
  expect(w.useMetric).toBe(false)
})

// test('should get 5 day forecast accuweather class properly', async () => {
//   const w = new Accuweather(apiKey, false)
//   const results = await w.getFiveDayForecast('zipCode', 42141)
//   expect(results.length).toBe(5)
// })