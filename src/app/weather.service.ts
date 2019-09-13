import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from './models/location.interface';
import { Subject }    from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  // Observable sources
  private locationSource = new Subject<Location>();

  // Observable string streams
  location$ = this.locationSource.asObservable();

  nwsPointsUrl = 'https://api.weather.gov/points/';
  forecastUrl: String;
  forecastHourlyUrl: String;

  constructor(private http:HttpClient) { 
  }

  getNwsPointsApi(coordinates : Coordinates)  {
    return this.http.get(this.nwsPointsUrl + coordinates.latitude + ',' + coordinates.longitude);
  }

  getNwsPoints(coordinates : Coordinates) {
    this.getNwsPointsApi(coordinates)
      .subscribe(
        data => {
          this.handleNwsPointsData(data);
        });
  }

  handleNwsPointsData(nwsPointsData) {
    if(nwsPointsData) {
      this.forecastUrl = nwsPointsData.properties.forecast;
      this.forecastHourlyUrl = nwsPointsData.properties.forecastHourly;
      
      this.locationSource.next(
        { city: nwsPointsData.properties.relativeLocation.properties.city,
          state: nwsPointsData.properties.relativeLocation.properties.state}
      );
    }
  }
}
