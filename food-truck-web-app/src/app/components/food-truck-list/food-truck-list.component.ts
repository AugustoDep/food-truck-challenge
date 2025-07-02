import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodTruck } from '../../models/food-truck.model';

@Component({
  selector: 'app-food-truck-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './food-truck-list.component.html',
  styleUrls: ['./food-truck-list.component.scss'],
})
export class FoodTruckListComponent {
  @Input() filteredTrucks: FoodTruck[] = [];
  @Output() select = new EventEmitter<FoodTruck>();

  onSelect(truck: FoodTruck) {
    this.select.emit(truck);
  }

  public formatMenu(foodItems: string): string {
    return foodItems.toLowerCase().replaceAll(':', ' / ');
  }
}
