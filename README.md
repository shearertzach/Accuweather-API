<p align="center">
  <img src="https://img.shields.io/github/workflow/status/shearertzach/Accuweather-API/Node.js%20CI?label=Prod%20Build&style=for-the-badge"/>
  <img src="https://img.shields.io/github/package-json/v/shearertzach/Accuweather-API?style=for-the-badge"/>
</p>

# Accuweather API

Accuweather's provides a public API to developers. This library/API will allow those who use node related frameworks to access and use the Accuweather API easier.

### Note

This library takes advantage of Node 18's experimental fetch feature due to build errors using node-fetch with Typescript.

## Installation and Usage

```bash
npm install @zach-shearer/accuweather-api
```

```JS
// CommonJS
const { Accuweather } = require('@zach-shearer/accuweather-api')
// or ES6
import { Accuweather } from '@zach-shearer/accuweather-api'

const weather = new Accuweather(apiKey, useMetric)

weather.getFiveDayForecast('zipCode', 55555) // returns an array of forecasts for the next 5 days
```