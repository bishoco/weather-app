export interface Forecast {
   index: number,
    name: String,
    startTime: Date,
    endTime: Date,
    isDaytime: boolean,
    temperature: number,
    temperatureUnit: String,
    windSpeed: String,
    windDirection: String,
    shortForecast: String,
    detailedForecast: String
  }