import { Component, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { MarkerClusterer, Cluster } from '@googlemaps/markerclusterer';
import { FoodTruck } from '../../models/food-truck.model';
import { MapFloatInfoComponent } from "../map-float-info/map-float-info.component";

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, MapFloatInfoComponent],
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnChanges {
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;

  @Input() foodTrucks: FoodTruck[] = [];
  @Input() selectedTruck: FoodTruck | null = null;

  center = { lat: 37.773972, lng: -122.431297 };
  zoom = 13;
  mapId = '80c2c4f7b0e7b0e677799beb'; 
  hoveredTruck: FoodTruck | null = null;
  hoveredScreenPos: { x: number; y: number } | null = null;

  private markerClusterer?: MarkerClusterer;
  private infoWindow = new google.maps.InfoWindow();

  async ngOnChanges(changes: SimpleChanges) {
   
    if (changes['foodTrucks'] && this.map?.googleMap) {
      const { AdvancedMarkerElement } = await google.maps.importLibrary('marker') as google.maps.MarkerLibrary;
      this.renderMarkers(AdvancedMarkerElement);
    }

    if (changes['selectedTruck'] && this.selectedTruck) {
      this.flyToSelectedTruck();
    }
  }

  private renderMarkers(AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement) {
    
    if (!this.map?.googleMap) return;

    if (this.markerClusterer) {
      this.markerClusterer.clearMarkers();
    }

    const markers = this.foodTrucks
      .filter(t => t.latitude && t.longitude)
      .map(truck => {
        const marker = new AdvancedMarkerElement({
          map: this.map.googleMap!,
          position: {
            lat: parseFloat(truck.latitude),
            lng: parseFloat(truck.longitude)
          },
          title: truck.applicant
        });

       marker.addListener('click', () => {
        this.infoWindow.setContent(`
          <div style="
            max-width: 260px;
            padding: 0.75rem;
            font-family: 'Segoe UI', sans-serif;
            color: #333;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            background: linear-gradient(to right, #fff, #f9f9f9);
            border: 1px solid #ddd;
            line-height: 1.4;
          ">
            <span style="display: flex; align-items: center; gap: 0.5rem;">
              <img src="/assets/food-truck.png" alt="Food Truck" style="width: 32px; height: 32px;" />
              <h3 style="margin: 0; font-size: 1.1rem;">${ truck.applicant }</h3>
            </span>
              <p style="margin: 0.25rem 0; font-size: 0.9rem;">
              📍 <strong>Address:</strong> ${ truck.address || 'Unknown'}
            </p>
            <p style="margin: 0.25rem 0; font-size: 0.9rem;">
              🍴 <strong>Menu:</strong> ${truck.foodItems || 'No menu info'}
            </p>
          </div>
        `);
        this.infoWindow.open(this.map.googleMap!, marker);
      });

        return marker;
      });

    this.markerClusterer = new MarkerClusterer({
      map: this.map.googleMap!,
      markers,
      renderer: {
        render: ({ count, position }: Cluster) =>
          new google.maps.marker.AdvancedMarkerElement({
            position,
            content: document.createElement('div') 
          })
      }
    });
  }

  private flyToSelectedTruck() {
    if (this.selectedTruck && this.map?.googleMap) {
      const lat = parseFloat(this.selectedTruck.latitude);
      const lng = parseFloat(this.selectedTruck.longitude);
      this.map.googleMap!.panTo({ lat, lng });
      this.map.googleMap!.setZoom(18);
    }
  }
}