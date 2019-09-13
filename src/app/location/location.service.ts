import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable()
export class LocationService {
    // Observable sources
    private coordinatesSource = new Subject<Coordinates>();
    private positionErrorSource = new Subject<PositionError>();
  
    // Observable string streams
    coordinates$ = this.coordinatesSource.asObservable();
    positionError$ = this.positionErrorSource.asObservable();

  constructor() { }
  
  getBrowserPosition() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
          position => {
            this.coordinatesSource.next(position.coords);
          },
          error => {
            this.positionErrorSource.next(error);
          }
      );
    };
  }  

  getPositionErrorText(errorCode: number): String {
    switch (errorCode) {
      case 1:
          return 'Permission Denied';
      case 2:
          return 'Position Unavailable';          
      case 3:
          return 'Timeout';          
    }
    return '';
  }
}
