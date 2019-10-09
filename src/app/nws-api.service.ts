import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from './models/location.interface';
import { Subject }    from 'rxjs';
import { Forecast } from './models/forecast.interface';
import { WeatherService } from './weather.service';

@Injectable({
  providedIn: 'root'
})
export class NwsApiService {
  // Observable sources
  private locationSource = new Subject<Location>();

  // Observable string streams
  location$ = this.locationSource.asObservable();

  nwsPointsUrl = 'https://api.weather.gov/points/';

  forecastUrl: string;
  forecastHourlyUrl: string;

  constructor(private http:HttpClient, private weatherService:WeatherService) { 
  }

  // TODO: add error nandling
  getNwsPointsApi(coordinates : Coordinates) {
    this.http.get(this.nwsPointsUrl + coordinates.latitude + ',' + coordinates.longitude)
      .subscribe(
        data => {
          this.handleNwsPointsData(data);
        });
  }

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

  getNwsForecastApiData(url : string) {
    this.http.get(url)
      .subscribe(
        data => {
          this.weatherService.forecastSource.next(this.handleForecastApiData(data));
        });
  }

  getNwsForecastHourlyApiData(url : string) {
    this.http.get(url)
      .subscribe(
        data => {
          this.weatherService.forecastHourlySource.next(this.handleForecastApiData(data));
        });

  }
  
  handleForecastApiData(apiData): Array<Forecast> {
    return apiData.properties.periods;
  }
}
