import fetch from 'node-fetch'

class Accuweather {
  constructor(apiKey, useMetric = false) {
    this.apiKey = apiKey
    this.useMetric = useMetric
  }

  async #getCityByZip(zipCode) {
    const url = `http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${this.apiKey}&q=${zipCode}`
    const res = await fetch(url)
    if (!res.ok) throw Error('There was an error processing your request. Ensure that you entered a valid zip code and api key.')
    const json = await res.json()
    if (json.length < 1) throw Error('No results found for this zip code.')
    return json
  }

  async #getCityByName(cityName) {
    const url = `http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${this.apiKey}&q=${cityName}`
    const res = await fetch(url)
    if (!res.ok) throw Error('There was an error processing your request. Ensure that you entered a valid city name and api key.')
    const json = await res.json()
    if (json.length < 1) throw Error('No results found for this city name.')
    return json
  }

  async getFiveDayForecast(method, query) {
    try {
      let url
      let locationName
      let locationCode

      switch (method) {
        case "zipCode":
          const zipInfo = await this.#getCityByZip(query)
          locationCode = zipInfo[0].Key
          locationName = zipInfo[0].LocalizedName
          url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationCode}?apikey=${this.apiKey}`

          break
        case "cityName":
          const cityInfo = await this.#getCityByName(query)
          locationCode = cityInfo[0].Key
          locationName = cityInfo[0].LocalizedName
          url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationCode}?apikey=${this.apiKey}`
          break
      }

      const res = await fetch(url)
      const json = await res.json()

      return json
    } catch (e) {
      return e.message
    }
  }
}


const accu = new Accuweather(process.env.ACCUWEATHER_SECRET_KEY)

accu.getFiveDayForecast('zipCode', 42129)
  .then(info => console.log(info))