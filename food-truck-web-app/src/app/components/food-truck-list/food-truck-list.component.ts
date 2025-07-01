import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodTruck } from '../../models/food-truck.model';

@Component({
  selector: 'app-food-truck-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './food-truck-list.component.html',
  styleUrls: ['./food-truck-list.component.scss']
})
export class FoodTruckListComponent {
  @Input() filteredTrucks: FoodTruck[] = [];
  @Output() select = new EventEmitter<FoodTruck>();

  onSelect(truck: FoodTruck) {
    this.select.emit(truck);
  }

  public formatMenu(foodItems : string) : string{
    return foodItems.replaceAll(":" , " / "); 
  }

}










































// import { Component, OnInit, ViewChild } from '@angular/core';
// import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
// import { MarkerClusterer, Cluster } from '@googlemaps/markerclusterer';
// import { CommonModule } from '@angular/common';
// import { FoodTruckService } from '../../services/food-truck.service';
// import { FoodTruck } from '../../models/food-truck.model';

// @Component({
//   selector: 'app-food-truck-list',
//   standalone: true,
//   imports: [CommonModule, GoogleMapsModule],
//   templateUrl: './food-truck-list.component.html',
//   styleUrls: ['./food-truck-list.component.scss']
// })
// export class FoodTruckListComponent implements OnInit {
//   @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;

//   center = { lat: 37.773972, lng: -122.431297 };
//   zoom = 12;
//   foodTrucks: FoodTruck[] | undefined = [];
//   mapId = '80c2c4f7b0e7b0e677799beb'; 
//   infoWindow = new google.maps.InfoWindow();
//   private markerClusterer?: MarkerClusterer;

//   constructor(private foodTruckService: FoodTruckService) {}

//   async ngOnInit(): Promise<void> {
//     this.foodTrucks = await this.foodTruckService.getAll().toPromise();

//     const { AdvancedMarkerElement } = await google.maps.importLibrary('marker') as google.maps.MarkerLibrary;

//     setTimeout(() => this.setupMarkers(AdvancedMarkerElement), 300);
//   }

//   private setupMarkers(AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement) {
//     if (!this.map?.googleMap) return;

//     // Clear previous clusterer if exists
//     if (this.markerClusterer) {
//       this.markerClusterer.clearMarkers();
//     }

//     // Create markers
//     const markers = this.foodTrucks!
//       .filter(truck => truck.latitude && truck.longitude)
//       .map(truck => {
//         const marker = new AdvancedMarkerElement({
//         map: this.map.googleMap!,
//         position: {
//           lat: parseFloat(truck.latitude),
//           lng: parseFloat(truck.longitude)
//         },
//         title: truck.applicant
//       });

//       marker.addListener('click', () => {
//         this.infoWindow.setContent(`
//           <div style="max-width: 200px;">
//             <strong>${truck.applicant}</strong><br>
//             ${truck.address || 'No address'}<br>
//             ${truck.foodItems || 'No menu listed'}
//           </div>
//         `);
//         this.infoWindow.open(this.map.googleMap!, marker);
//       });

//       return marker;
// }
//       );

//     // Cluster them
//     const clusterer = new MarkerClusterer({
//       map: this.map.googleMap!,
//       markers,
//       renderer: {
//         render: ({ count, position }: Cluster) => {
//           return new google.maps.marker.AdvancedMarkerElement({
//             position,
//             content: document.createElement('div') // empty div = invisible
//           });
//         }
//       }
//     });

//   }


//   public parseLatLong( coordinate: string) : number{
//     return parseFloat(coordinate); 
//   }
// }