import {
  Component,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { MarkerClusterer, Cluster } from '@googlemaps/markerclusterer';
import { FoodTruck } from '../../models/food-truck.model';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
})
export class MapViewComponent implements OnChanges, OnInit {
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;

  @Input() foodTrucks: FoodTruck[] = [];
  @Input() selectedTruck: FoodTruck | null = null;

  mapReady = false;
  center = { lat: 37.773972, lng: -122.431297 };
  zoom = 14;
  mapId = '80c2c4f7b0e7b0e677799beb';

  private markerClusterer?: MarkerClusterer;
  private markers: google.maps.marker.AdvancedMarkerElement[] = [];
  activeInfoWindow?: google.maps.InfoWindow;
  markerInfoPairs: { marker: google.maps.marker.AdvancedMarkerElement, infoWindow: google.maps.InfoWindow }[] = [];

  async ngOnInit(): Promise<void> {
    const interval = setInterval(() => {
      if ((window as any).google?.maps) {
        this.mapReady = true;
        clearInterval(interval);
      }
    }, 300);
  }

  async ngAfterViewInit(): Promise<void> {
    const checkMapReady = setInterval(() => {
    if (this.map?.googleMap) {
      this.map.googleMap.addListener('idle', () => {
        const bounds = this.map.googleMap!.getBounds();

        if (!bounds) return;

        this.markerInfoPairs.forEach(({ marker, infoWindow }) => {
          const position = marker.position;
          const isOpen = (infoWindow as any).getMap?.();
          if (position && !bounds.contains(position) && isOpen) {
            infoWindow.close();
          }
        });
      });
      clearInterval(checkMapReady); 
    }
    }, 100);
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['foodTrucks'] && this.map?.googleMap) {
      this.renderMarkers();
    }

    if (changes['selectedTruck'] && this.selectedTruck) {
      setTimeout(() => {
        this.flyToSelectedTruck();
      }, 1500);
    }
  }

  private renderMarkers() {
    if (!this.map?.googleMap) return;

    if (this.markerClusterer) {
      this.markerClusterer.clearMarkers();
    }

    this.loadMarkers();

    this.markerClusterer = new MarkerClusterer({
      map: this.map.googleMap!,
      markers: this.getVisibleMarkers(this.map.googleMap!.getZoom() ?? 14),
      renderer: {
        render: ({ position }: Cluster) =>
          new google.maps.marker.AdvancedMarkerElement({
            position,
            content: document.createElement('div'),
          }),
      },
    });
  }

  private loadMarkers() {
    if (this.markers.length > 0) {
      return;
    }

    this.markers = this.foodTrucks
      .filter((t) => t.latitude && t.longitude && t.status != 'EXPIRED')
      .map((truck) => {
        const marker = new google.maps.marker.AdvancedMarkerElement({
          position: {
            lat: parseFloat(truck.latitude),
            lng: parseFloat(truck.longitude),
          },
          title: truck.applicant,
        });

        const infoWindow = new google.maps.InfoWindow({
          content: this.buildInfoWindow(truck),
        });

        marker.addListener('click', () => {
          if (this.activeInfoWindow) {
            this.activeInfoWindow.close();
          }
          infoWindow.open(this.map.googleMap!, marker);
          this.activeInfoWindow = infoWindow;
        });

        this.markerInfoPairs.push({ marker, infoWindow });

        return marker;
      });
  }

  private flyToSelectedTruck() {
    if (this.selectedTruck && this.map?.googleMap) {
      const lat = parseFloat(this.selectedTruck.latitude);
      const lng = parseFloat(this.selectedTruck.longitude);
      this.map.googleMap!.panTo({ lat, lng });
      this.map.googleMap!.setZoom(16);

      const pair = this.markerInfoPairs.find(p =>
        p.marker.position?.lat === lat &&
        p.marker.position?.lng === lng
      );

      if (pair) {
        this.map.googleMap!.panTo(pair.marker.position!);
        this.map.googleMap!.setZoom(16);

        if (this.activeInfoWindow) {
          this.activeInfoWindow.close();
        }

        pair.infoWindow.open(this.map.googleMap!, pair.marker);
        this.activeInfoWindow = pair.infoWindow;

        setTimeout(() => {
          pair.infoWindow.open(this.map.googleMap!, pair.marker);
          this.activeInfoWindow = pair.infoWindow;
        }, 600);
      }
    }
  }

  public formatMenu(foodItems: string): string {
    return foodItems.toLowerCase().replaceAll(':', ' / ');
  }

  private buildInfoWindow(truck: FoodTruck): string {
    return `<div style="
            max-width: 260px;
            padding: 0.75rem;
            margin-top: 0; 
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
              <h3 style="margin: 0; font-size: 1.1rem;">${truck.applicant}</h3>
            </span>
              <p style="margin: 0.25rem 0; font-size: 0.9rem;">
              📍 <strong>Address:</strong> ${truck.address || 'Unknown'}
            </p>
            <p style="margin: 0.25rem 0; font-size: 0.9rem;">
              🍴 <strong>Menu:</strong> ${this.formatMenu(truck.foodItems) || 'No menu info'}
            </p>
          </div>`;
  }

  private getVisibleMarkers(
    zoom: number,
  ): google.maps.marker.AdvancedMarkerElement[] {
    const total = this.markers.length;
    const max = (target: number) => Math.min(target, total);

    if (zoom <= 2) return [];
    if (zoom <= 4) return this.markers.slice(0, max(10));
    if (zoom <= 6) return this.markers.slice(0, max(24));
    if (zoom <= 8) return this.markers.slice(0, max(50));
    if (zoom <= 10) return this.markers.slice(0, max(100));
    if (zoom <= 12) return this.markers.slice(0, max(160));
    if (zoom <= 14) return this.markers.slice(0, max(240));   

    return this.markers;
  }
}