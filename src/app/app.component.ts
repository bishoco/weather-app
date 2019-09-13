import { Component } from '@angular/core';
import { LocationService } from './location/location.service';
import { WeatherService } from './weather.service';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ LocationService ]
})
export class AppComponent {
  title = 'Weather Jester';


  constructor(private locationService: LocationService,
    private weatherService: WeatherService ) {
    locationService.coordinates$.subscribe(
      coordinates => {
        console.log(coordinates);
        weatherService.getNwsPoints(coordinates);
      });
  }
  
  ngOnInit() {
    this.locationService.getBrowserPosition();
  }
}
