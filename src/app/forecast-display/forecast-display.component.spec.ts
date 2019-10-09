import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ForecastDisplayComponent } from './forecast-display.component';
import { WeatherIcon } from '../weather-icon/weather-icon.component';
import { WeatherService } from '../weather.service';
import { ForecastDisplayService } from './forecast-display.service';

describe('ForecastDisplayComponent', () => {
  let component: ForecastDisplayComponent;
  let fixture: ComponentFixture<ForecastDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FontAwesomeModule ],
      declarations: [ ForecastDisplayComponent,
          WeatherIcon ],
        providers: [WeatherService,
          ForecastDisplayService
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
