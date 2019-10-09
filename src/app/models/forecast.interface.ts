// This is the format of the data as it comes from the NWS API
export interface Forecast {
    number: number,
    name: string,
    startTime: Date,
    endTime: Date,
    isDaytime: boolean,
    temperature: number,
    temperatureUnit: string,
    windSpeed: string,
    windDirection: string,
    shortForecast: string,
    detailedForecast: string
  }

// This object consolidates the forecast data 
// from NWS for display on the front end
export interface ConsolidatedForecast {
  date: string,
  hiTemp: number,
  loTemp: number,
  temperatureUnit: string,
  shortForecast: string
}