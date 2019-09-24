import { Component } from '@angular/core';
import { LocationService } from './location/location.service';
import { NwsApiService } from './nws-api.service';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ LocationService ]
})
export class AppComponent {
  title = 'Weather Jester';

  constructor(private locationService: LocationService, private nwsApiService: NwsApiService ) {
    //As soon as the location is determined from the browser, call the NWS api to get location and forecast info
    locationService.coordinates$.subscribe(
      coordinates => {
        nwsApiService.getNwsPointsApi(coordinates);
      });
  }
  
  ngOnInit() {
    this.locationService.getBrowserPosition();
  }
}
