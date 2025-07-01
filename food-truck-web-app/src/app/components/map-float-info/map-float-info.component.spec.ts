import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapFloatInfoComponent } from './map-float-info.component';

describe('MapFloatInfoComponent', () => {
  let component: MapFloatInfoComponent;
  let fixture: ComponentFixture<MapFloatInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapFloatInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapFloatInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
