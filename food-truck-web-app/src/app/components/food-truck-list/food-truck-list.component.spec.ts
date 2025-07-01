import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodTruckList } from './food-truck-list.component';

describe('FoodTruckList', () => {
  let component: FoodTruckList;
  let fixture: ComponentFixture<FoodTruckList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodTruckList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodTruckList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
