import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodTruck } from '../../models/food-truck.model';

@Component({
  selector: 'app-map-float-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-float-info.component.html',
  styleUrls: ['./map-float-info.component.scss']
})

export class MapFloatInfoComponent {
  @Input() truck!: {
    applicant: string;
    address?: string;
    foodItems?: string;
  };
}