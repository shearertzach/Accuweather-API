class Accuweather {
  apiKey: string;
  useMetric: boolean;

  constructor(apiKey: string, useMetric: boolean = false) {
    this.apiKey = apiKey;
    this.useMetric = useMetric;
  }

  async getCityByZip(zipCode: string): Promise<{ key: string; name: string }> {
    const url = `http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${this.apiKey}&q=${zipCode}`;
    const res = await fetch(url);

    if (!res.ok) throw Error("There was an error processing your request.");

    const json = await res.json();
    if (json.length < 1) throw Error("No results found for this zip code.");

    return { key: json[0].Key, name: json[0].LocalizedName };
  }

  async getCityByName(city: string): Promise<{ key: string; name: string }> {
    const url = `http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${this.apiKey}&q=${city}`;
    const res = await fetch(url);

    if (!res.ok) throw Error("There was an error processing your request.");

    const json = await res.json();
    if (json.length < 1) throw Error("No results found for this city name.");

    return { key: json[0].Key, name: json[0].LocalizedName };
  }

  async getCityInfo(
    method: string,
    query: string
  ): Promise<{ locationCode: string; locationName: String }> {
    try {
      let locationName: string = "";
      let locationCode: string = "";

      switch (method) {
        case "zipCode":
          const zipInfo = await this.getCityByZip(query);
          locationCode = zipInfo.key;
          locationName = zipInfo.name;
          return { locationCode, locationName };
        case "cityName":
          const cityInfo = await this.getCityByName(query);
          locationCode = cityInfo.key;
          locationName = cityInfo.name;
          return { locationCode, locationName };
      }
      return { locationCode, locationName };
    } catch (e) {
      return e.message;
    }
  }

  async getFiveDayForecast(method: string, query: string) {
    try {
      const cityInfo = await this.getCityInfo(method, query);
      const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityInfo.locationCode}?apikey=${this.apiKey}`;

      const res = await fetch(url);
      const json = await res.json();

      return json.DailyForecasts;
    } catch (e) {
      return e.message;
    }
  }
}

module.exports.Accuweather = Accuweather;
