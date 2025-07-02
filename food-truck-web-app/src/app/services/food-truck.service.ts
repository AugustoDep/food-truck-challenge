import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FoodTruck } from '../models/food-truck.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FoodTruckService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<FoodTruck[]> {
    return this.http.get<FoodTruck[]>(environment.apiUrl);
  }
}
