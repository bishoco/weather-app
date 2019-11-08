import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from './models/location.interface';
import { Subject }    from 'rxjs';
import { Forecast } from './models/forecast.interface';
import { WeatherService } from './weather.service';

import FailOverForecastJson from '../assets/failOverForecast.json';
import FailOverForecastHourlyJson from '../assets/failOverForecastHourly.json';

/*
This service calls the National Weather Service REST APIs.
More info on the NWS API: https://www.weather.gov/documentation/services-web-api

The NWS API is pretty easy to use. First you call their points API with your
latitude and longitude. This call gives you data on your location and, helpfully, 
gives you URLs for calls to other parts of the API for that location. I use the URLs
returned to make both of the calls for the current weather and forecast information. 

Several things are determined from the NWS API:
  1) Location information: The NWS API gives back location information, like city and state,
  which I use in the display. This saves needing to call a separate location API like Google
  to determine the user's city and state
  2) Forecast information: The NWS API has hourly forecast data and daily forecast data.
  The hourly forecast data is used to determine the current weather. The daily forecast data is
  used for the forecast display.
*/

@Injectable({
  providedIn: 'root'
})
export class NwsApiService {
   // Observable sources
  private locationSource = new Subject<Location>();

  // This allows other components to subscribe to the location and update when it
  //comes back from the API
  location$ = this.locationSource.asObservable();

  nwsPointsUrl = 'https://api.weather.gov/points/';
 
  // Observable sources
  private nwsApiErrorSource = new Subject<Boolean>();

  // Observable streams
  nwsApiError$ = this.nwsApiErrorSource.asObservable();

  //These are the URLs returned from the call to the NWS points API
  forecastUrl: string;
  forecastHourlyUrl: string;

  failOverLocation = { city: 'Hoboken', state: 'NJ'};
  
  constructor(private http:HttpClient, private weatherService:WeatherService) { 
  }

  //Call to the NWS points API
  getNwsPointsApi(coordinates : Coordinates) {
    this.http.get(this.nwsPointsUrl + coordinates.latitude + ',' + coordinates.longitude)
      .subscribe(
        data => this.handleNwsPointsData(data),
        error => {
          this.nwsApiErrorSource.next(true);
          this.locationSource.next(this.failOverLocation);
          this.weatherService.forecastSource.next(this.handleForecastApiData(FailOverForecastJson));
          this.weatherService.forecastHourlySource.next(this.handleForecastApiData(FailOverForecastHourlyJson));
        } 
      );
  }

  /*
    Handles data from the NWS Points API call.
    This sets the location data (city and state) received.
    This also calls the NWS daily forecast and NWS hourly forecast
    APIs using the URLs returned from the points API call.
  */
  handleNwsPointsData(nwsPointsData) {
    if(nwsPointsData) {
      this.getNwsForecastApiData(nwsPointsData.properties.forecast);
      this.getNwsForecastHourlyApiData(nwsPointsData.properties.forecastHourly);
      
      this.locationSource.next(
        { city: nwsPointsData.properties.relativeLocation.properties.city,
          state: nwsPointsData.properties.relativeLocation.properties.state}
      );
    }
  }

  /*
  Call the NWS daily forecast API. Once received, pull the data out
  of the JSON returned and then add to the observable in the WeatherService.
  */
  getNwsForecastApiData(url : string) {
    this.http.get(url)
      .subscribe(
        data => {
          this.weatherService.forecastSource.next(this.handleForecastApiData(data));
        });
  }

  /*
  Call the NWS hourly forecast API. Once received, pull the data out
  of the JSON returned and add to the observable in the WeatherService.
  */
  getNwsForecastHourlyApiData(url : string) {
    this.http.get(url)
      .subscribe(
        data => {
          this.weatherService.forecastHourlySource.next(this.handleForecastApiData(data));
        });

  }
  
  //This method pulls the forecast data we care about from JSON returned from the API call
  handleForecastApiData(apiData): Array<Forecast> {
    return apiData.properties.periods;
  }
}
