import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { truncate } from 'fs';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  loginService(username: string, password: string) {
    if (username === 'admin' && password === 'admin') {
      return true;
    } else {
      return false;
    }
  }

  getBuildings(): Observable<any> {
    return this.http.get(this.apiUrl + '/buildings');
  }

  getEnergyConsumption(): Observable<EnergyConsumption[]> {
    return this.http.get<EnergyConsumption[]>(
      this.apiUrl + '/energy-consumption'
    );
  }

  getEnergyBreakdowns(): Observable<any> {
    return this.http.get(this.apiUrl + '/energy-breackdowns');
  }
}

export interface Building {
  id: number;
  name: string;
  email: string;
}

export interface EnergyConsumption {
  timestamp: Date;
  cpe: string;
  active_energy: number;
}

export interface EnergyBreakdowns {
 
}
