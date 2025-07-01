import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FoodTruck } from '../models/food-truck.model';

@Injectable({ providedIn: 'root' })
export class FoodTruckService {
  private apiUrl = 'http://localhost:5037/api/foodtrucks';

  constructor(private http: HttpClient) {}

  getAll(): Observable<FoodTruck[]> {
    return this.http.get<FoodTruck[]>(this.apiUrl);
  }
}