import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FoodTruckListComponent } from './components/food-truck-list/food-truck-list.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { FoodTruckService } from './services/food-truck.service';
import { FoodTruck } from './models/food-truck.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    SearchBarComponent,
    FoodTruckListComponent,
    MapViewComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private foodTruckService = inject(FoodTruckService);

  foodTrucks = signal<FoodTruck[]>([]);
  searchTerm = signal('');
  selectedTruck = signal<FoodTruck | null>(null);

  filteredTrucks = computed(() =>
    this.foodTrucks().filter(truck =>
      `${truck.applicant} ${truck.address ?? ''} ${truck.foodItems ?? ''}`
        .toLowerCase()
        .includes(this.searchTerm().toLowerCase())
    )
  );

  async ngOnInit() {
    const data = await this.foodTruckService.getAll().toPromise();

    //We could handle no response from the API here, but for now I will use !
    this.foodTrucks.set(data!);
  }

  handleSearch(term: string) {
    this.searchTerm.set(term);
  }

  selectTruck(truck: FoodTruck) {
    this.selectedTruck.set(truck);
  }
}